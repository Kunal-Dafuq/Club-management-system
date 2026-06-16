const prisma = require("../config/prisma");
const createClub = async (req,res)=>{
  try{
    const {
      name,
      description,
      bannerImage
    } = req.body;

    if(!name || !description){
      return res.status(400).json({
        message:"Name and description are required"
      });
    }

    const existingClub = await prisma.club.findUnique({
      where:{
        name
      }
    });

    if(existingClub){
      return res.status(400).json({
        message:"Club already exists"
      });
    }

    const club = await prisma.club.create({
      data:{
        name,
        description,
        bannerImage
      }
    });


    res.status(201).json({
      message:"Club created",
      club
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getClubs = async (req,res)=>{
  try{
    const clubs = await prisma.club.findMany({
      orderBy:{
        createdAt:"desc"
      }
    });
    res.json(clubs);
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getClubById = async (req,res)=>{
  try{
    const { id } = req.params;
    const club = await prisma.club.findUnique({
      where:{
        id:Number(id)
      }
    });

    if(!club){
      return res.status(404).json({
        message:"Club not found"
      });
    }
    res.json(club);
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const updateClub = async (req,res)=>{
  try{
    const { id } = req.params;
    const {
      name,
      description,
      bannerImage
    } = req.body;

    const existingClub = await prisma.club.findUnique({
      where:{
        id:Number(id)
      }
    });

    if(!existingClub){
      return res.status(404).json({
        message:"Club not found"
      });
    }

    const updatedClub = await prisma.club.update({
      where:{
        id:Number(id)
      },
      data:{
        name,
        description,
        bannerImage
      }
    });

    res.json({
      message:"Club updated",
      club:updatedClub
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const deleteClub = async (req,res)=>{
  try{
    const { id } = req.params;
    const existingClub = await prisma.club.findUnique({
      where:{
        id:Number(id)
      }
    });

    if(!existingClub){
      return res.status(404).json({
        message:"Club not found"
      });
    }

    await prisma.club.delete({
      where:{
        id:Number(id)
      }
    });

    res.json({
      message:"Club deleted successfully"
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
  createClub ,
  getClubs ,
  getClubById ,
  updateClub ,
  deleteClub
};