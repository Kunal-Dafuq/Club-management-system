const prisma = require("../config/prisma");

const {summarizeMeeting} = require("./openAIService");

const generateSummary = async (
    meetingId,
    transcript
) => {
    const meeting =
        await prisma.committeeMeeting.findUnique({
            where: {
                id: meetingId
            }
        });

    if (!meeting) {
        throw new Error("Meeting not found");
    }

    const ai =
        await summarizeMeeting(
            transcript
        );

    if (
        Array.isArray(ai.actionItems)
    ) {
        for (const item of ai.actionItems) {
            await prisma.task.create({
                data: {
                    title:
                        typeof item === "string"
                            ? item
                            : item.title,
                    description:
                        typeof item === "string"
                            ? null
                            : item.description || null,
                    committeeId:
                        meeting.committeeId,
                    createdById:
                        meeting.organizerId
                }
            });
        }
    }

    return prisma.meetingSummary.create({
        data: {
            meetingId,
            transcript,
            summary:
                ai.summary,
            actionItems:
                ai.actionItems,
            decisions:
                ai.decisions,
            nextSteps:
                ai.nextSteps
        }
    });
};

const getSummary = async (
    meetingId
) => {
    return prisma.meetingSummary.findFirst({
        where: {
            meetingId
        }
    });
};

module.exports = {
    generateSummary,
    getSummary
};