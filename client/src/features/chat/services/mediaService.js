import api from "../api/axios";
import { handleApi } from "../api/handleApi";

export const getImages = (roomId) => {
    return handleApi(() => api.get(`/media/${roomId}/images`));
};

export const getFiles = (roomId) => {
    return handleApi(() => api.get(`/media/${roomId}/files`));
};