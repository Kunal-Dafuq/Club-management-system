const rooms = new Map();

function addUser(userId, socketId, roomId) {
    if (!rooms.has(roomId)) {
        rooms.set(roomId, []);
    }

    const users = rooms.get(roomId);

    if (!users.find(user => user.socketId === socketId)) {
        users.push({
            userId,
            socketId
        });
    }
}

function removeUser(socketId) {
    for (const [roomId, users] of rooms.entries()) {
        const filtered = users.filter(
            user => user.socketId !== socketId
        );

        if (filtered.length !== users.length) {

            if (filtered.length === 0) {
                rooms.delete(roomId);
            } else {
                rooms.set(roomId, filtered);
            }

            return roomId;
        }
    }

    return null;
}

function getRoomUsers(roomId) {
    return rooms.get(roomId) || [];
}

module.exports = {
    addUser,
    removeUser,
    getRoomUsers,
};