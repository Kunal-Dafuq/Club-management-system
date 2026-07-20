const os = require("os");

const prisma = require("../config/prisma");

const getSystemInfo = async () => {
    const [
        users,
        clubs,
        events,
        committees,
        tasks,
        meetings
    ] = await Promise.all([
        prisma.user.count(),
        prisma.club.count(),
        prisma.event.count(),
        prisma.committee.count(),
        prisma.task.count(),
        prisma.committeeMeeting.count()
    ]);

    return {
        server: {
            platform: os.platform(),
            architecture: os.arch(),
            hostname: os.hostname(),
            cpus: os.cpus().length,
            uptime: process.uptime(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            nodeVersion: process.version,
            environment: process.env.NODE_ENV
        },

        database: {
            users,
            clubs,
            events,
            committees,
            tasks,
            meetings
        }
    };
};

module.exports = {
    getSystemInfo
};