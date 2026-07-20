const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const getMedia = asyncHandler(async (req,res)=>{
    const roomId = Number(req.params.roomId);

    if(Number.isNaN(roomId)){
        throw new ApiError(
            400,
            "Invalid room id."
        );
    }

    const media = await prisma.chatAttachment.findMany({
        where:{
            message:{
                roomId
            },
            mimeCategory:"IMAGE"
        },

        include:{
            message:true
        },

        orderBy:{
            createdAt:"desc"
        }
    });

    res.json({
        success:true,
        count:media.length,
        media
    });
});

const getFiles = asyncHandler(async(req,res)=>{
    const roomId = Number(req.params.roomId);

    const files = await prisma.chatAttachment.findMany({
        where:{
            message:{
                roomId
            },

            NOT:{
                mimeCategory:"IMAGE"
            }
        },

        include:{
            message:true
        },

        orderBy:{
            createdAt:"desc"
        }
    });

    res.json({
        success:true,
        count:files.length,
        files
    });
});

module.exports={
    getMedia,
    getFiles
};