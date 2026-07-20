const cron = require("node-cron");

const {
    sendUpcomingMeetingReminders,
    sendEventReminders
} = require("../services/reminderService");

cron.schedule(
    "*/30 * * * *",
    async()=>{
        await sendUpcomingMeetingReminders();
        await sendEventReminders();
    }
);