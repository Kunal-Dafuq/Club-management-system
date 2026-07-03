const prisma = require("../config/prisma");

const createMeeting = async (
    committeeId,
    createdById,
    data
) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return prisma.meeting.create({
        data: {
            title: data.title,
            agenda: data.agenda,
            location: data.location,
            meetingLink: data.meetingLink,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            committeeId,
            createdById
        }
    });
};

const getCommitteeMeetings = async (committeeId) => {
    return prisma.meeting.findMany({
        where: {
            committeeId
        },
        include: {
            creator: {
                include: {
                    user: true
                }
            }
        },
        orderBy: {
            startTime: "asc"
        }
    });
};

const getMeeting = async (meetingId) => {
    return prisma.meeting.findUnique({
        where: {
            id: meetingId
        },
        include: {
            creator: {
                include: {
                    user: true
                }
            },
            attendees: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });
};

const updateMeeting = async (
    meetingId,
    data
) => {
    return prisma.meeting.update({
        where: {
            id: meetingId
        },

        data: {
            title: data.title,
            agenda: data.agenda,
            location: data.location,
            meetingLink: data.meetingLink,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime)
        }
    });
};

const deleteMeeting = async (meetingId) => {
    return prisma.meeting.delete({
        where: {
            id: meetingId
        }
    });
};

const markAttendance = async (
    meetingId,
    membershipId,
    status
) => {
    return prisma.meetingAttendance.upsert({
        where: {
            meetingId_membershipId: {
                meetingId,
                membershipId
            }
        },
        create: {
            meetingId,
            membershipId,
            status
        },
        update: {
            status
        }
    });
};

module.exports = {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    markAttendance
};