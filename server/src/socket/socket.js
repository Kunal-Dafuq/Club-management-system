const { Server } = require("socket.io");

const {addUser ,removeUser ,getRoomUsers} = require("../utils/onlineUsers");
const registerChatSocket = require("./chatSocket");

let io;

const initSocket=(server)=>{

    io=new Server(server,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    });

    registerChatSocket(io);
};

const getIO=()=>io;

module.exports={
    initSocket,
    getIO
};