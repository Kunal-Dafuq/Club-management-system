import * as tus from "tus-js-client";
import { supabase } from "../lib/supabase";

// 6MB chunking ensures fine-grained resumability on unstable connections
const CHUNK_SIZE = 6 * 1024 * 1024;

const SUPPORTED_TYPES = [
    // Audio formats
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/mp4",
    "audio/x-m4a",
    "audio/aac",
    "audio/ogg",
    // Video formats (Odyssey Fest, hackathon demos, committee recordings)
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-matroska",
    "video/ogg",
    // General documents & archives
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/octet-stream",
    "image/png",
    "image/jpeg",
    "image/webp"
];

// Upgraded to 2 GB for large university recordings, video dumps, and archives
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;

const validateFile = (file) => {
    if (!file) {
        throw new Error("No file selected.");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File exceeds 2 GB limit.");
    }
};

const createObjectName = (
    file,
    folder = "media"
) => {
    const extension = file.name.includes(".")
        ? file.name.split(".").pop()
        : "bin";

    const unique = crypto.randomUUID();

    return `${folder}/${Date.now()}-${unique}.${extension}`;
};

/**
 * Enterprise Resumable Uploader (Tus-JS / HTTP Range Protocol)
 * Protects large video & file uploads against unstable or dropped Wi-Fi connections.
 * Automatically checks localStorage fingerprint and resumes from exact byte offset.
 */
export const uploadResumableFileToSupabase = async ({
    file,
    bucket = "meeting-audio",
    folder = "media",
    fileName,
    contentType,
    onProgress,
    signal
}) => {
    validateFile(file);

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error("Please login first to upload files.");
    }

    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

    if (!projectId) {
        throw new Error("Missing Supabase Project ID.");
    }

    const objectName = fileName || createObjectName(file, folder);

    return new Promise(
        async (
            resolve,
            reject
        ) => {
            const upload = new tus.Upload(
                file,
                {
                    endpoint: `https://${projectId}.storage.supabase.co/storage/v1/upload/resumable`,
                    // 7-step exponential backoff retries (up to 2 minutes of network outage protection)
                    retryDelays: [0, 3000, 5000, 10000, 15000, 30000, 60000],
                    uploadDataDuringCreation: true,
                    removeFingerprintOnSuccess: true,
                    chunkSize: CHUNK_SIZE,
                    headers: {
                        authorization: `Bearer ${session.access_token}`,
                        "x-upsert": "true"
                    },
                    metadata: {
                        bucketName: bucket,
                        objectName,
                        contentType: contentType || file.type || "application/octet-stream",
                        cacheControl: "3600"
                    },
                    onProgress(
                        uploaded,
                        total
                    ) {
                        const percent = Math.round(
                            (uploaded / total) * 100
                        );

                        if (onProgress) {
                            onProgress({
                                uploaded,
                                total,
                                percent,
                                resumable: true,
                                chunkSizeMb: CHUNK_SIZE / (1024 * 1024)
                            });
                        }
                    },
                    async onSuccess() {
                        try {
                            const secureUrl = await getSecureFileUrl(
                                bucket,
                                objectName
                            );

                            resolve({
                                bucket,
                                objectName,
                                path: objectName,
                                publicUrl: secureUrl,
                                uploadUrl: upload.url,
                                secureUrl,
                                size: file.size,
                                type: file.type,
                                name: file.name,
                                resumed: Boolean(upload._resumedFromPrevious)
                            });
                        } catch (err) {
                            reject(err);
                        }
                    },
                    onError(error) {
                        reject(error);
                    }
                }
            );

            if (signal) {
                signal.addEventListener(
                    "abort",
                    () => {
                        upload.abort();
                        reject(
                            new DOMException(
                                "Upload cancelled.",
                                "AbortError"
                            )
                        );
                    }
                );
            }

            try {
                // Enterprise Fault-Tolerance: Check for existing Tus fingerprint in browser storage
                const previous =
                    await upload.findPreviousUploads();

                if (previous.length) {
                    upload.resumeFromPreviousUpload(
                        previous[0]
                    );
                    upload._resumedFromPrevious = true;
                }

                upload.start();
            }
            catch (err) {
                reject(err);
            }
        }
    );
};

// Aliases for backward compatibility across modules
export const uploadFileToSupabase = uploadResumableFileToSupabase;
export const uploadAudioToSupabase = uploadResumableFileToSupabase;
export const uploadAudio = uploadResumableFileToSupabase;

export const deleteFileFromSupabase = async ({
    bucket = "meeting-audio",
    objectName
}) => {
    const { error } = await supabase.storage
        .from(bucket)
        .remove([objectName]);

    if (error) {
        throw error;
    }
};

export const deleteAudioFromSupabase = deleteFileFromSupabase;

export const getSecureFileUrl = async (
    bucket = "meeting-audio",
    objectName,
    expiresIn = 3600
) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(objectName, expiresIn);

    if (error) {
        throw new Error(
            error.message || "Failed to generate secure file access link."
        );
    }

    return data.signedUrl;
};

export const getSecureAudioUrl = getSecureFileUrl;

export default uploadResumableFileToSupabase;