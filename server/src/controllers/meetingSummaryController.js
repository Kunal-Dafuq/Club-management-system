const prisma = require("../config/prisma");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const { generateMeetingSummary } = require("../services/meetingSummaryService");

const generateStandaloneSummary = asyncHandler(async (req, res) => {
    const { transcript } = req.body;

    if (!transcript) {
        throw new ApiError(400, "Transcript is required.");
    }

    const aiResponse = await generateMeetingSummary(transcript);

    res.status(200).json({
        success: true,
        ...aiResponse
    });
});

const generateSummary = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    const meeting = await prisma.committeeMeeting.findUnique({
        where: { id: meetingId },
        include: { summaries: true } 
    });

    if (!meeting) {
        throw new ApiError(404, "Meeting not found.");
    }

    const transcript = req.body.transcript || meeting.transcript; 
    
    if (!transcript) {
        throw new ApiError(400, "Transcript not available.");
    }

    const ai = await generateMeetingSummary(transcript);

    const summary = await prisma.meetingSummary.upsert({
        where: { meetingId },
        update: {
            transcript,
            summary: ai.summary,
            discussionPoints: ai.discussionPoints,
            decisions: ai.decisions,
            actionItems: ai.actionItems,
            nextSteps: ai.nextSteps,
            generatedByAI: true
        },
        create: {
            meetingId,
            transcript,
            summary: ai.summary,
            discussionPoints: ai.discussionPoints,
            decisions: ai.decisions,
            actionItems: ai.actionItems,
            nextSteps: ai.nextSteps,
            generatedByAI: true
        }
    });

    await auditLogger(req, {
        action: "MEETING_SUMMARY_GENERATED",
        entityType: "Meeting",
        entityId: meetingId
    });

    res.status(200).json({
        success: true,
        summary
    });
});

const getSummary = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    const summary = await prisma.meetingSummary.findUnique({
        where: { meetingId }
    });

    if (!summary) {
        throw new ApiError(404, "Summary not found.");
    }

    res.status(200).json({
        success: true,
        summary
    });
});

module.exports = {
    generateStandaloneSummary,
    generateSummary,
    getSummary
};