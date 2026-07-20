const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const generateClubReport = async (clubId) => {
    const club = await prisma.club.findUnique({
        where: {
            id: clubId
        },
        include: {
            committees: true
        }
    });

    if (!club) {
        throw new ApiError(
            404,
            "Club not found."
        );
    }

    const [
        members,
        pendingMembers,
        events,
        announcements,
        committees,
        meetings,
        tasks,
        completedTasks
    ] = await Promise.all([
        prisma.membership.count({
            where: {
                clubId,
                status: "APPROVED"
            }
        }),
        prisma.membership.count({
            where: {
                clubId,
                status: "PENDING"
            }
        }),
        prisma.event.count({
            where: {
                clubId,
                deletedAt: null
            }
        }),
        prisma.announcement.count({
            where: {
                clubId
            }
        }),
        prisma.committee.count({
            where: {
                clubId
            }
        }),
        prisma.committeeMeeting.count({
            where: {
                committee: {
                    clubId
                }
            }
        }),
        prisma.task.count({
            where: {
                committee: {
                    clubId
                }
            }
        }),
        prisma.task.count({
            where: {
                committee: {
                    clubId
                },
                status: "DONE"
            }
        })
    ]);

    return {
        club,
        statistics: {
            members,
            pendingMembers,
            committees,
            meetings,
            announcements,
            events,
            tasks,
            completedTasks,
            completionRate:
                tasks === 0
                    ? 0
                    : Number(
                        (
                            completedTasks /
                            tasks
                        ) * 100
                    ).toFixed(2)
        }
    };
};

const generateEventReport = async (eventId) => {
    const event = await prisma.event.findUnique({
        where: {
            id: eventId
        },
        include: {
            club: true,
            rsvps: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    if (!event) {
        throw new ApiError(
            404,
            "Event not found."
        );
    }

    return {
        id: event.id,
        title: event.title,
        club: event.club.name,
        totalRSVP: event.rsvps.length,
        attending:
            event.rsvps.filter(
                r => r.status === "GOING"
            ).length,

        declined:
            event.rsvps.filter(
                r => r.status === "DECLINED"
            ).length,

        maybe:
            event.rsvps.filter(
                r => r.status === "MAYBE"
            ).length
    };
};

const generateCommitteeReport = async (committeeId) => {
    const committee =
        await prisma.committee.findUnique({
            where: {
                id: committeeId
            },

            include: {
                members: true,
                tasks: true,
                meetings: true
            }
        });

    if (!committee) {
        throw new ApiError(
            404,
            "Committee not found."
        );
    }

    return {
        committee: committee.name,
        members:
            committee.members.length,
        meetings:
            committee.meetings.length,
        tasks:
            committee.tasks.length,
        completedTasks:
            committee.tasks.filter(
                t => t.status === "DONE"
            ).length
    };
};

module.exports = {
    generateClubReport,
    generateEventReport,
    generateCommitteeReport
};