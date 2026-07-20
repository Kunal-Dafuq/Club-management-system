const nodemailer = require("nodemailer");

let transporter = null;

const initializeEmail = async () => {
    if (transporter) {
        return transporter;
    }

    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        await transporter.verify();
        console.log("📧 Email service connected.");
    } catch (err) {
        console.error(
            "❌ Email service failed:",
            err.message
        );
    }

    return transporter;
};

const sendEmail = async ({
    to,
    subject,
    html,
    text
}) => {
    const mailer = await initializeEmail();

    if (!to) {
        throw new Error("Recipient email is required.");
    }

    return mailer.sendMail({
        from: `"ClubPlanet" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html
    });
};

const sendBulkEmail = async ({
    recipients,
    subject,
    html
}) => {
    if (!recipients?.length) {
        return;
    }

    return Promise.all(
        recipients.map(email =>
            sendEmail({
                to: email,
                subject,
                html
            })
        )
    );
};

module.exports = {
    initializeEmail,
    sendEmail,
    sendBulkEmail
};