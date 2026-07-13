import api from "./api";

export const getClubMessages = (
    roomId,
    cursor
) => {

    let url = `/chat/room/${roomId}`;

    if (cursor) {
        url += `?cursor=${cursor}`;
    }

    return api.get(url);

};

export const toggleReaction = (
    messageId,
    roomId,
    emoji
) => {
    return api.post(
        `/chat/reaction/${messageId}`,
        {
            roomId,
            emoji
        }
    );
};

export const editMessage = (
    messageId,
    content
) => {
    return api.patch(
        `/chat/messages/${messageId}`,
        {
            content
        }
    );
};

export const deleteForMe = messageId =>
    api.delete(
        `/chat/messages/${messageId}/me`
    );


export const deleteForEveryone = messageId =>
    api.delete(
        `/chat/messages/${messageId}/everyone`
    );

export const searchMessages = (
    clubId,
    query
)=>{
    return api.get(
        `/chat/clubs/${clubId}/search?q=${query}`
    );
};

export const uploadChatFile = (
    file,
    onProgress
) => {
    const formData = new FormData();

    formData.append("file", file);

    return api.post(
        "/upload/chat",
        formData,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            },

            onUploadProgress:(event)=>{
                if(!event.total) return;

                const percent=Math.round(
                    (event.loaded*100)/event.total
                );

                onProgress?.(percent);

            }
        }
    );
};

export const markRoomRead = (
    clubId,
    roomId,
    messageId
) => {
    return api.post(
        `/read/clubs/${clubId}/rooms/${roomId}`,
        {
            messageId
        }
    );
};