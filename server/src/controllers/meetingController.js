const meetingService = require("../services/meetingService");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");
const { createActivity } = require("../services/activityService");

const createMeeting = asyncHandler(async (req, res) => {
    const committeeId = Number(req.params.committeeId);
    const userId = req.user.id;

    if (!committeeId || isNaN(committeeId)) {
        throw new ApiError(400, "Valid committee ID is required.");
    }

    const meeting = await meetingService.createMeeting(
        committeeId,
        userId,
        req.body
    );

    if (
        meeting.organizer.userId !== userId &&
        req.user.role !== "PRESIDENT" &&
        req.user.role !== "SUPER_ADMIN"
    ) {
        throw new ApiError(403, "Not allowed to create meetings for this committee.");
    }

    const clubId = meeting.committee?.clubId;

    if (clubId) {
        await createActivity({
            clubId,
            userId,
            action: "MEETING_CREATED",
            description: `${meeting.title} created`
        });

        await auditLogger(req, {
            action: "MEETING_CREATED",
            entityType: "Meeting",
            entityId: meeting.id,
            clubId
        });
    }

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-created", meeting);

    res.status(201).json({
        success: true,
        meeting
    });
});

const getCommitteeMeetings = asyncHandler(async (req, res) => {
    const committeeId = Number(req.params.committeeId);

    if (!committeeId || isNaN(committeeId)) {
        throw new ApiError(400, "Valid committee ID is required.");
    }

    const meetings = await meetingService.getCommitteeMeetings(committeeId);

    res.json({
        success: true,
        meetings
    });
});

const getMeeting = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    if (!meetingId || isNaN(meetingId)) {
        throw new ApiError(400, "Valid meeting ID is required.");
    }

    const meeting = await meetingService.getMeeting(meetingId);

    if (!meeting) {
        throw new ApiError(404, "Meeting not found.");
    }

    res.json({
        success: true,
        meeting
    });
});

const updateMeeting = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    if (!meetingId || isNaN(meetingId)) {
        throw new ApiError(400, "Valid meeting ID is required.");
    }

    const meeting = await meetingService.updateMeeting(meetingId, req.body);

    if (!meeting) {
        throw new ApiError(404, "Meeting not found or failed to update.");
    }

    await auditLogger(req, {
        action: "MEETING_UPDATED",
        entityType: "Meeting",
        entityId: meeting.id,
        clubId: meeting.committee?.clubId
    });

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-updated", meeting);

    res.json({
        success: true,
        meeting
    });
});

const deleteMeeting = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    if (!meetingId || isNaN(meetingId)) {
        throw new ApiError(400, "Valid meeting ID is required.");
    }

    const meeting = await meetingService.getMeeting(meetingId);

    if (!meeting) {
        throw new ApiError(404, "Meeting not found.");
    }

    if (
        meeting.organizerId !== req.user.membershipId &&
        req.user.role !== "PRESIDENT" &&
        req.user.role !== "SUPER_ADMIN"
    ) {
        throw new ApiError(403, "Not allowed to delete this meeting.");
    }

    await meetingService.deleteMeeting(meetingId);

    await auditLogger(req, {
        action: "MEETING_DELETED",
        entityType: "Meeting",
        entityId: meeting.id,
        clubId: meeting.committee?.clubId
    });

    req.io
        ?.to(`committee-${meeting.committeeId}`)
        .emit("meeting-deleted", meeting.id);

    res.json({
        success: true,
        message: "Meeting deleted successfully."
    });
});

const markAttendance = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);
    const membershipId = Number(req.body.membershipId);
    const status = req.body.status;

    if (!meetingId || isNaN(meetingId) || !membershipId || isNaN(membershipId)) {
        throw new ApiError(400, "Valid meeting ID and membership ID are required.");
    }

    const attendance = await meetingService.markAttendance(
        meetingId,
        membershipId,
        status
    );

    await auditLogger(req, {
        action: "MEETING_ATTENDANCE",
        entityType: "MeetingAttendance",
        entityId: attendance.id
    });

    res.json({
        success: true,
        attendance
    });
});

const restoreMeeting = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
        throw new ApiError(400, "Valid meeting ID is required.");
    }

    const meeting = await meetingService.restoreMeeting(id);

    if (!meeting) {
        throw new ApiError(404, "Meeting not found or cannot be restored.");
    }

    await auditLogger(req, {
        action: "MEETING_RESTORED",
        entityType: "Meeting",
        entityId: id,
        clubId: meeting.committee?.clubId
    });

    res.json({
        success: true,
        meeting
    });
});

const getMeetingStatistics = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    if (!meetingId || isNaN(meetingId)) {
        throw new ApiError(400, "Valid meeting ID is required.");
    }

    const stats = await meetingService.getMeetingStatistics(meetingId);

    res.json({
        success: true,
        statistics: stats
    });
});

const transcribeMeetingRoute = asyncHandler(async (req, res) => {
    const { audioUrl } = req.body;

    if (!audioUrl) {
        throw new ApiError(400, "Audio URL is required for transcription.");
    }

    const transcriptResult = await meetingService.transcribeAudioWithWhisper(audioUrl);

    res.json({
        success: true,
        transcript: transcriptResult.transcript,
        duration: transcriptResult.duration
    });
});

const summarizeMeetingRoute = asyncHandler(async (req, res) => {
    const { transcript } = req.body;

    if (!transcript) {
        throw new ApiError(400, "Transcript text is required for summarization.");
    }

    const summaryResult = await meetingService.summarizeTranscriptWithOllama(transcript);

    res.json({
        success: true,
        ...summaryResult
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
    transcribeMeetingRoute,
    summarizeMeetingRoute
};