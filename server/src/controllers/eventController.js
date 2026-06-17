const prisma = require("../config/prisma");
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      location,
      visibility,
      clubId
    } = req.body;

    const createdById = req.user.id;

    const club = await prisma.club.findUnique({
      where: {
        id: Number(clubId)
      }
    });

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        visibility,
        clubId: Number(clubId),
        createdById
      }
    });

    res.status(201).json({
      message: "Event created",
      event
    });
  }
  
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getEvents = async(req,res)=>{
  try{
    const events = await prisma.event.findMany({
        include:{
            club:true,
            creator:{
                select:{
                id:true,
                name:true,
                email:true
                }
            }
        }
    });
    
    res.json(events);
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getEventById = async(req,res)=>{
  try{
    const eventId = Number(req.params.id);
    const event = await prisma.event.findUnique({
      where:{
        id:eventId
      },
      include:{
        club:true,
        creator:{
          select:{
            id:true,
            name:true,
            email:true
          }
        }
      }
    });

    if(!event){
      return res.status(404).json({
        message:"Event not found"
      });
    }

    res.json(event);
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const updateEvent = async(req,res)=>{
  try{
    const eventId = Number(req.params.id);
    const {
      title,
      description,
      startTime,
      endTime,
      location,
      visibility
    } = req.body;

    const existingEvent = await prisma.event.findUnique({
      where:{
        id:eventId
      }
    });

    if(!existingEvent){
      return res.status(404).json({
        message:"Event not found"
      });
    }

    const updatedEvent = await prisma.event.update({
      where:{
        id:eventId
      },
      data:{
        title,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location,
        visibility
      }
    });

    res.json({
      message:"Event updated",
      event:updatedEvent
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const deleteEvent = async(req,res)=>{
  try{
    const eventId = Number(req.params.id);
    const existingEvent = await prisma.event.findUnique({
      where:{
        id:eventId
      }
    });

    if(!existingEvent){
      return res.status(404).json({
        message:"Event not found"
      });
    }

    await prisma.event.delete({
      where:{
        id:eventId
      }
    });

    res.json({
      message:"Event deleted successfully"
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
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