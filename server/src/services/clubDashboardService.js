const prisma = require("../config/prisma");

const getClubDashboard = async (clubId) => {
    const [
        club,
        events,
        meetings,
        tasks,
        announcements,
        members
    ] = await prisma.$transaction([

        prisma.club.findUnique({
            where: { id: clubId }
        }),

        prisma.event.findMany({
            where: {
                clubId,
                deletedAt: null
            },
            orderBy: {
                startTime: "asc"
            },
            take: 5
        }),

        prisma.committeeMeeting.findMany({
            where: {
                committee: {
                    clubId
                },
                deletedAt: null
            },
            include: {
                committee: true
            },
            orderBy: {
                startTime: "asc"
            },
            take: 5
        }),

        prisma.task.findMany({
            where: {
                committee: {
                    clubId
                },
                isArchived: false
            },
            include: {
                assignedTo: {
                    include: {
                        membership: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                dueDate: "asc"
            },
            take: 10
        }),

        prisma.announcement.findMany({
            where: {
                clubId
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 5
        }),

        prisma.membership.count({
            where: {
                clubId,
                status: "APPROVED"
            }
        })
    ]);

    if (!club) {
        throw new Error("Club not found");
    }

    return {
        club,

        statistics: {
            totalMembers: members,

            upcomingEvents: events.length,

            upcomingMeetings: meetings.filter(
                meeting => meeting.startTime > new Date()
            ).length,

            pendingTasks: tasks.filter(
                task => task.status !== "COMPLETED"
            ).length,

            completedTasks: tasks.filter(
                task => task.status === "COMPLETED"
            ).length,

            announcements: announcements.length
        },

        upcomingEvents: events,

        upcomingMeetings: meetings,

        pendingTasks: tasks.filter(
            task => task.status !== "COMPLETED"
        ),

        announcements,

        overview: {
            nextEvent: events[0] || null,

            nextMeeting: meetings[0] || null,

            latestAnnouncement:
                announcements[0] || null
        }
    };
};

module.exports = {
    getClubDashboard
};