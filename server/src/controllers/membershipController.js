const { createNotification } = require("../services/notificationService");
const prisma = require("../config/prisma");

const { createActivity } = require("../services/activityService");
const auditLogger = require("../utils/auditLogger");

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
      data: {
        userId,
        clubId,
        status: "PENDING",
        clubRole: "MEMBER"
      }
    });

    await createActivity({
        clubId,
        userId,
        action: "JOIN_REQUEST",
        description: `${req.user.name} requested to join the club.`
    });

    const coordinators = await prisma.membership.findMany({
      where: {
        clubId,
        status: "APPROVED",
        clubRole: {
          in: ["PRESIDENT", "LEAD"]
        }
      },
      select: {
        userId: true
      }
    });

    await Promise.all(
      coordinators.map((coordinator) =>
        createNotification({
          userId: coordinator.userId,
          message: `${req.user.name} has requested to join ${club.name}.`
        })
      )
    );

    res.status(201).json({
      message:"Join request submitted successfully",
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

    await prisma.club.update({
      where: {
          id: clubId
      },

      data: {
        memberCount: {
          decrement: 1
        }
      }
    });

    await prisma.membership.delete({
      where:{
        userId_clubId:{
          userId,
          clubId
        }
      }
    });

    await createActivity({
      clubId,
      userId,
      action:"LEFT_CLUB",
      description:`${req.user.name} left the club.`
    });

    

    await auditLogger(req,{
      action:"LEFT_CLUB",
      entityType:"Membership",
      entityId:membership.id,
      clubId
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
      where: {
        clubId,
        status: "APPROVED"
      },
      orderBy:[
      {
        clubRole:"asc"
      },
      {
        joinedAt:"desc"
      }],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
            role: true
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
      },
      orderBy:{
        joinedAt:"desc"
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

const approveMember = async (req, res) => {
  try {
    const membershipId = Number(req.params.id);
    const membership = await prisma.membership.findUnique({
      where: {
        id: membershipId
      },
      include: {
        user: true,
        club: true
      }
    });

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found"
      });
    }

    if(membership.status==="APPROVED"){
      return res.status(400).json({
        message:"Already approved"
      });
    }

    await prisma.membership.update({
      where: {
        id: membershipId
      },
      data: {
        status: "APPROVED"
      }
    });

    await prisma.club.update({
      where: {
        id: membership.clubId
      },

      data: {
        memberCount: {
          increment: 1
        }
      }
    });

    await createActivity({
        clubId: membership.clubId,
        userId: membership.userId,
        action: "APPROVED",
        description: `${membership.user.name} became a member.`
    });

    await createNotification({
      userId: membership.userId,
      message: `Your request to join ${membership.club.name} has been approved.`
    });

    await createNotification({
      userId: membership.userId,
    });

    await auditLogger(req,{
      action:"MEMBER_APPROVED",
      entityType:"Membership",
      entityId:membership.id,
      description:"Membership approved",
      clubId:membership.clubId
    });

    return res.status(200).json({
      message:"Member approved successfully",
      membership:updatedMembership
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
       message: "Server error"
    });
  }
};

const rejectMember = async (req, res) => {
    try {
    const membershipId = Number(req.params.id);
    const membership = await prisma.membership.findUnique({
      where: {
        id: membershipId
      },
      include:{
        club:true,
        user:true
      }
    });

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found"
      });
    }

    if(membership.status==="REJECTED"){
      return res.status(400).json({
        message:"Already rejected"
      });
    }

    await prisma.membership.update({
      where: {
        id: membershipId
      },
      data: {
        status: "REJECTED"
      }
    });

    await createActivity({
        clubId: membership.clubId,
        userId: membership.userId,
        action:"REJECTED",
        description:`${membership.user.name}'s request was rejected.`
    });

    await createNotification({
      userId: membership.userId,
      message: `Your request to join ${membership.club.name} was rejected.`
    });

    await auditLogger(req,{
      action:"MEMBER_REJECTED",
      entityType:"Membership",
      entityId:membership.id,
      description:"Membership rejected",
      clubId:membership.clubId
    });

    res.json({
      message: "Member rejected"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const clubId = Number(req.params.id);
    const requests = await prisma.membership.findMany({
      where: {
        clubId,
        status: "PENDING"
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true
          }
        }
      }
    });

    res.json(requests);

  }

  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const promoteMember = async (req, res) => {
  try {
    const membershipId = Number(req.params.id);

    if(membership.status!=="APPROVED"){
      throw new Error("Only approved members can be promoted");
    }

    const { clubRole } = req.body;
    const membership = await prisma.membership.findUnique({
      where: {
        id: membershipId
      }
    });

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found"
      });
    }

    const updatedMembership = await prisma.membership.update({
      where:{
          id:updatedMembershipId
      },
      data:{
        status:"APPROVED"
      }
    });

    await createActivity({
        clubId: updated.clubId,
        userId: updated.userId,
        action:"PROMOTED",
        description:`Member promoted to ${updated.clubRole}.`
    });

    await auditLogger(req,{
      action:"ROLE_CHANGED",
      entityType:"Membership",
      entityId:updatedMembership.id,
      description:`Role changed to ${updated.clubRole}`,
      clubId:updatedMembership.clubId
    });

    res.json(updated);

  }

  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getCommittee = async (req, res) => {
    try {
        const clubId = Number(req.params.id);
        const committee = await prisma.membership.findMany({
            where: {
                clubId,
                status: "APPROVED",
                clubRole: {
                    not: "MEMBER"
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        department: true,
                        email: true
                    }
                }
            },
            orderBy: {
                clubRole: "asc"
            }
        });
        res.json(committee);
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getClubAnalytics = async (req, res) => {
    try {
        const clubId = Number(req.params.id);
        const approved =
            await prisma.membership.count({
                where:{
                    clubId,
                    status:"APPROVED"
                }
            });

        const pending =
            await prisma.membership.count({
                where:{
                    clubId,
                    status:"PENDING"
                }
            });

        const rejected =
            await prisma.membership.count({
                where:{
                    clubId,
                    status:"REJECTED"
                }
            });

        const leads =
            await prisma.membership.count({
                where:{
                    clubId,
                    clubRole:{
                        in:[
                            "LEAD",
                            "PRESIDENT"
                        ]
                    }
                }
            });

        res.json({
            approved,
            pending,
            rejected,
            leads
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
  joinClub,
  leaveClub,
  getClubMembers,
  getMyClubs,
  approveMember,
  rejectMember,
  getPendingRequests,
  promoteMember,
  getCommittee,
  getClubAnalytics
};