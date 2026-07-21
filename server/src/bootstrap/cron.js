const {startCronJobs} = require("../../jobs/cron");

const initializeCron = () => {
    try {
        startCronJobs();

        console.log("✅ Cron scheduler started.");

    } catch (error) {

        console.error(
            "❌ Failed to start cron scheduler."
        );

        throw error;
    }
};

module.exports = initializeCron;