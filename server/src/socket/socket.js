const jwt = require("jsonwebtoken");

let io = null;

const initSocket = (socketInstance) => {
    io = socketInstance;

    io.engine.pingTimeout = 5000;
    io.engine.pingInterval = 10000;

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token || 
                      socket.handshake.headers?.authorization?.split(" ")[1];

        if (!token) {
            return next(new Error("Authentication Error: Token missing"));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; 
            next();
        } catch (error) {
            return next(new Error("Authentication Error: Invalid or expired token"));
        }
    });
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