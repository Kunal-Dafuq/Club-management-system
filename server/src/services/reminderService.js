const prisma = require("../config/prisma");

const { createNotification } = require("./notificationService");

const { sendEmail } = require("./emailService");

const sendEventReminders = async () => {
    const now = new Date();

    const tomorrow = new Date(
        now.getTime() + 24 * 60 * 60 * 1000
    );

    const events = await prisma.event.findMany({
        where:{
            deletedAt:null,
            startTime:{
                gte:now,
                lte:tomorrow
            }
        },

        include:{
            club:{
                include:{
                    memberships:{
                        include:{
                            user:true
                        }
                    }
                }
            }
        }
    });

    for(const event of events){
        for(const member of event.club.memberships){
            await createNotification({
                userId:member.user.id,
                message:`Reminder: ${event.title} starts tomorrow.`
            });

            await sendEmail({
                to:member.user.email,
                subject:event.title,
                html:`<h3>${event.title}</h3><p>Starts tomorrow.</p>`
            });
        }
    }
};

module.exports={
    sendEventReminders
};