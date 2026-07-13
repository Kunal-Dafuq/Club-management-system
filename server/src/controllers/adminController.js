const cleanupService=require("../services/cleanupService");
const auditLogger=require("../utils/auditLogger");

const cleanup=async(req,res)=>{
    await cleanupService.cleanupSoftDeleted();

    await auditLogger(req,{
        action:"SYSTEM_CLEANUP",
        entityType:"System",
        description:"Permanent cleanup executed"
    });

    res.json({
        message:"Cleanup completed"
    });
};

module.exports={
    cleanup
};