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