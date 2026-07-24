import api from "../api/axios";
import { handleApi } from "../api/handleApi";

export const getClubMessages = (roomId, cursor) => {
    let url = `/chat/room/${roomId}`;
    if (cursor) {
        url += `?cursor=${cursor}`;
    }
    return handleApi(() => api.get(url));
};

export const toggleReaction = (messageId, roomId, emoji) =>
    handleApi(() => api.post(`/chat/reaction/${messageId}`, { roomId, emoji }));

export const editMessage = (messageId, content) =>
    handleApi(() => api.patch(`/chat/messages/${messageId}`, { content }));

export const deleteForMe = (messageId) =>
    handleApi(() => api.delete(`/chat/messages/${messageId}/me`));

export const deleteForEveryone = (messageId) =>
    handleApi(() => api.delete(`/chat/messages/${messageId}/everyone`));

export const searchMessages = (clubId, query) =>
    handleApi(() => api.get(`/chat/clubs/${clubId}/search?q=${encodeURIComponent(query)}`));

export const uploadChatFile = (file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);

    return handleApi(() =>
        api.post("/upload/chat", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
                if (!event.total) return;
                const percent = Math.round((event.loaded * 100) / event.total);
                onProgress?.(percent);
            },
        })
    );
};

export const markRoomRead = (clubId, roomId, messageId) =>
    handleApi(() => api.post(`/read/clubs/${clubId}/rooms/${roomId}`, { messageId }));