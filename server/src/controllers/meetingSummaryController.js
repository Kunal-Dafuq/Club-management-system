const service = require("../services/meetingSummaryService");

const generateSummary = async(
    req,
    res
)=>{
    try{
        const summary =
            await service.generateSummary(
                Number(req.params.id),
                req.body.transcript
            );
        res.json(summary);
    }

    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getSummary = async(
    req,
    res
)=>{
    try{
        const summary =
            await service.getSummary(
                Number(req.params.id)
            );
        res.json(summary);
    }

    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports={
    generateSummary,
    getSummary
};