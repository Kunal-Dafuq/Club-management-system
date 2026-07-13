const prisma = require("../config/prisma");

const createMeeting = async (
    committeeId,
    createdById,
    data
) => {
    const committee =
        await prisma.committee.findUnique({
            where: {
                id: committeeId
            }
        });

    if (!committee) {
        throw new Error("Committee not found");
    }

    const creator =
        await prisma.membership.findUnique({
            where: {
                id: createdById
            },
            include: {
                user: true
            }
        });

    if (!creator) {
        throw new Error("Creator not found");
    }

    if(data.isInstant){
        const startTime=
            new Date();

        const endTime=
            new Date(
                Date.now()
                +
                60*60*1000
            );
    }

    let meetingLink = null;
    let calendarEventId = null;

    if (
        data.meetingProvider === "GOOGLE_MEET"
    ) {

        const event =
            await createMeetEvent({
                accessToken:data.accessToken,
                title:data.title,
                description:data.description,
                startTime:new Date(data.startTime).toISOString(),
                endTime:new Date(data.endTime).toISOString(),
                attendees: []
            });

        meetingLink = event.hangoutLink;
        calendarEventId = event.id;
    }

    return prisma.committeeMeeting.create({
        data: {
            title:data.title,
            description:data.description,
            agenda:data.agenda,
            startTime:new Date(data.startTime),
            endTime:new Date(data.endTime),
            meetingProvider:data.meetingProvider,
            isInstant:data.isInstant || false,
            onlineLink:meetingLink,
            calendarEventId,
            committeeId,
            organizerId:createdById
        },

        include: {
            committee: true,
            organizer: {
                include: {
                    user: true
                }
            }
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
    return prisma.committeeMeeting.update({
        where:{
            id:meetingId
        },
        data:{
            deletedAt:new Date()
        }
    });

    await createAuditLog({
        action:"MEETING_DELETED"
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