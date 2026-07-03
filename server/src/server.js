require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;

app.use(
  "/api/activity",
  require("./routes/activityRoutes")
);

const http = require("http");
const server = http.createServer(app);
const { initSocket } = require("./socket/socket");

initSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

const path = require("path");
app.use("/uploads",
    express.static(
        path.join(__dirname,"../uploads")
    )
);

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
});

app.set("io", io);

registerChatSocket(io);