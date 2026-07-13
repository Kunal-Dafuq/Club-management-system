const prisma = require("../config/prisma");
const {createNotification}=require("./notificationService");
const extractMentions=require("../utils/mentionParser");

const createComment = async (taskId, userId, content) => {
    return prisma.$transaction(async (tx) => {
        const task = await tx.task.findUnique({
            where:{
                id:taskId
            },
            include:{
                committee:true,
                createdBy:{
                    include:{
                        user:true
                    }
                }
            }
        });

        if(!task){
            throw new Error("Task not found");
        }

        const membership = await tx.membership.findFirst({
            where:{
                userId,
                clubId:task.committee.clubId,
                status:"APPROVED"
            },
            include:{
                user:true
            }
        });

        if(!membership){
            throw new Error("Membership not found");
        }

        const comment = await tx.taskComment.create({
            data:{
                content,
                taskId,
                membershipId: membership.id
            },
            include:{
                membership:{
                    include:{
                        user:true
                    }
                }
            }
        });

        const mentions = extractMentions(content);
        for(const username of mentions){
            const user = await tx.user.findFirst({
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
                description: `${membership.user.name} commented on "${task.title}"`
            }
        });

        const creatorMembership =
            await tx.membership.findUnique({
                where:{
                    id:task.createdById
                }
            });

        if (
            creatorMembership &&
            creatorMembership.userId !== userId
        ) {
            await createNotification(creatorMembership.userId,
                `${membership.user.name} commented on your task.`
            );
        }

        return comment;
    });
};

const replyComment = async (
    parentId,
    userId,
    content
) => {
    const parent = await prisma.taskComment.findUnique({
        where:{
            id: parentId
        },
        include:{
            membership:{
                include:{
                    user:true
                }
            },
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

    const membership =
        await prisma.membership.findFirst({
            where:{
                userId,
                clubId:parent.task.clubId,
                status:"APPROVED"
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
            userId,
            action:"TASK_REPLY",
            description:
            `${membership.user.name} replied to a task comment`
        }
    });

    if(parent.membership.userId!==userId){
        await createNotification(
            parent.membership.userId,
            `${membership.user.name} replied to your comment.`
        );
    }

    return prisma.taskComment.create({
        data:{
            parentId,
            taskId: parent.taskId,
            membershipId: membership.id,
            content
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
            membership:{
                include:{
                    user:true
                }
            },
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
            description:
            `${comment.membership.user.name} edited a task comment`
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
        data:{
            deletedAt:new Date()
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
            clubId:comment.task.committee.clubId,
            status:"APPROVED"
        },
        include:{
            committeeMemberships:true
        }
    });

    if(!membership){
        throw new Error("Membership not found");
    }

    let allowed=false;

    if(comment.membership.userId===userId){
        allowed=true;
    }

    if(
        membership.clubRole==="PRESIDENT"
    ){
        allowed=true;
    }

    const isHead = membership.committeeMemberships?.some(
        m=>m.role==="HEAD"
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
            description:
            `${membership.user.name} deleted a task comment`
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