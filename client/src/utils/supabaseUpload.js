import * as tus from "tus-js-client";
import { supabase } from "../lib/supabase";

const CHUNK_SIZE = 6 * 1024 * 1024;

const SUPPORTED_TYPES = [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/webm",
    "audio/mp4",
    "audio/x-m4a",
    "audio/aac",
    "audio/ogg"
];

const MAX_FILE_SIZE = 250 * 1024 * 1024;

const validateFile = (file) => {
    if (!file) {
        throw new Error("No audio file selected.");
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
        throw new Error("Unsupported audio format.");
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new Error("Audio exceeds 250 MB.");
    }
};

const createObjectName = (
    file,
    folder = "meetings"
) => {
    const extension = file.name.includes(".")
        ? file.name.split(".").pop()
        : "mp3";

    const unique = crypto.randomUUID();

    return `${folder}/${Date.now()}-${unique}.${extension}`;
};

export const uploadAudioToSupabase = async ({
    file,
    bucket = "meeting-audio",
    folder = "meetings",
    fileName,
    onProgress,
    signal
}) => {
    validateFile(file);

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        throw new Error("Please login first.");
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
                    retryDelays: [0, 3000, 5000, 10000, 15000, 30000],
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
                        contentType: file.type,
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
                                percent
                            });
                        }
                    },
                    async onSuccess() {
                        try {
                            const secureUrl = await getSecureAudioUrl(
                                bucket,
                                objectName
                            );

                            resolve({
                                bucket,
                                objectName,
                                path: objectName,
                                uploadUrl: upload.url,
                                secureUrl,
                                size: file.size,
                                type: file.type,
                                name: file.name
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
                const previous =
                    await upload.findPreviousUploads();

                if (previous.length) {
                    upload.resumeFromPreviousUpload(
                        previous[0]
                    );
                }

                upload.start();
            }
            catch (err) {
                reject(err);
            }
        }
    );
};

export const deleteAudioFromSupabase = async ({
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

export const getSecureAudioUrl = async (
    bucket = "meeting-audio",
    objectName,
    expiresIn = 3600
) => {
    const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(objectName, expiresIn);

    if (error) {
        throw new Error(
            error.message || "Failed to generate secure audio access link."
        );
    }

    return data.signedUrl;
};

export default uploadAudioToSupabase;