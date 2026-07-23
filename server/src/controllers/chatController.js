const service = require("../services/chatService");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const { editMessage } = require("../services/chatEditService");
const { deleteForMe, deleteForEveryone } = require("../services/chatDeleteService");
const auditLogger = require("../utils/auditLogger");

const createChatRoom = asyncHandler(async (req, res) => {
    const { clubId, name, type } = req.body;

    if (!clubId || !name) {
        throw new ApiError(400, "Club ID and room name are required.");
    }

    const room = await service.createChatRoom(
        Number(clubId),
        name.trim(),
        type
    );

    await auditLogger(req, {
        action: "CHAT_ROOM_CREATED",
        entityType: "ChatRoom",
        entityId: room.id,
        clubId: room.clubId
    });

    res.status(201).json({
        success: true,
        message: "Chat room created successfully.",
        room
    });
});

const sendMessage = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.roomId);
    if (Number.isNaN(roomId)) {
        throw new ApiError(400, "Invalid room ID.");
    }

    const membershipId = req.membership?.id;
    if (!membershipId) {
        throw new ApiError(403, "You are not a member of this room.");
    }

    const message = await service.sendMessage(
        roomId,
        membershipId,
        req.body.content,
        req.body.replyToId ? Number(req.body.replyToId) : null,
        req.body.attachments || []
    );

    req.io?.to(`room-${roomId}`).emit("message:new", message);

    await auditLogger(req, {
        action: "CHAT_MESSAGE_SENT",
        entityType: "ChatMessage",
        entityId: message.id,
        clubId: message.roomId
    });

    res.status(201).json(message);
});

const getMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.roomId);
    if (Number.isNaN(roomId)) {
        throw new ApiError(400, "Invalid room ID.");
    }

    const membershipId = req.membership?.id;
    if (!membershipId) {
        throw new ApiError(403, "You are not a member of this room.");
    }

    const cursor = req.query.cursor ? Number(req.query.cursor) : null;

    const messages = await service.getMessages(
        roomId,
        membershipId,
        req.user.id,
        cursor
    );

    res.json(messages.reverse());
});

const toggleReaction = asyncHandler(async (req, res) => {
    const messageId = Number(req.params.messageId);
    if (Number.isNaN(messageId)) {
        throw new ApiError(400, "Invalid message ID.");
    }

    const roomId = Number(req.body.roomId);

    const membershipId = req.membership?.id;
    if (!membershipId) {
        throw new ApiError(403, "You are not a member of this room.");
    }

    const reaction = await service.toggleReaction(
        messageId,
        membershipId,
        req.body.emoji
    );

    if (!Number.isNaN(roomId)) {
        req.io?.to(`room-${roomId}`).emit("reaction:update", {
            messageId,
            emoji: req.body.emoji
        });
    }

    res.json({
        success: true,
        message: "Reaction updated.",
        reaction
    });
});

const editChatMessage = asyncHandler(async (req, res) => {
    const messageId = Number(req.params.messageId);
    if (Number.isNaN(messageId)) {
        throw new ApiError(400, "Invalid message ID.");
    }

    const message = await editMessage(
        req.user.id,
        messageId,
        req.body.content
    );

    req.io?.to(`room-${message.roomId}`).emit("message:update", message);

    await auditLogger(req, {
        action: "MESSAGE_EDITED",
        entityType: "ChatMessage",
        entityId: message.id,
        clubId: message.roomId
    });

    res.json(message);
});

const uploadChatFile = asyncHandler(async (req, res) => {
    const { storage } = req.body;

    if (!storage) {
        throw new ApiError(400, "Attachment or storage metadata missing.");
    }

    res.json({
        success: true,
        attachment: storage
    });
});

const searchMessages = asyncHandler(async (req, res) => {
    const roomId = Number(req.params.clubId);
    if (Number.isNaN(roomId)) {
        throw new ApiError(400, "Invalid club or room ID.");
    }

    const query = req.query.q || "";

    if (!query.trim()) {
        return res.json([]);
    }

    const messages = await service.searchMessages(roomId, query);

    res.json(messages);
});

const removeForMe = asyncHandler(async (req, res) => {
    const messageId = Number(req.params.messageId);
    if (Number.isNaN(messageId)) {
        throw new ApiError(400, "Invalid message ID.");
    }

    await deleteForMe(req.user.id, messageId);

    res.json({ success: true });
});

const removeForEveryone = asyncHandler(async (req, res) => {
    const messageId = Number(req.params.messageId);
    if (Number.isNaN(messageId)) {
        throw new ApiError(400, "Invalid message ID.");
    }

    const message = await deleteForEveryone(req.user.id, messageId);

    if (!message) {
        throw new ApiError(404, "Message not found.");
    }

    req.io?.to(`room-${message.roomId}`).emit("message:delete", message);

    await auditLogger(req, {
        action: "MESSAGE_DELETED",
        entityType: "ChatMessage",
        entityId: message.id,
        clubId: message.roomId
    });

    res.json(message);
});

module.exports = {
    createChatRoom,
    sendMessage,
    getMessages,
    editChatMessage,
    toggleReaction,
    removeForMe,
    removeForEveryone,
    searchMessages,
    uploadChatFile
};