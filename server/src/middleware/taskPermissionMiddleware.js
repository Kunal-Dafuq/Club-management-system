const prisma=require("../config/prisma");

const canManageTask=async(req,res,next)=>{
    try{
        const taskId=Number(req.params.taskId);
        const userId=req.user.id;
        const task=await prisma.task.findUnique({
            where:{
                id:taskId
            },
            include:{
                committee:true
            }
        });

        if(!task){
            return res.status(404).json({

                message:"Task not found"

            });
        }

        const membership=await prisma.membership.findFirst({
            where:{
                userId,
                clubId:task.committee.clubId,
                status:"APPROVED"
            },
            include:{
                committeeMemberships:true
            }
        });

        if(!membership){
            return res.status(403).json({

                message:"Not a club member"

            });
        }

        if(
            membership.clubRole==="PRESIDENT" ||
            membership.clubRole==="LEAD"
        ){
            req.membership=membership;
            return next();
        }

        const committeeRole=membership.committeeMemberships.find(
            cm=>cm.committeeId===task.committeeId
        );

        if(
            committeeRole &&
            (
                committeeRole.role==="HEAD" ||
                committeeRole.role==="COORDINATOR"
            )
        ){
            req.membership=membership;
            return next();
        }

        return res.status(403).json({

            message:"Permission denied"

        });
    }

    catch(err){
        console.log(err);
        res.status(500).json({

            message:"Server Error"

        });
    }
};

module.exports={
    canManageTask
};