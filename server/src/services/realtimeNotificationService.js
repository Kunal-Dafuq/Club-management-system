const { getIO } = require("../socket/socket");
const { getSocket } = require("../utils/onlineUsers");

const sendRealtimeNotification = (userId, notification) => {
    const socketId = getSocket(userId);
    if (!socketId) return;
    const io = getIO();

    io.to(socketId).emit(
        "notification",
        notification
    );
};

module.exports = {
    sendRealtimeNotification
};