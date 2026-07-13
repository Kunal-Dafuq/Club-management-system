const prisma = require("../config/prisma");

const createPoll = async (
    meetingId,
    createdById,
    data
) => {
    return prisma.meetingPoll.create({
        data: {
            meetingId,
            createdById,
            question:
                data.question,
            multipleChoice:
                data.multipleChoice,
            options: {
                create:
                    data.options.map(option => ({
                        option
                    }))
            }
        },

        include: {
            options: true
        }
    });
};

const vote = async (
    optionId
) => {
    return prisma.meetingPollOption.update({
        where: {
            id: optionId
        },

        data: {
            votes: {
                increment: 1
            }
        }
    });
};

const getPolls = async (
    meetingId
) => {
    return prisma.meetingPoll.findMany({
        where: {
            meetingId
        },
        include: {
            options: true
        }
    });
};

module.exports = {
    createPoll,
    vote,
    getPolls
};