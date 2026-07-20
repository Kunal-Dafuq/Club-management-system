require("dotenv").config();

require("./jobs/cron");

const http = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

const app = require("./app");

const { initSocket } = require("./socket/socket");
const registerChatSocket = require("./socket/chatSocket");
const {registerTaskSocket} = require("./socket/taskSocket");const registerNotificationSocket = require("./socket/notificationSocket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    },
});

const { initializeEmail } = require("./services/emailService");
(async () => {
    await initializeEmail();
    server.listen(PORT, () => {
        console.log("=================================");
        console.log("🚀 ClubPlanet Backend Started");
        console.log(`🌍 Port : ${PORT}`);
        console.log(`📡 Socket.IO : Enabled`);
        console.log(`📁 Uploads : Enabled`);
        console.log(`📦 Environment : ${process.env.NODE_ENV}`);
        console.log("=================================");
    });
})();

app.set("io", io);

io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("Authentication token is missing."));
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = decoded;

        next();

    } catch (error) {

        next(new Error("Invalid or expired authentication token."));
    }
});

initSocket(io);

registerTaskSocket(io);
registerChatSocket(io);
registerNotificationSocket(io);

process.on("SIGINT",()=>{
    console.log("Stopping server...");
    server.close(()=>{
        process.exit(0);
    });
});