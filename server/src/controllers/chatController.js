const prisma = require("../config/prisma");

const getMembershipId = require("../utils/getMembershipId");
const service=require("../services/chatService");
const asyncHandler = require("../middleware/asyncHandler");
const {editMessage} = require("../services/chatEditService");
const {deleteForMe,deleteForEveryone}=require("../services/chatDeleteService");
const auditLogger = require("../utils/auditLogger");

const sendMessage = asyncHandler(async (req, res) => {

    const roomId = Number(req.params.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new Error("You are not a member of this room.");
    }

    const message = await service.sendMessage(
        roomId,
        membershipId,
        req.body.content,
        req.body.replyToId,
        req.body.attachments || []
    );

    req.io?.to(`room-${roomId}`).emit("message:new", message);

    res.status(201).json(message);

});

const getMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new Error("Not a room member.");
    }

    const cursor = req.query.cursor
        ? Number(req.query.cursor)
        : null;

    const messages = await service.getMessages(
        roomId,
        membershipId,
        req.user.id,
        cursor
    );

    res.json(messages.reverse());

});

const toggleReaction = asyncHandler(async (req, res) => {
    const roomId = Number(req.body.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new Error("Not authorized.");
    }

    const reaction = await service.toggleReaction(
        Number(req.params.messageId),
        membershipId,
        req.body.emoji
    );

    req.io
        ?.to(`room-${roomId}`)
        .emit("reaction:update", {
            messageId: Number(req.params.messageId),
            emoji: req.body.emoji
        });

    res.json(reaction);

});

const editChatMessage = asyncHandler(async (req,res)=>{

    const message = await editMessage(
        req.user.id,
        Number(req.params.messageId),
        req.body.content
    );

    req.io?.to(`room-${message.roomId}`)
        .emit("message:update", message);

    res.json(message);

});

const uploadChatFile = asyncHandler(async (req, res) => {
    let category = "DOCUMENT";

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    if (req.file.mimetype.startsWith("image/")) {
        category = "IMAGE";
    }

    else if (req.file.mimetype.startsWith("video/")) {
        category = "VIDEO";
    }

    else if (req.file.mimetype.startsWith("audio/")) {
        category = "AUDIO";
    }

    const mime = req.file.mimetype;

    return res.json({
        url: `/uploads/chat/${req.file.filename}`,
        name: req.file.originalname,
        type: mime,
        size: req.file.size,
        extension: req.file.originalname.split(".").pop(),
        category
    });
});

const searchMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.clubId);
    const query = req.query.q || "";

    const messages = await service.searchMessages(
        roomId,
        query
    );

    res.json(messages);

});

const removeForMe = asyncHandler(async(req,res)=>{
    await deleteForMe(
        req.user.id,
        Number(req.params.messageId)
    );

    res.json({
        success:true
    });
});

const removeForEveryone = asyncHandler(async(req,res)=>{
    const message = await deleteForEveryone(
        req.user.id,
        Number(req.params.messageId)
    );

    req.io
        ?.to(`room-${message.roomId}`)
        .emit("message:delete",message);

    res.json(message);
});

module.exports = {
    sendMessage,
    getMessages,
    editChatMessage,
    toggleReaction,
    removeForMe,
    removeForEveryone,
    searchMessages,
    uploadChatFile
};