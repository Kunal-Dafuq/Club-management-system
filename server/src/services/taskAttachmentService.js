const prisma = require("../config/prisma");
const getFileIcon = require("../utils/fileIcon");
const {createNotification} = require("./notificationService");

const uploadAttachment = async (
    taskId,
    membershipId,
    file
) => {
    const membership = await prisma.membership.findUnique({
        where:{
            id: membershipId
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
            clubId: membership.clubId,
            userId: membership.userId,
            action:"TASK_ATTACHMENT",
            description:`Uploaded ${file.originalname}`
        }
    });

    const attachment = await prisma.taskAttachment.create({
        data:{
            taskId,
            membershipId: membership.id,
            fileName: file.originalname,
            fileUrl: file.path,
            fileSize: file.size,
            mimeType: file.mimetype
        }
    });

    const task = await prisma.task.findUnique({
        where:{
            id:taskId
        },
        include:{
            committee:true,
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

    if(task.createdBy.userId !== membership.userId){
        await createNotification(
            task.createdBy.userId,
            `${membership.user.name} uploaded "${file.originalname}" on your task.`
        );
    }

    if(
        task.assignedTo && task.assignedTo.membership.userId !== membership.userId
    ){
        await createNotification(
            task.assignedTo.membership.userId,
            `${membership.user.name} uploaded a file for your task.`
        );
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
    });;
};

const getAttachments = async (taskId) => {
    const attachments = await prisma.taskAttachment.findMany({
        where: {
            taskId
        },
        include: {
            uploadedBy: {
                include: {
                    user: true
                }
            }
        },
        orderBy:{
        uploadedAt:"desc"
        }
    });

    return attachments.map(file => {
        const extension =
        file.fileName.includes(".")
        ? file.fileName.split(".").pop().toLowerCase()
        : "";

        const icon = getFileIcon(extension);

        return {
            id: file.id,
            fileName: file.fileName,
            url: file.fileUrl,
            extension,
            icon,
            size: file.fileSize,
            mime: file.mimeType,
            uploadedBy: file.membership.user.name,
            uploadedAt: file.uploadedAt
        };
    });
};

const deleteAttachment = async(id)=>{
    return prisma.taskAttachment.delete({
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