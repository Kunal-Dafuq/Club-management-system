const prisma = require("../config/prisma");
const { createNotification } = require("./notificationService");
const { sendEmail } = require("./emailService");

const sendEventReminders = async () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const events = await prisma.event.findMany({
        where: {
            deletedAt: null,
            startTime: {
                gte: now,
                lte: tomorrow
            }
        },
        include: {
            club: {
                include: {
                    memberships: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });

    for (const event of events) {
        for (const member of event.club.memberships) {
            try {
                await createNotification({
                    userId: member.user.id,
                    message: `Reminder: ${event.title} starts tomorrow.`
                });

                await sendEmail({
                    to: member.user.email,
                    subject: event.title,
                    html: `<h3>${event.title}</h3><p>Starts tomorrow.</p>`
                });
            } catch (err) {
                console.error(`[Reminder] Failed to send reminder to user ${member.user.id}:`, err.message);
            }
        }
    }
};

const sendUpcomingMeetingReminders = async () => {
    const now = new Date();
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);

    const meetings = await prisma.committeeMeeting.findMany({
        where: {
            deletedAt: null,
            startTime: {
                gte: now,
                lte: thirtyMinutesFromNow
            }
        },
        include: {
            committee: {
                include: {
                    club: {
                        include: {
                            memberships: {
                                include: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    for (const meeting of meetings) {
        for (const member of meeting.committee.club.memberships) {
            try {
                await createNotification({
                    userId: member.user.id,
                    message: `Reminder: Meeting "${meeting.title}" starts in 30 minutes.`
                });
            } catch (err) {
                console.error(`[Meeting Reminder] Failed for user ${member.user.id}:`, err.message);
            }
        }
    }
};

module.exports = {
    sendEventReminders,
    sendUpcomingMeetingReminders
};