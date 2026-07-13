const prisma = require("../config/prisma");

const reorderTasks = async (
    committeeId,
    orderedIds
) => {
    const updates = orderedIds.map((id,index)=>
        prisma.task.update({
            where:{
                id
            },

            data:{
                position:index+1
            }
        })
    );

    await prisma.$transaction(updates);

};

module.exports={
    reorderTasks
};