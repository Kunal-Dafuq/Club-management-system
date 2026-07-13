const {addUser ,removeUser ,getRoomUsers} = require("../utils/onlineUsers");
const registerChatSocket = require("./chatSocket");

let io = null;

const initSocket = (socketInstance) => {
    io = socketInstance;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized.");
    }

    return io;
};

module.exports = {
    initSocket,
    getIO,
};