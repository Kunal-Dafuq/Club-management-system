const prisma = require("../config/prisma");
const { createNotification } = require("../services/notificationService");
const { createActivity } = require("../services/activityService");
const createRSVP = async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const userId = req.user.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status required"
            });
        }

        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        const existing = await prisma.rSVP.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
        });

        if (existing) {
            return res.status(400).json({
                message: "RSVP already exists"
            });
        }

        const rsvp = await prisma.rSVP.create({
            data: {
                userId,
                eventId,
                status
            }
        });

        await createActivity({
            clubId:event.clubId,
            userId:req.user.id,
            action:"RSVP",
            description:`RSVP'd ${status} for ${event.title}.`
        });

        await createNotification({
            userId: event.createdById,
            message: `Someone responded to your event: ${event.title}`
        });

        return res.status(201).json(rsvp);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateRSVP = async(req,res)=>{
    try{
        const eventId = Number(req.params.id);
        const userId = req.user.id;
        const {status} = req.body;
        if(!status){
            return res.status(400).json({
                message:"Status required"
            });
        }

        const existing = await prisma.rSVP.findUnique({
            where:{
                userId_eventId:{
                    userId,
                    eventId
                }
            }
        });

        if(!existing){
            return res.status(404).json({
                message:"RSVP not found"
            });
        }

        const updated = await prisma.rSVP.update({
            where:{
                userId_eventId:{
                    userId,
                    eventId
                }
            },
            data:{
                status
            }
        });

        res.status(200).json(updated);
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const deleteRSVP = async(req,res)=>{
    try{
        const eventId = Number(req.params.id);
        const userId = req.user.id;
        const existing = await prisma.rSVP.findUnique({
            where:{
                userId_eventId:{
                    userId,
                    eventId
                }
            }
        });
        if(!existing){
            return res.status(404).json({
                message:"RSVP not found"
            });
        }

        await prisma.rSVP.delete({
            where:{
                userId_eventId:{
                    userId,
                    eventId
                }
            },
            data:{
                deletedAt:new Date()
            }
        });

        res.status(200).json({
            message:"RSVP removed"
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getAttendees = async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const attendees = await prisma.rSVP.findMany({
            where: { eventId },
            select: {
                id: true,
                status: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return res.status(200).json({
            count: attendees.length,
            attendees
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createRSVP,
    getAttendees,
    updateRSVP,
    deleteRSVP
};