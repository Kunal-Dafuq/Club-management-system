import * as tus from "tus-js-client";

export function uploadTaskAttachment(taskId, file, onProgress) {
    return new Promise((resolve, reject) => {
        const endpointUrl = import.meta.env.VITE_TUS_ENDPOINT || "http://localhost:5000/files";

        const upload = new tus.Upload(file, {
            endpoint: endpointUrl,
            metadata: {
                filename: file.name,
                filetype: file.type,
                filesize: String(file.size),
                taskId: String(taskId),
            },
            retryDelays: [0, 3000, 5000, 10000],
            chunkSize: 5 * 1024 * 1024, // 5MB chunks
            onError: (error) => reject(error),
            onProgress: (bytes, total) => {
                if (!total) return;
                const percent = Math.floor((bytes / total) * 100);
                onProgress?.(percent);
            },
            onSuccess: () => {
                resolve(upload.url);
            },
        });

        upload.findPreviousUploads().then((previous) => {
            if (previous.length) {
                upload.resumeFromPreviousUpload(previous[0]);
            }
            upload.start();
        }).catch((err) => {
            console.error("TUS Previous Upload Lookup Failed:", err);
            upload.start();
        });
    });
}