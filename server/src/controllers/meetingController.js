const meetingService = require("../services/meetingService");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const auditLogger = require("../utils/auditLogger");
const { createActivity } = require("../services/activityService");

const createMeeting = asyncHandler(async (req, res) => {
    const meeting = await meetingService.createMeeting(
        Number(req.params.committeeId),
        req.user.membershipId,
        req.body
    );

    if (
        meeting.organizerId !== req.user.membershipId &&
        req.user.role !== "PRESIDENT"
    ) {
        throw new ApiError(403, "Not allowed.");
    }

    await createActivity({
        clubId: meeting.committee.clubId,
        userId: req.user.id,
        action: "MEETING_CREATED",
        description: `${meeting.title} created`
    });

    await auditLogger(req,{
        action:"MEETING_CREATED",
        entityType:"Meeting",
        entityId:meeting.id,
        clubId:meeting.committee.clubId
    });

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-created",meeting);

    res.status(201).json({
        success:true,
        meeting
    });
});

const getCommitteeMeetings = asyncHandler(async(req,res)=>{
    const meetings =
        await meetingService.getCommitteeMeetings(
            Number(req.params.committeeId)
        );

    res.json({
        success:true,
        meetings
    });
});

const getMeeting = asyncHandler(async(req,res)=>{
    const meeting =
        await meetingService.getMeeting(
            Number(req.params.id)
        );

    if(!meeting){
        throw new ApiError(
            404,
            "Meeting not found."
        );
    }

    res.json({
        success:true,
        meeting
    });
});

const updateMeeting = asyncHandler(async(req,res)=>{
    const meeting =
        await meetingService.updateMeeting(
            Number(req.params.id),
            req.body
        );

    await auditLogger(req,{
        action:"MEETING_UPDATED",
        entityType:"Meeting",
        entityId:meeting.id
    });

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-updated",meeting);

    res.json({
        success:true,
        meeting
    });
});

const deleteMeeting = asyncHandler(async(req,res)=>{
    const meeting =await meetingService.deleteMeeting(
        Number(req.params.id)
    );

    if(
        meeting.organizerId!==req.user.membershipId &&
        req.user.role!=="PRESIDENT"
    ){
        throw new ApiError(
            403,
            "Not allowed."
        );
    }

    await auditLogger(req,{
        action:"MEETING_DELETED",
        entityType:"Meeting",
        entityId:meeting.id
    });

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-deleted",meeting.id);

    res.json({
        success:true,
        message:"Meeting deleted."
    });
});

const markAttendance = asyncHandler(async(req,res)=>{
    const attendance =
        await meetingService.markAttendance(
            Number(req.params.id),
            Number(req.body.membershipId),
            req.body.status
        );

    await auditLogger(req,{
        action:"MEETING_ATTENDANCE",
        entityType:"MeetingAttendance",
        entityId:attendance.id
    });

    res.json({
        success:true,
        attendance
    });
});

const restoreMeeting = asyncHandler(async(req,res)=>{
        const id = Number(req.params.id);

        const meeting = await meetingService.restoreMeeting(id);

        await auditLogger(req,{
            action:"MEETING_RESTORED",
            entityType:"Meeting",
            entityId:id
        });
        res.json(meeting);
});

const getMeetingStatistics = asyncHandler(async (req,res) => {
    const stats = await meetingService.getMeetingStatistics(
        Number(req.params.id)
    );

    res.json({
        success: true,
        statistics: stats
    });
});

module.exports = {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    restoreMeeting,
    markAttendance,
    getMeetingStatistics,
};