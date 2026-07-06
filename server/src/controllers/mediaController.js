const prisma = require("../config/prisma");

const getMedia = async (req, res) => {
    const roomId = Number(req.params.roomId);
    const media = await prisma.chatMessage.findMany({

        where:{
            roomId,
            
            fileUrl:{
              not:null
            },
            mimeCategory:"image"
        },

        orderBy:{
            createdAt:"desc"
        },

        select:{
            id:true,
            fileUrl:true,
            fileName:true,
            createdAt:true,
            membership:{
                include:{
                    user:true
                   }
            }
        }
    });

    res.json(media);

};

const getFiles = async(req,res)=>{
    const roomId=Number(req.params.roomId);
    const files=await prisma.chatMessage.findMany({

        where:{
            roomId,

            fileUrl:{
                not:null
            },

            NOT:{
                mimeCategory:"image"
            }

        },

        orderBy:{
            createdAt:"desc"
        }
    });

    res.json(files);

};

module.exports={
    getMedia,
    getFiles
};