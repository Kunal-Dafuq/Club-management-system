const onlineUsers = new Map();

const addUser = (userId, socketId, roomId) => {
    onlineUsers.set(userId, {
        socketId,
        roomId
    });

};

const removeUser = (socketId) => {
    for (const [userId, user] of onlineUsers.entries()) {
        if (user.socketId === socketId) {
            onlineUsers.delete(userId);
            return user.roomId;
        }
    }
    return null;
};

const getRoomUsers = (roomId) => {
    return [...onlineUsers.entries()]
        .filter(([_, user]) => user.roomId === roomId)
        .map(([userId]) => Number(userId));
};

module.exports = {
    addUser,
    removeUser,
    getRoomUsers
};