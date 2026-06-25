const prisma = require("../config/prisma");
const { createNotification } = require("../services/notificationService");
const sendAnnouncement = async (req, res) => {
  try {
    const { clubId, message } = req.body;
    const members = await prisma.membership.findMany({
      where: { clubId },
      select: { userId: true }
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