const { initializeEmail } = require("../services/emailService");

const initializeEmailService = async () => {
    try {
        await initializeEmail();

        console.log("✅ Email service initialized.");

    } catch (error) {
        console.error(
            "❌ Failed to initialize email service."
        );

        throw error;
    }
};

module.exports = initializeEmailService;