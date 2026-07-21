require("dotenv").config();

const http = require("http");

const app = require("./app");

const initializeSocket = require("./socket");

const initializeEmail = require("./bootstrap/email");

const initializeCron = require("./bootstrap/cron");

const gracefulShutdown = require("./bootstrap/shutdown");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initializeSocket(
    server,
    app
);

(async () => {
    await initializeEmail();

    initializeCron();

    server.listen(PORT, () => {
        console.log("=================================");
        console.log("🚀 ClubPlanet Backend Started");
        console.log(`🌍 Port : ${PORT}`);
        console.log("📡 Socket.IO : Enabled");
        console.log(`📦 ${process.env.NODE_ENV}`);
        console.log("=================================");
    });
})();

gracefulShutdown(server);