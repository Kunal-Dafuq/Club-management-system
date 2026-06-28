const prisma = require("../config/prisma");

const getClubActivities = async (req, res) => {
  try {
    const clubId = Number(req.params.id);
    const activities = await prisma.activity.findMany({
      where: {
        clubId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 30
    });

    res.json(activities);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

module.exports = {
  getClubActivities
};
