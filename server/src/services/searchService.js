const prisma = require("../config/prisma");

const globalSearch = async (keyword) => {
    const search = keyword.trim();

    const [
        clubs,
        events,
        users
    ] = await Promise.all([

        prisma.club.findMany({
            where: {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            orderBy: {
                name: "asc"
            }
        }),

        prisma.event.findMany({
            where: {
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            include: {
                club: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                startTime: "asc"
            }
        }),

        prisma.user.findMany({
            where: {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true
            },
            orderBy: {
                name: "asc"
            }
        })
    ]);

    return {
        clubs,
        events,
        users
    };
};

const clubSearch = async (clubId, keyword) => {
    const search = keyword.trim();

    const [
        events,
        tasks,
        committees,
        members
    ] = await Promise.all([

        prisma.event.findMany({
            where: {
                clubId,
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        }),

        prisma.task.findMany({
            where: {
                committee: {
                    clubId
                },
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        }),

        prisma.committee.findMany({
            where: {
                clubId,
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        }),

        prisma.membership.findMany({
            where: {
                clubId,
                user: {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            },
            include: {
                user: true
            }
        })
    ]);

    return {
        events,
        tasks,
        committees,
        members
    };
};

module.exports = {
    globalSearch,
    clubSearch
};