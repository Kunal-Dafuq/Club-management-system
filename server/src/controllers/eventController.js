const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const { createNotification } = require("../services/notificationService");
const { createActivity } = require("../services/activityService");

const {eventSchema,updateEventSchema} = require("../validators/eventValidator");

const createEvent = asyncHandler(async(req,res)=>{
  const club = await prisma.club.findUnique({
      where: {
          id: clubId
      }
  });

  if (!club) {
      throw new ApiError(
          404,
          "Club not found."
      );
  }

  const result = await prisma.$transaction(async(tx)=>{
      const event = await tx.event.create({
          data:{
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

      if (req.body.createGoogleMeet === true) {
          const {createMeet} = require("../services/googleMeetService");

          await createMeet(
              result.id,
              req.user.id
          );
      }

      await tx.club.update({
          where:{
              id:clubId
          },
          data:{
              eventCount:{
                  increment:1
              }
          }
      });

      return event ;
  });

  await createActivity({
    clubId,
    userId:req.user.id,
    action:"EVENT_CREATED",
    description:`${result.title} was created.`
  });

  await auditLogger(req,{
    action:"EVENT_CREATED",
    entityType:"Event",
    entityId:result.id,
    clubId
  });

  res.status(201).json({
    success:true,
    message:"Event created successfully.",
    event:result
  });
});

const getEvents = asyncHandler(async(req,res)=>{
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
});

const getEventById = asyncHandler(async(req,res)=>{
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
      throw new ApiError(
        404,
        "Event not found"
      );
    }

    res.json({
      event
    });
});

const updateEvent = asyncHandler(async (req,res)=>{
    const eventId = Number(req.params.id);
    const validation = updateEventSchema.safeParse(req.body);

    if (!validation.success) {
      throw new ApiError(
        400,
        "validation.error.errors"
      );
    }

    const data = validation.data;

    if (!data || Object.keys(data).length === 0) {
      throw new ApiError(
        400,
        "No fields provided"
      );
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!existingEvent) {
      throw new ApiError(
        404,
        "Event not found"
      );
    }

    if (existingEvent.createdById !== req.user.id &&
      req.user.role !== "SUPER_ADMIN"
    ) {
      throw new ApiError(
        403,
        "Not allowed"
      );
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

    await createActivity({
        clubId:updatedEvent.clubId,
        userId:req.user.id,
        action:"EVENT_UPDATED",
        description:`${updatedEvent.title} updated.`
    });

    await auditLogger(req,{
        action:"EVENT_UPDATED",
        entityType:"Event",
        entityId:updatedEvent.id,
        clubId:updatedEvent.clubId
    });

    req.io
    ?.to(`club-${updatedEvent.clubId}`)
    .emit("event-updated",updatedEvent);

    res.json({
        success:true,
        message:"Event updated.",
        event:updatedEvent
    });
});

const deleteEvent = asyncHandler(async(req,res)=>{
    const eventId=Number(req.params.id);

    const event=await prisma.event.findUnique({
        where:{
            id:eventId
        }
    });

    if(!event){
        throw new ApiError(
            404,
            "Event not found."
        );
    }

    await prisma.$transaction(async(tx)=>{
        await tx.event.update({
            where:{
                id:eventId
            },
            data:{
                deletedAt:new Date()
            }
        });

        await tx.club.update({
            where:{
                id:event.clubId
            },
            data:{
                eventCount:{
                    decrement:1
                }
            }
        });
    });

    await createActivity({
        clubId:event.clubId,
        userId:req.user.id,
        action:"EVENT_DELETED",
        description:`${event.title} deleted.`
    });

    await auditLogger(req,{
        action:"EVENT_DELETED",
        entityType:"Event",
        entityId:event.id,
        clubId:event.clubId
    });

    req.io
    ?.to(`club-${event.clubId}`)
    .emit("event-deleted",event.id);

    res.json({
        success:true,
        message:"Event deleted."
    });
});

module.exports = {
  createEvent ,
  getEvents ,
  getEventById ,
  updateEvent ,
  deleteEvent
};