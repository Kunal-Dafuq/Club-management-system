const prisma = require("../config/prisma");

const getMembershipId = require("../utils/getMembershipId");
const service=require("../services/chatService");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const {editMessage} = require("../services/chatEditService");
const {deleteForMe,deleteForEveryone}=require("../services/chatDeleteService");
const auditLogger = require("../utils/auditLogger");

const sendMessage = asyncHandler(async (req, res) => {

    const roomId = Number(req.params.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new ApiError(
            403,
            "You are not a member of this room."
        );
    }

    const message = await service.sendMessage(
        roomId,
        membershipId,
        req.body.content,
        req.body.replyToId,
        req.body.attachments || []
    );

    req.io?.to(`room-${roomId}`).emit("message:new", message);

    await auditLogger(req,{
        action:"CHAT_MESSAGE_SENT",
        entityType:"ChatMessage",
        entityId:message.id,
        clubId:message.roomId
    });

    res.status(201).json(message);

});

const getMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.roomId);

    const membershipId = getMembershipId(req, roomId);

    if (!membershipId) {
        throw new ApiError(
            403,
            "You are not a member of this room."
        );
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
        throw new ApiError(
            403,
            "You are not a member of this room."
        );
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

    res.json({
        success: true,
        message: "Reaction updated.",
        reaction
    });

});

const editChatMessage = asyncHandler(async (req,res)=>{

    const message = await editMessage(
        req.user.id,
        Number(req.params.messageId),
        req.body.content
    );

    req.io?.to(`room-${message.roomId}`)
        .emit("message:update", message);

    await auditLogger(req,{
        action:"MESSAGE_EDITED",
        entityType:"ChatMessage",
        entityId:message.id,
        clubId:message.roomId
    });    

    res.json(message);

});

const uploadChatFile = asyncHandler(async (req, res) => {
    const { storage } = req.body;
    
    if(!storage){
        throw new ApiError(
            400,
            "Attachment metadata missing."
        );
    }

    if (!storage) {
        throw new ApiError(
            400,
            "Storage metadata missing."
        );
    }

    res.json({
        success: true,
        attachment: storage
    });
});

const searchMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.clubId);
    const query = req.query.q || "";

    if (!query.trim()) {
        return res.json([]);
    }

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

    if (!message) {
        throw new ApiError(
            404,
            "Message not found."
        );
    }

    req.io
        ?.to(`room-${message.roomId}`)
        .emit("message:delete",message);

    await auditLogger(req,{
        action:"MESSAGE_DELETED",
        entityType:"ChatMessage",
        entityId:message.id,
        clubId:message.roomId
    });

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