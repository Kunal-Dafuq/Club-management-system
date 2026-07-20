const prisma = require("../../config/prisma");
const fs = require("fs/promises");

const { prepareAudio } = require("./audioService");
const { transcribe } = require("./whisperService");
const { loadTranscript } = require("./transcriptService");
const { generateMeetingSummary } = require("./ollamaService");

const meetingPipeline = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: {
            id: meetingId
        },
        include: {
            recordings: {
                orderBy: {
                    createdAt: "desc"
                },
                take: 1
            }
        }
    });

    if (!meeting) {
        throw new Error("Meeting not found.");
    }

    if (!meeting.recordings.length) {
        throw new Error("No meeting recording found.");
    }

    const recording = meeting.recordings[0];

    if (!recording.recordingUrl) {
        throw new Error("Recording URL missing.");
    }

    if (meeting.aiSummaryStatus === "PROCESSING") {
        return;
    }

    await prisma.committeeMeeting.update({
        where: {
            id: meetingId
        },
        data: {
            aiSummaryStatus: "PROCESSING"
        }
    });

    let localAudio = null;
    let transcriptPath = null;

    try {
        localAudio = await prepareAudio(
            recording.recordingUrl
        );

        transcriptPath = await transcribe(
            localAudio
        );

        const transcript =
            await loadTranscript(
                transcriptPath
            );

        const ai =
            await generateMeetingSummary(
                transcript
            );

        const summary =
            await prisma.meetingSummary.upsert({
                where: {
                    meetingId
                },

                update: {
                    transcript,
                    summary: ai.summary,
                    decisions: ai.decisions,
                    actionItems: ai.actionItems,
                    nextSteps: ai.nextSteps,
                    generatedByAI: true,
                    updatedAt: new Date()
                },

                create: {
                    meetingId,
                    transcript,
                    summary: ai.summary,
                    decisions: ai.decisions,
                    actionItems: ai.actionItems,
                    nextSteps: ai.nextSteps,
                    generatedByAI: true
                }
            });

        await prisma.committeeMeeting.update({
            where: {
                id: meetingId
            },

            data: {
                aiSummaryStatus: "COMPLETED"
            }
        });

        if (global.io) {
            global.io
                .to(`meeting-${meetingId}`)
                .emit(
                    "meeting-summary-ready",
                    summary
                );
        }

        return summary;

    } catch (error) {
        console.error(error);

        await prisma.meetingSummary.upsert({
            where: {
                meetingId
            },

            update: {
                summary:"AI summary generation failed.",
                generatedByAI: false,
                updatedAt: new Date()
            },

            create: {
                meetingId,
                summary:"AI summary generation failed.",
                generatedByAI: false
            }
        });

        await prisma.committeeMeeting.update({
            where: {
                id: meetingId
            },

            data: {
                aiSummaryStatus: "FAILED"
            }
        });

        throw error;

    } finally {
        if (localAudio) {
            await fs.unlink(localAudio).catch(() => {});
        }

        if (transcriptPath) {
            await fs.unlink(transcriptPath).catch(() => {});
        }
    }
};

module.exports = meetingPipeline;