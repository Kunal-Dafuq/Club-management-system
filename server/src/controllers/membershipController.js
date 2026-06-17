const prisma = require("../config/prisma");
const joinClub = async(req,res)=>{
  try{
    const clubId = Number(req.params.id);
    const userId = req.user.id;
    const club = await prisma.club.findUnique({
      where:{
        id:clubId
      }
    });

    if(!club){
      return res.status(404).json({
        message:"Club not found"
      });
    }

    const existingMembership = await prisma.membership.findUnique({
      where:{
        userId_clubId:{
          userId,
          clubId
        }
      }
    });

    if(existingMembership){
      return res.status(400).json({
        message:"Already joined"
      });
    }

    const membership = await prisma.membership.create({
      data:{
        userId,
        clubId
      }
    });

    res.status(201).json({
      message:"Joined club successfully",
      membership
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const leaveClub = async(req,res)=>{
  try{
    const clubId = Number(req.params.id);
    const userId = req.user.id;
    const membership = await prisma.membership.findUnique({
      where:{
        userId_clubId:{
          userId,
          clubId
        }
      }
    });

    if(!membership){
      return res.status(404).json({
        message:"You are not a member of this club"
      });
    }

    await prisma.membership.delete({
      where:{
        userId_clubId:{
          userId,
          clubId
        }
      }
    });

    res.json({
      message:"Left club successfully"
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getClubMembers = async(req,res)=>{
  try{
    const clubId = Number(req.params.id);
    const club = await prisma.club.findUnique({
      where:{
        id:clubId
      }
    });

    if(!club){
      return res.status(404).json({
        message:"Club not found"
      });
    }

    const members = await prisma.membership.findMany({
      where:{
        clubId
      },
      include:{
        user:{
          select:{
            id:true,
            name:true,
            email:true,
            department:true,
            role:true
          }
        }
      }
    });

    res.json({
      club:club.name,
      totalMembers:members.length,
      members
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getMyClubs = async(req,res)=>{
  try{
    const userId = req.user.id;
    const memberships = await prisma.membership.findMany({
      where:{
        userId
      },
      include:{
        club:true
      }
    });

    res.json({
      totalClubs:memberships.length,
      clubs:memberships
    });
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

module.exports={
    joinClub ,
    leaveClub ,
    getClubMembers ,
    getMyClubs
};