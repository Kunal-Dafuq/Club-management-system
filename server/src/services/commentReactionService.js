const prisma=require("../config/prisma");

const react=async(
    commentId,
    membershipId,
    emoji
)=>{

    return prisma.taskCommentReaction.upsert({
        where:{
            commentId_membershipId_emoji:{
                commentId,
                membershipId,
                emoji
            }
        },
        update:{},
        create:{
        commentId,
        membershipId,
        emoji
        }
    });
};

module.exports={react};