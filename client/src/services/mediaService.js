import api from "./api";

export const getImages=(roomId)=>
    api.get(`/media/${roomId}/images`);

export const getFiles=(roomId)=>
    api.get(`/media/${roomId}/files`);