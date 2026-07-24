import { Upload } from "tus-js-client";

export const uploadFile = (file, url, onProgress) => {
    return new Promise((resolve, reject) => {
        const upload = new Upload(file, {
            endpoint: url,
            retryDelays: [0, 3000, 5000],
            chunkSize: 6 * 1024 * 1024, // 6MB chunking
            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            onError: (error) => reject(error),
            onProgress: (bytesUploaded, bytesTotal) => {
                if (!bytesTotal) return;
                const percent = Math.floor((bytesUploaded / bytesTotal) * 100);
                onProgress?.(percent);
            },
            onSuccess: () => {
                resolve(upload.url);
            },
        });

        upload.start();
    });
};