import { Upload } from "tus-js-client";

/**
 * Enterprise Resumable Upload Service
 * Protects large video & file transfers against Wi-Fi drops and unstable connections.
 * Resumes from the exact chunk/byte where it stopped without restarting from 0%.
 */
export const uploadFile = (file, url, onProgress) => {
    return new Promise(async (resolve, reject) => {
        const upload = new Upload(file, {
            endpoint: url,
            // 7-step exponential backoff retry for unstable/offline networks (up to 2 minutes)
            retryDelays: [0, 3000, 5000, 10000, 15000, 30000, 60000],
            chunkSize: 6 * 1024 * 1024, // 6MB chunking for fine-grained resumption
            metadata: {
                filename: file.name,
                filetype: file.type || "application/octet-stream",
            },
            onError: (error) => reject(error),
            onProgress: (bytesUploaded, bytesTotal) => {
                if (!bytesTotal) return;
                const percent = Math.floor((bytesUploaded / bytesTotal) * 100);
                onProgress?.(percent, {
                    bytesUploaded,
                    bytesTotal,
                    resumable: true,
                    resumed: Boolean(upload._resumedFromPrevious)
                });
            },
            onSuccess: () => {
                resolve(upload.url);
            },
        });

        try {
            // Check for previous upload checkpoint in browser storage
            const previousUploads = await upload.findPreviousUploads();
            if (previousUploads.length > 0) {
                upload.resumeFromPreviousUpload(previousUploads[0]);
                upload._resumedFromPrevious = true;
            }
            upload.start();
        } catch (err) {
            reject(err);
        }
    });
};

export const isResumableUploadSupported = () => {
    return typeof window !== "undefined" && Boolean(window.localStorage);
};

export default uploadFile;