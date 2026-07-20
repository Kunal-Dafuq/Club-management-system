const asyncHandler = require("../middleware/asyncHandler");

const ApiError = require("../utils/ApiError");

const service = require("../services/meetingRecordingService");

const uploadRecording = asyncHandler(async(req,res)=>{
    const{
        recordingUrl,
        bucket,
        storagePath,
        mimeType,
        size,
        checksum,
        duration
    }=req.body;

    if(!recordingUrl){
        throw new ApiError(
            400,
            "Recording URL required."
        );
    }

    const recording =
        await service.saveRecording({
            meetingId:Number(req.params.meetingId),
            membershipId:req.membership.id,
            recordingUrl,
            bucket,
            storagePath,
            mimeType,
            size,
            checksum,
            duration
        });

    res.status(201).json({
        success:true,
        recording
    });
});

const getRecordings = asyncHandler(async(req,res)=>{
    const recordings =
        await service.getRecordings(
            Number(req.params.meetingId)
        );

    res.json({
        success:true,
        recordings
    });
});

module.exports={
    uploadRecording,
    getRecordings
};