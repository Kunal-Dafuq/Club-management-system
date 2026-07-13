import api from "./axios";

export const uploadLogo = (id, file) => {
    const form = new FormData();
    form.append("image", file);

    return api.patch(
        `/upload/club/${id}/logo`,
        form
    );
};

export const uploadBanner = (id, file) => {
    const form = new FormData();
    form.append("image", file);

    return api.patch(
        `/upload/club/${id}/banner`,
        form
    );
};

export const uploadChatFiles = (files, onUploadProgress) => {
    const form = new FormData();

    files.forEach(file => {
        form.append("files", file);
    });

    return api.post(
        "/media/upload",
        form,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        }
    );
};