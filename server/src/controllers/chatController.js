const service=require("../services/chatService");
const path = require("path");

const {deleteForMe,deleteForEveryone}=require("../services/chatDeleteService");
const {editMessage} = require("../services/chatEditService");

const sendMessage = async (req, res) => {
    try {
        const membership = await prisma.membership.findFirst({
            where: {
                clubId: Number(req.params.roomId),
                userId: req.user.id,
                status: "APPROVED"
            }
        });

        if (!membership) {
            return res.status(403).json({
                message: "Not a member of this club."
            });
        }

        const message = await service.sendMessage(
            Number(req.params.roomId),
            membership.id,
            req.body.content,
            req.body.replyToId,
            req.body.attachments || []
        );

        res.status(201).json(message);

    }

    catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);

        const cursor = req.query.cursor
            ? Number(req.query.cursor)
            : undefined;

        const messages =
            await service.getMessages(
                roomId,
                cursor
            );

        res.json(
            messages.reverse()
        );
    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const toggleReaction = async (req, res) => {
    try {
        const membership = await prisma.membership.findFirst({
            where: {
                clubId: Number(req.body.roomId),
                userId: req.user.id,
                status: "APPROVED"
            }
        });

        if (!membership) {
            return res.status(403).json({
                message: "Forbidden"
            });
        }

        const reaction =
            await service.toggleReaction(
                Number(req.params.messageId),
                membership.id,
                req.body.emoji
            );

        res.json(reaction);

    }

    catch (err) {
        res.status(400).json({

            message: err.message

        });
    }
};

const editChatMessage = async(req,res)=>{
    try{
        const membership=
        await prisma.membership.findFirst({
            where:{
                clubId:Number(req.params.roomId),
                userId:req.user.id,
                status:"APPROVED"
            }
        });

        const message=
        await service.editMessage(
            Number(req.params.messageId),
            membership.id,
            req.body.content
        );

        res.json(message);

    }

    catch(err){
        res.status(400).json({

            message:err.message

        });
    }
};

const uploadChatFile = async (req, res) => {
    const extension = path.extname(req.file.originalname);

    let category = "DOCUMENT";

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

    res.json({
        url: `/uploads/chat/${req.file.filename}`,
        name: req.file.originalname,
        type: mime,
        size: req.file.size,
        extension: req.file.originalname.split(".").pop(),
        category: mime.split("/")[0]
    });
};

const removeForMe=async(req,res)=>{
    await deleteForMe(
        req.user.id,
        Number(req.params.messageId)
    );
    res.json({
        success:true
    });
};

const removeForEveryone = async (req,res)=>{
    try{
        const message = await deleteForEveryone(
            req.user.id,
            Number(req.params.messageId)
        );

        const io = req.app.get("io");

        io.to(`room-${message.roomId}`).emit(
            "message-deleted",
            message
        );

        res.json(message);
        
    }

    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
};

const searchMessages = async (req, res) => {
    const { clubId } = req.params;
    const { q } = req.query;
    const messages = await prisma.chatMessage.findMany({
        where:{
            clubId:Number(clubId),
            deletedForAll:false,
            content:{
                contains:q,
                mode:"insensitive"
            }
        },
        include:{
            membership:{
                include:{
                    user:true
                }
            },
            reactions:true,
            replyTo:true
        },
        orderBy:{
            createdAt:"desc"
        }
    });

    res.json(messages);

};

const uploadChatFile = async(req,res)=>{
    res.json({
        url:`/uploads/chat/${req.file.filename}`,
        name:req.file.originalname,
        type:req.file.mimetype,
        size:req.file.size
    });
};

module.exports={
    sendMessage,
    getMessages,
    updateMessage,
    removeForMe,
    removeForEveryone,
    toggleReaction,
    searchMessages,
    uploadChatFile
};