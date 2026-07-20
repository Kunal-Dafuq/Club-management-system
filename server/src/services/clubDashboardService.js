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
                archived: false
            },
            include: {
                assignee: {
                    include: {
                        user: true
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

    return {
        club: {
            id: club.id,
            name: club.name,
            slug: club.slug,
            logoUrl: club.logoUrl,
            bannerUrl: club.bannerUrl,
            tagline: club.tagline,
            motto: club.motto,
            description: club.description,
            category: club.category,
            established: club.established,
            verified: club.verified,
            isRecruiting: club.isRecruiting,
            socialLinks: {
                website: club.website,
                instagram: club.instagram,
                linkedin: club.linkedin,
                github: club.github,
                discord: club.discord
            }
        },

        statistics: {
            totalMembers,
            activeMembers,
            committees,
            coordinators,
            upcomingEvents,
            completedEvents,
            ongoingMeetings,
            pendingTasks,
            completedTasks,
            announcements,
            galleryImages
        },

        overview: {
            nextEvent,
            nextMeeting,
            latestAnnouncement,
            latestActivity,
            clubHealthScore
        },

        upcomingEvents,

        upcomingMeetings,

        announcements,

        pendingTasks,

        committees: {
            total,
            items: committeeList
        },

        members: {
            total: totalMembers,
            recent: recentMembers,
            coordinators: coordinatorList
        },

        activity: {
            recent: recentActivities,
            timeline
        },

        gallery: {
            recentImages,
            totalImages
        },

        recruitment: {
            isRecruiting: club.isRecruiting,
            pendingApplications,
            openPositions
        },

        achievements: {
            awards,
            certificates,
            milestones
        },

        resources: {
            sharedFiles,
            driveFolders,
            documents
        },

        integrations: {
            googleCalendarConnected,
            googleMeetEnabled
        }
    };
};

module.exports = {
    getClubDashboard
};