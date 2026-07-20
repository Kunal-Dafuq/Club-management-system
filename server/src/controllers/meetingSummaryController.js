const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const {prepareAudio} = require("../services/ai/audioService");

const {transcribe} = require("../services/ai/whisperService");

const {loadTranscript} = require("../services/ai/transcriptService");

const {generateMeetingSummary} = require("../services/ai/ollamaService");

const generateSummary = asyncHandler(async (req, res) => {
    const meetingId = Number(req.params.id);

    let transcript;

    if (req.file) {
        const audio = await prepareAudio(
            req.body.audioUrl
        );

        const transcriptPath = await transcribe(audio);

        transcript = await loadTranscript(
            transcriptPath
        );

    } else if (req.body.transcript) {    
        transcript = req.body.transcript;
    
    } else {
        throw new ApiError(
            400,
            "Upload audio or provide transcript."
        );
    }

    let summary;

    try {
        const ai =
            await generateMeetingSummary(
                transcript
            );

        summary =
            await prisma.meetingSummary.upsert({
                where: {
                    meetingId
                },

                update: {
                    transcript,
                    summary: ai.summary,
                    actionItems: ai.actionItems,
                    decisions: ai.decisions,
                    nextSteps: ai.nextSteps,
                    generatedByAI: true,
                    updatedAt: new Date()
                },

                create: {
                    meetingId,
                    transcript,
                    summary: ai.summary,
                    actionItems: ai.actionItems,
                    decisions: ai.decisions,
                    nextSteps: ai.nextSteps,
                    generatedByAI: true
                }
            });
    } catch (error) {
        console.error(error);

        summary =
            await prisma.meetingSummary.upsert({
                where: {
                    meetingId
                },

                update: {
                    transcript,
                    summary:"AI summary could not be generated.",
                    generatedByAI: false,
                    updatedAt: new Date()
                },

                create: {
                    meetingId,
                    transcript,
                    summary:"AI summary could not be generated.",
                    generatedByAI: false
                }
            });
    }

    await auditLogger(req, {
        action:"MEETING_SUMMARY_GENERATED",
        entityType:"Meeting",
        entityId:meetingId
    });

    res.json({
        success: true,
        summary
    });
});

const getSummary = asyncHandler(async (req, res) => {
    const meetingId =
        Number(req.params.id);

    const summary =
        await prisma.meetingSummary.findUnique({
            where: {
                meetingId
            }
        });

    if (!summary) {
        throw new ApiError(
            404,
            "Summary not found."
        );
    }

    res.json({
        success: true,
        summary
    });
});

module.exports = {
    generateSummary,
    getSummary
};