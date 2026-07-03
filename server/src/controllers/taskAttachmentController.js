const service = require("../services/taskAttachmentService");

const uploadAttachment = async(req,res)=>{
    try{
        const taskId=Number(req.params.taskId);
        const file=req.file;

        if(!file){
            return res.status(400).json({

                message:"No file uploaded"

            });
        }

        const attachment=await service.uploadAttachment(
            taskId,
            req.user.id,
            file
        );

        res.status(201).json({
            success:true,
            message:"Attachment uploaded successfully",
            attachment,
            uploadedBy:req.user.name,
            uploadedAt:new Date()
        });
    }

    catch(err){
        console.log(err);
        res.status(500).json({

            message:err.message

        });
    }
};

const getAttachments = async(req,res)=>{
    try{
        const attachments=await service.getAttachments(
            Number(req.params.taskId)
        );

        res.json({
            count:attachments.length,
            attachments
        });

    }

    catch(err){
        res.status(500).json({

            message:err.message

        });
    }
};

const deleteAttachment = async(req,res)=>{
    try{
        await service.deleteAttachment(
            Number(req.params.id),
            req.user.id
        );

        res.json({

            message:"Attachment deleted"

        });
    }

    catch(err){
        res.status(500).json({

            message:err.message

        });
    }
};

module.exports={
    uploadAttachment,
    getAttachments,
    deleteAttachment
};