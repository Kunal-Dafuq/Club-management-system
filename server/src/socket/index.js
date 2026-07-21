const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const { initSocket } = require("./socket");

const registerChatSocket = require("./chatSocket");

const {registerTaskSocket} = require("./taskSocket");

const {registerNotificationSocket} = require("./notificationSocket");

const initializeSocket = (server, app) => {
    const io = new Server(server, {

        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173",
            credentials: true
        },

        transports: [
            "websocket",
            "polling"
        ],

        pingTimeout: 60000,
        pingInterval: 25000
    });

    io.use((socket, next) => {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers.authorization?.replace(
                "Bearer ",
                ""
            );

        if (!token) {
            return next(
                new Error("Authentication required.")
            );
        }

        try {
            socket.user = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            next();

        } catch {
            next(
                new Error("Invalid token.")
            );
        }
    });

    initSocket(io);
    registerChatSocket(io);
    registerTaskSocket(io);
    registerNotificationSocket(io);
    app.set("io", io);
    return io;
};

module.exports = initializeSocket;