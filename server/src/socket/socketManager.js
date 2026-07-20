const onlineUsers = new Map();

const registerSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("join-club", (clubId) => {
            socket.join(`club-${clubId}`);
        });

        socket.on("join-committee", (committeeId) => {
            socket.join(`committee-${committeeId}`);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
        });
    });
};

const emitNotification = (io, userId, notification) => {
    const socketId = onlineUsers.get(userId);

    if (socketId) {
        io.to(socketId).emit(
            "notification",
            notification
        );
    }
};

module.exports = {
    registerSocket,
    emitNotification
};