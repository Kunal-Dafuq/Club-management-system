const prisma = require("../config/prisma");
const fs = require("fs/promises");
const path = require("path");

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const cleanupSoftDeleted = async () => {
    const limit = new Date(Date.now() - THIRTY_DAYS);

    await prisma.task.deleteMany({ where: { deletedAt: { lt: limit } } });
    await prisma.committee.deleteMany({ where: { deletedAt: { lt: limit } } });
    await prisma.committeeMeeting.deleteMany({ where: { deletedAt: { lt: limit } } });
    await prisma.event.deleteMany({ where: { deletedAt: { lt: limit } } });
    await prisma.notification.deleteMany({ where: { deletedAt: { lt: limit } } });
};

const cleanupTempFiles = async () => {
    const tempDirectories = [
        path.join(process.cwd(), "uploads", "transcripts"),
        path.join(process.cwd(), "uploads", "temp")
    ];
    
    const limit = Date.now() - TWENTY_FOUR_HOURS;

    for (const dir of tempDirectories) {
        try {
            const files = await fs.readdir(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stats = await fs.stat(filePath);
                
                if (stats.mtimeMs < limit) {
                    await fs.unlink(filePath).catch(() => {});
                }
            }
        } catch (error) {
            if (error.code !== "ENOENT") {
                console.error(`Failed to clean temp directory ${dir}:`, error.message);
            }
        }
    }
};

module.exports = {
    cleanupSoftDeleted,
    cleanupTempFiles
};