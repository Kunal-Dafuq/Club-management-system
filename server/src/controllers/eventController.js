const prisma = require("../config/prisma");
const { createNotification } = require("../services/notificationService");
const { eventSchema, updateEventSchema } = require("../validators/eventValidator");
const createEvent = async (req, res) => {
  try {
    const createdById = req.user.id;
    const validation = eventSchema.safeParse({
      ...req.body,
      clubId: Number(req.body.clubId)
    });

    console.log("========== REQUEST BODY ==========");
    console.log(req.body);

    console.log("========== VALIDATION ==========");
    console.log(validation);

    if (!validation.success) {
      console.log("========== VALIDATION FAILED ==========");
      console.log(
        JSON.stringify(
          validation.error.issues,
          null,
          2
        )
      );

      return res.status(400).json({
          message: validation.error.issues
      });
  }

    const {
      title,
      description,
      startTime,
      endTime,
      location,
      visibility,
      clubId
    } = validation.data;

    const club = await prisma.club.findUnique({
      where: { id: clubId }
    });

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    console.log("Searching club with ID:", clubId);

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        location,
        visibility,
        clubId,
        createdById
      }
    });

    await createActivity({
        clubId:event.clubId,
        userId:req.user.id,
        action:"EVENT_CREATED",
        description:`${event.title} was created.`
    });

    console.log("Club found:", club);

    const members = await prisma.membership.findMany({
      where: { clubId },
      select: { userId: true }
    });

    await Promise.all(
      members.map(member =>
        createNotification({
          userId: member.userId,
          message: `New event created: ${event.title}`
        })
      )
    );

    return res.status(201).json({
      message: "Event created",
      event
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const { clubId, visibility } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const events = await prisma.event.findMany({
      skip,
      take: limit,
      orderBy: {
        startTime: "desc"
      },
      where: {
        ...(clubId && { clubId: Number(clubId) }),
        ...(visibility && { visibility })
      },
      include: {
        club: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    const total = await prisma.event.count({
      where: {
        ...(clubId && { clubId: Number(clubId) }),
        ...(visibility && { visibility })
      }
    });

    res.json({
      page,
      limit,
      total,
      events
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        club: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json({
      event
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);
    const validation = updateEventSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.errors
      });
    }

    const data = validation.data;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "No fields provided"
      });
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (existingEvent.createdById !== req.user.id &&
      req.user.role !== "SUPER_ADMIN"
    ) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.startTime && { startTime: new Date(data.startTime) }),
        ...(data.endTime && { endTime: new Date(data.endTime) }),
        ...(data.location && { location: data.location }),
        ...(data.visibility && { visibility: data.visibility })
      }
    });

    return res.json({
      message: "Event updated",
      event: updatedEvent
    });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error"
      });
    }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (existingEvent.createdById !== req.user.id &&
      req.user.role !== "SUPER_ADMIN"
    ) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    await prisma.event.delete({
      where: { id: eventId }
    });

    await createActivity({
      clubId:event.clubId,
      userId:req.user.id,
      action:"EVENT_DELETED",
      description:`${event.title} was deleted.`
    });

    res.json({
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createEvent ,
  getEvents ,
  getEventById ,
  updateEvent ,
  deleteEvent
};