const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const registerChatSocket = require("./chatSocket");
const registerTaskSocket = require("./taskSocket");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "*",
            credentials: true
        },

        transports: ["websocket", "polling"],

        pingTimeout: 60000,

        pingInterval: 25000
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace("Bearer ", "");

        if (!token) {
            return next(new Error("Unauthorized"));
        }

        try {
            socket.user = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            next();

        } catch {
            next(new Error("Invalid token"));
        }
    });

    registerChatSocket(io);
    registerTaskSocket(io);

    return io;
};