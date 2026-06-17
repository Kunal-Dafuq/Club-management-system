const prisma = require("../config/prisma");
const createRSVP = async (req,res)=>{
    try{
        const eventId = Number(req.params.id);
        const userId = req.user.id;
        const {status} = req.body;
        if(!status){
            return res.status(400).json({
                message:"Status required"
            });
        }
        const event = await prisma.event.findUnique({
            where:{
                id:eventId
            }
        });

        if(!event){
            return res.status(404).json({
                message:"Event not found"
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

    if(existing){
        return res.status(400).json({
            message:"RSVP already exists"
        });

    }

    const rsvp = await prisma.rSVP.create({
        data:{
            userId,
            eventId,
            status
        }
    });

    res.status(201).json(rsvp);
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getAttendees = async(req,res)=>{
    try{
        const eventId = Number(req.params.id);
        const attendees = await prisma.rSVP.findMany({
            where:{
                eventId
            },
            select:{
                id:true,
                status:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            }
        });

        res.status(200).json({
            count:attendees.length,
            attendees
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
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

module.exports = {
    createRSVP,
    getAttendees,
    updateRSVP,
    deleteRSVP
};