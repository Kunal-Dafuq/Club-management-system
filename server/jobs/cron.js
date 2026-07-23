const cron = require("node-cron");

const {sendUpcomingMeetingReminders,sendEventReminders} = require("../src/services/reminderService");
const {cleanupSoftDeleted,cleanupTempFiles} = require("../src/services/cleanupService");

const REMINDER_CRON = process.env.REMINDER_CRON || "*/30 * * * *"; // Every 30 mins
const CLEANUP_CRON = process.env.CLEANUP_CRON || "0 2 * * *";     // 2:00 AM daily

let isReminderRunning = false;
let isCleanupRunning = false;

let reminderTask = null;
let cleanupTask = null;

const runReminderJobs = async () => {
    if (isReminderRunning) {
        console.warn("[CRON] Previous reminder job is still running. Skipping...");
        return;
    }

    isReminderRunning = true;
    const startedAt = Date.now();

    try {
        console.log(`[CRON] Reminder job started at ${new Date().toISOString()}`);

        const results = await Promise.allSettled([
            sendUpcomingMeetingReminders(),
            sendEventReminders()
        ]);

        results.forEach((result, index) => {
            if (result.status === "rejected") {
                console.error(`[CRON] Reminder task ${index + 1} failed:`, result.reason);
            }
        });

        console.log(`[CRON] Reminder job completed in ${Date.now() - startedAt} ms`);
    } catch (error) {
        console.error("[CRON] Critical failure in reminder job:", error);
    } finally {
        isReminderRunning = false;
    }
};

const runCleanupJobs = async () => {
    if (isCleanupRunning) {
        console.warn("[CRON] Previous cleanup job is still running. Skipping...");
        return;
    }

    isCleanupRunning = true;
    const startedAt = Date.now();

    try {
        console.log(`[CRON] Cleanup job started at ${new Date().toISOString()}`);

        const results = await Promise.allSettled([
            cleanupSoftDeleted(),
            cleanupTempFiles()
        ]);

        results.forEach((result, index) => {
            if (result.status === "rejected") {
                console.error(`[CRON] Cleanup task ${index + 1} failed:`, result.reason);
            }
        });

        console.log(`[CRON] Cleanup job completed in ${Date.now() - startedAt} ms`);
    } catch (error) {
        console.error("[CRON] Critical failure in cleanup job:", error);
    } finally {
        isCleanupRunning = false;
    }
};

const startCronJobs = () => {
    if (process.env.NODE_ENV === "test") {
        console.log("[CRON] Scheduler disabled in test environment.");
        return;
    }

    if (!cron.validate(REMINDER_CRON) || !cron.validate(CLEANUP_CRON)) {
        throw new Error("Invalid cron expression detected in configuration.");
    }

    const timezone = process.env.TZ || "Asia/Kolkata";

    reminderTask = cron.schedule(REMINDER_CRON, runReminderJobs, {
        scheduled: true,
        timezone
    });
    console.log(`[CRON] Reminder scheduler started (${REMINDER_CRON})`);

    cleanupTask = cron.schedule(CLEANUP_CRON, runCleanupJobs, {
        scheduled: true,
        timezone
    });
    console.log(`[CRON] Cleanup scheduler started (${CLEANUP_CRON})`);
};

const stopCronJobs = () => {
    if (reminderTask) {
        reminderTask.stop();
        console.log("[CRON] Reminder scheduler stopped.");
    }
    if (cleanupTask) {
        cleanupTask.stop();
        console.log("[CRON] Cleanup scheduler stopped.");
    }
};

module.exports = {
    startCronJobs,
    stopCronJobs
};