const prisma = require("../config/prisma");
const { createNotification } = require("../services/notificationService");
const { createActivity } = require("../services/activityService");
const sendAnnouncement = async (req, res) => {
  try {
    const { clubId, title, message } = req.body;
    const members = await prisma.membership.findMany({
      where: { clubId },
      select: { userId: true }
    });

    await createActivity({
      clubId,
      userId:req.user.id,
      action:"ANNOUNCEMENT",
      description:`Announcement "${title}" posted.`
    });

    await prisma.announcement.create({
      data: {
        title,
        content: message,
        clubId,
        createdById: req.user.id
      }
    });

    await Promise.all(
      members.map(member =>
        createNotification({
          userId: member.userId,
          message: `📢 Club Announcement: ${message}`
        })
      )
    );

    res.json({
      message: "Announcement sent"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { sendAnnouncement };