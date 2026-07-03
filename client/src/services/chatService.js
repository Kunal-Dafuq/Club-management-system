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