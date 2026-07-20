const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const service = require("../services/meetingPollService");

const createPoll = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    if (!meetingId) {
        throw new ApiError(400, "Invalid meeting.");
    }

    const poll = await service.createPoll(
        meetingId,
        req.user.membershipId,
        req.body
    );

    await auditLogger(req, {
        action: "MEETING_POLL_CREATED",
        entityType: "MeetingPoll",
        entityId: poll.id
    });

    res.status(201).json({
        success: true,
        poll
    });
});

const vote = asyncHandler(async (req, res) => {
    const optionId = Number(req.params.optionId);

    const result = await service.vote(
        optionId,
        req.user.membershipId
    );

    await auditLogger(req,{
        action:"MEETING_POLL_VOTED",
        entityType:"MeetingPollOption",
        entityId:optionId
    });

    res.json({
        success:true,
        result
    });
});

const getPolls = asyncHandler(async(req,res)=>{
    const polls = await service.getPolls(
        Number(req.params.id)
    );

    res.json({
        success:true,
        polls
    });
});

module.exports = {
    createPoll,
    vote,
    getPolls
};