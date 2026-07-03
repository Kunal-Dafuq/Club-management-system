const prisma = require("../config/prisma");
const {createNotification}=require("./notificationService");
const extractMentions=require("../utils/mentionParser");

const createComment = async (taskId, userId, content) => {
    return prisma.$transaction(async (tx) => {
        const membership = await tx.membership.findFirst({
            where:{
                userId,
                clubId: task.committee.clubId,
                status:"APPROVED"
            }
        });

        const task = await tx.task.findUnique({
            where: { id: taskId },
            include: {
                committee: true
            }
        });

        if (!task) {
            throw new Error("Task not found");
        }

        const membership = await tx.membership.findFirst({
            where: {
                userId,
                clubId: task.committee.clubId,
                status: "APPROVED"
            }
        });

        if (!membership) {
            throw new Error("Membership not found");
        }

        const comment = await tx.taskComment.create({
            data:{
                content,
                taskId,
                membershipId: membership.id
            }
        });

        const mentions=extractMentions(content);
        for(const username of mentions){
            const user=await prisma.user.findFirst({
                where:{
                    name:username
                }
            });

            if(user){
                await createNotification(
                    user.id,
                    `${membership.user.name} mentioned you.`
                );

            }

        }

        await tx.activity.create({
            data: {
                clubId: membership.clubId,
                userId: membership.userId,
                action: "TASK_COMMENT",
                description: `${comment.membership.user.name} commented on "${task.title}"`
            }
        });

        if(task.createdById!==userId){
            await createNotification(
                task.createdById,
                `${membership.user.name} commented on your task.`
            );

        }

        return comment;

    });
};

const getComments = async(taskId)=>{
    return prisma.taskComment.findMany({
        where:{
            taskId
        },
        include:{
            membership:{
                include:{
                    user:true
                }
            }
        },
        orderBy:{
            createdAt:"asc"
        }
    });
};

const replyComment = async (
    parentId,
    userId,
    content
) => {

    await prisma.activity.create({
        data:{
            clubId:membership.clubId,
            userId,
            action:"TASK_REPLY",
            description:"Replied to a task comment"
        }
    });

    const parent = await prisma.taskComment.findUnique({
        where:{
            id: parentId
        },
        include:{
            task:{
                include:{
                    committee:true
                }
            }
        }
    });

    if(!parent){
        throw new Error("Comment not found");
    }

    if(parent.membership.userId!==userId){
        await createNotification(
            parent.membership.userId,
            `${membership.user.name} replied to your comment.`
        );
    }

    const membership = await prisma.membership.findFirst({
        where:{
            userId,
            clubId: parent.task.clubId,
            status:"APPROVED"
        }
    });

    if(!membership){
        throw new Error("Membership not found");
    }

    return prisma.taskComment.create({
        data:{
            parentId,
            taskId: parent.taskId,
            membershipId: membership.id,
            content
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

const updateComment = async (
    commentId,
    userId,
    content
) => {
    const comment = await prisma.taskComment.findUnique({
        where:{
            id:commentId
        },
        include:{
            membership:true,
            task:{
                include:{
                    committee:true
                }
            }
        }
    });

    if(!comment){
        throw new Error("Comment not found");
    }

    if(comment.membership.userId!==userId){
        throw new Error("Unauthorized");
    }

    const updated = await prisma.taskComment.update({
        where:{
            id:commentId
        },
        data:{
            content,
            editedAt:new Date()
        }
    });

    await prisma.activity.create({
        data:{
            clubId:comment.task.committee.clubId,
            userId,
            action:"TASK_COMMENT_EDITED",
            description:"Edited a task comment"
        }
    });

    return updated;

};

const deleteComment = async (
    commentId,
    userId
)=>{
    const comment = await prisma.taskComment.findUnique({

        where:{
            id:commentId
        },
        include:{
            membership:true,

            task:{
                include:{
                    committee:true
                }
            }
        }
    });

    if(!comment){
        throw new Error("Comment not found");
    }

    const membership = await prisma.membership.findFirst({
        where:{
            userId,
            clubId:comment.task.committee.clubId
        },
        include:{
            committeeMemberships:true
        }
    });

    let allowed=false;

    if(comment.membership.userId===userId){
        allowed=true;
    }

    if(
        membership.clubRole==="PRESIDENT"
    ){
        allowed=true;
    }

    const isHead =
        membership.committeeMemberships.some(
            member=>member.role==="HEAD"
        );

    if(isHead){
        allowed=true;
    }

    if(!allowed){
        throw new Error("Unauthorized");
    }

    await prisma.activity.create({
        data:{
            clubId:membership.clubId,
            userId,
            action:"TASK_COMMENT_DELETED",
            description:"Deleted a task comment"
        }
    });

    return prisma.taskComment.delete({
        where:{
            id:commentId
        }
    });
};

const getTaskComments = async (taskId) => {
    return prisma.taskComment.findMany({
        where: {
            taskId,
            parentId: null
        },
        include: {
            membership: {
                include: {
                    user: true
                }
            },
            replies: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
};

module.exports = {
    createComment,
    replyComment,
    updateComment,
    deleteComment,
    getTaskComments
};