const prisma = require("../config/prisma");
const getFileIcon = require("../utils/fileIcon");
const { createNotification } = require("./notificationService");
const { buildStorageInfo } = require("./storageService");

const uploadAttachment = async (
    taskId,
    membershipId,
    storage
) => {
    const membership = await prisma.membership.findUnique({

            where:{
                id:membershipId
            },

            include:{
                user:true
            }
        });

    if(!membership){
        throw new Error("Membership not found");
    }

    await prisma.activity.create({
        data:{
            clubId:membership.clubId,
            userId:membership.userId,
            action:"TASK_ATTACHMENT",
            description:`Uploaded ${storage.fileName}`
        }
    });

    const attachment =
        await prisma.taskAttachment.create({
            data:{
                taskId,
                membershipId:membership.id,
                fileName:storage.fileName,
                fileUrl:storage.fileUrl,
                mimeType:storage.mimeType,
                size:storage.size,
                checksum:storage.checksum,
                bucket:storage.bucket,
                storagePath:storage.storagePath
            }
        });

    const task =
        await prisma.task.findUnique({
            where:{
                id:taskId
            },

            include:{
                createdBy:{
                    include:{
                        user:true
                    }
                },

                assignedTo:{
                    include:{
                        membership:{
                            include:{
                                user:true
                            }
                        }
                    }
                }
            }
        });

    if(
        task.createdBy.userId !==
        membership.userId
    ){
        await createNotification({
            userId:
                task.createdBy.userId,
            title:"Task Attachment",
            message:
                `${membership.user.name} uploaded "${storage.fileName}"`,
            type:"TASK"
        });
    }

    if(
        task.assignedTo &&
        task.assignedTo.membership.userId !==
        membership.userId
    ){
        await createNotification({
            userId:
                task.assignedTo.membership.userId,
            title:"Task Attachment",
            message:
                `${membership.user.name} uploaded a file for your task.`,
            type:"TASK"
        });
    }

    return prisma.taskAttachment.findUnique({

        where:{
            id:attachment.id
        },

        include:{
            membership:{
                include:{
                    user:true
                }
            }
        }
    });
};

const getAttachments = async (taskId)=>{
    const attachments =
        await prisma.taskAttachment.findMany({
            where:{
                taskId,
                deletedAt:null
            },

            include:{
                membership:{
                    include:{
                        user:true
                    }
                }
            },

            orderBy:{
               uploadedAt:"desc"
            }
        });

    return attachments.map(file=>{
        const extension =
            file.fileName.includes(".")
            ? file.fileName.split(".").pop().toLowerCase()
            : "";

        return{
            id:file.id,
            fileName:file.fileName,
            url:file.fileUrl,
            extension,
            icon:getFileIcon(extension),
            size:file.size,
            mime:file.mimeType,
            uploadedBy:file.membership.user.name,
            uploadedAt:file.uploadedAt
        };
    });
};

const deleteAttachment = async(id)=>{
    return prisma.taskAttachment.update({
        where:{
            id
        },
        data:{
            deletedAt:new Date()
        }
    });
};

module.exports={
    uploadAttachment,
    getAttachments,
    deleteAttachment
};