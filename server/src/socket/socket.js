let io = null;

const initSocket = (socketInstance) => {
    io = socketInstance;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized.");
    }
    return io;
};

module.exports = {
    initSocket,
    getIO
};