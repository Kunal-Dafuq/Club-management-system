const prisma = require("../config/prisma");
const { createAuditLog } = require("./auditService");
const {createActivity} = require("./activityService");
const auditLogger = require("../utils/auditLogger");
const ApiError = require("../utils/ApiError");
const {createMeetEvent,updateCalendarEvent,deleteCalendarEvent} = require("./googleCalendarService");

const createMeeting = async (committeeId,createdById,data) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        }
    });

    if (!committee) {
        throw new ApiError(
            404,
            "Committee not found."
        );
    }

    const organizer =
        await prisma.membership.findUnique({
            where: {
                id: createdById
            },
            include: {
                user: true
            }
        });

    if (!organizer) {
        throw new Error(
            404,
            "Organizer not found."
        );
    }

    let startTime = new Date(data.startTime);

    let endTime = new Date(data.endTime);

    if(data.isInstant){
        startTime = new Date();
        endTime = new Date(
            Date.now()+60*60*1000
        );
    }

    let meetingLink = null;
    let calendarEventId = null;

    if (data.meetingProvider === "GOOGLE_MEET") {
        const organizer = await prisma.membership.findUnique({
            where:{
                id:createdById
            },

            include:{
                user:true
            }
        });

        const event = await createMeetEvent({
            accessToken: organizer.user.googleAccessToken,
            title: data.title,
            description: data.description,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            attendees: []
        });

        meetingLink = event.hangoutLink;
        calendarEventId = event.id;
    }

    return await prisma.$transaction(async (tx) => {
        const meeting = await tx.committeeMeeting.create({
            data:{
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
        return meeting;
    });
};

const getCommitteeMeetings = async (committeeId) => {
    return prisma.committeeMeeting.findMany({
        where: {
            committeeId
        },
        include: {
            organizer: {
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
    return prisma.committeeMeeting.findUnique({
        where: {
            id: meetingId
        },
        include: {
            organizer: {
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

const updateMeeting = async (meetingId, data) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: {
            id: meetingId
        },
        include: {
            organizer: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!meeting) {
        throw new Error("Meeting not found");
    }

    if (
        meeting.calendarEventId &&
        meeting.meetingProvider === "GOOGLE_MEET"
    ) {
        await updateCalendarEvent({
            accessToken: meeting.organizer.user.googleAccessToken,
            eventId: meeting.calendarEventId,
            title: data.title,
            description: data.description,
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString(),
            attendees: []
        });
    }

    return prisma.committeeMeeting.update({
        where: {
            id: meetingId
        },
        data: {
            title: data.title,
            agenda: data.agenda,
            location: data.location,
            onlineLink: data.meetingLink,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime)
        }
    });
};

const deleteMeeting = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.findUnique({
        where: {
            id: meetingId
        },
        include: {
            organizer: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!meeting) {
        throw new ApiError(
            404,
            "Meeting not found."
        );
    }

    if (
        meeting.calendarEventId &&
        meeting.meetingProvider === "GOOGLE_MEET"
    ) {
        await deleteCalendarEvent({
            eventId: meeting.calendarEventId,
            auth: meeting.organizer.user.googleAccessToken
        });
    }

    const deleted = await prisma.committeeMeeting.update({
        where: {
            id: meetingId
        },
        data: {
            deletedAt: new Date()
        }
    });

    await createAuditLog({
        action: "MEETING_DELETED",
        entityType: "Meeting",
        entityId: deleted.id,
        committeeId: deleted.committeeId
    });

    return deleted;
};

const restoreMeeting = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.update({
            where: {
                id: meetingId
            },

            data: {
                deletedAt: null
            }
        });

    await auditLogger({
        action: "MEETING_RESTORED",
        entityType: "Meeting",
        entityId: meeting.id,
        committeeId: meeting.committeeId
    });

    return meeting;

};

const markAttendance = async (meetingId,membershipId,status) => {
    const attendance = await prisma.meetingAttendance.upsert({
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

    const meeting = await prisma.committeeMeeting.findUnique({
            where: {
                id: meetingId
            },

            include: {
                committee: true
            }
        });

    await createActivity({
        clubId:meeting.committee.clubId,
        userId:membershipId,
        action:"MEETING_ATTENDANCE",
        description:`Attendance marked as ${status}.`
    });

    return attendance;
};

const getMeetingStatistics = async (meetingId) => {
    const meeting = await prisma.committeeMeeting.findUnique({
            where: {
                id: meetingId
            },

            include: {
                attendees: true,
                committee: {
                    include: {
                        members: true
                    }
                }
            }
        });

    if (!meeting) {
        throw new ApiError(
            404,
            "Meeting not found."
        );
    }

    const present = meeting.attendees.filter(
        a => a.status === "PRESENT"
    ).length;

    const absent = meeting.attendees.filter(
        a => a.status === "ABSENT"
    ).length;

    const late = meeting.attendees.filter(
        a => a.status === "LATE"
    ).length;

    const excused = meeting.attendees.filter(
        a => a.status === "EXCUSED"
    ).length;

    const pending = meeting.committee.members.length -
        meeting.attendees.length;

    const totalMembers = meeting.committee.members.length;

    return {
        present,
        absent,
        late,
        excused,
        pending,
        totalMembers,
        attendancePercentage:
            totalMembers === 0
                ? 0 : Math.round(
                    ((present + late)/ totalMembers)* 100
                )
    };
};

module.exports = {
    createMeeting,
    getCommitteeMeetings,
    getMeeting,
    updateMeeting,
    deleteMeeting,
    restoreMeeting,
    markAttendance,
    getMeetingStatistics
};