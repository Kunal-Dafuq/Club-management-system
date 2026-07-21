const { createNotification } = require("../services/notificationService");
const prisma = require("../config/prisma");

const { createActivity } = require("../services/activityService");
const auditLogger = require("../utils/auditLogger");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const joinClub = asyncHandler(async(req,res)=>{
    const clubId = Number(req.params.id);
    const userId = req.user.id;

    const existingMembership = await prisma.membership.findUnique({
        where:{
            userId_clubId:{
                userId,
                clubId
            }
        }
    });

    if(existingMembership){
        throw new ApiError(
            409,
            "You are already associated with this club."
        );
    }

    const membership = await prisma.$transaction(async (tx) => {
        return await tx.membership.create({
            data:{
                userId,
                clubId,
                status:"PENDING",
                clubRole:"MEMBER"
            }
        });
    });

    await createActivity({
        clubId,
        userId,
        action: "JOIN_REQUEST",
        description: `${req.user.name} requested to join the club.`
    });

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
        success: true,
        message: "Join request submitted successfully.",
        membership
    });
});

const leaveClub = asyncHandler(async(req,res)=>{

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
        throw new ApiError(
            404,
            "Membership not found."
        );
    }

    if (membership.clubRole === "PRESIDENT") {
        throw new ApiError(
            400,
            "Club president cannot leave the club."
        );
    }
    await prisma.$transaction(async(tx)=>{
        await tx.club.update({
            where:{
                id:clubId
            },
            data:{
                memberCount:{
                    decrement:1
                }
            }
        });

        await tx.membership.delete({
            where:{
                userId_clubId:{
                    userId,
                    clubId
                }
            }
        });
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
      success: true,
      message: "Left club successfully"
    });
});

const getClubMembers = asyncHandler(async (req, res) => {
    const clubId = Number(req.params.id);

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
        success: true,
        club: club.name,
        totalMembers: members.length,
        members
    });
});

const getMyClubs = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const memberships = await prisma.membership.findMany({
      where:{
        userId
      },
      include:{
            club:{
                select:{
                    id:true,
                    name:true,
                    slug:true,
                    logoUrl:true,
                    bannerUrl:true,
                    verified:true,
                    memberCount:true
                }
            }
        },
      orderBy:{
        joinedAt:"desc"
      }
    });

    res.json({
      totalClubs:memberships.length,
      clubs:memberships
    });
});

const approveMember = asyncHandler(async (req, res) => {
    const membershipId = Number(req.params.id);

    const membership = await prisma.membership.findUnique({
      where:{
          id:membershipId
      },

      include:{
            user:true,
            club:{
                select:{
                    id:true,
                    name:true,
                    slug:true,
                    logoUrl:true,
                    bannerUrl:true,
                    verified:true,
                    memberCount:true
                }
            }
        }
  });

    const updatedMembership=await prisma.$transaction(async(tx)=>{
        if (!membership) {
            throw new ApiError(
                404,
                "Membership not found."
            );
        }

        if (membership.status === "APPROVED") {
            throw new ApiError(
                400,
                "Member is already approved."
            );
        }

        const updated=await tx.membership.update({
            where:{
                id:membershipId
            },
            data:{
                status:"APPROVED"
            }
        });

        await tx.club.update({
            where:{
                id:membership.clubId
            },
            data:{
                memberCount:{
                    increment:1
                }
            }
        });
        return updated;
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
});

const rejectMember = asyncHandler(async(req,res)=>{
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
        success: false,
        message: "Membership not found"
      });
    }

    if(membership.status==="REJECTED"){
        throw new ApiError(
            400,
            "Membership already rejected."
        );
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
      success: true,
      message: "Member rejected"
    });
});

const getPendingRequests = asyncHandler(async(req,res)=>{
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

    res.json({
        success: true,
        total: requests.length,
        requests
    });
});

const promoteMember = asyncHandler(async (req, res) => {
    const membershipId = Number(req.params.id);

    const membership=await prisma.membership.findUnique({
        where:{
            id:membershipId
        }
    });

    if(!membership){
        throw new ApiError(
            404,
            "Membership not found."
        );
    }

    const { clubRole } = req.body;

    if (
      ![
        "MEMBER",
        "COORDINATOR",
        "LEAD",
        "PRESIDENT"
      ].includes(clubRole)
    ) {
      throw new ApiError(
        400,
        "Invalid club role."
      );
    }

    const updatedMembership = await prisma.membership.update({
      where: {
        id: membershipId
      },
      data: {
        clubRole
      }
    });

    await createActivity({
        clubId:updatedMembership.clubId,
        userId:updatedMembership.userId,
        action:"ROLE_CHANGED",
        description:`Promoted to ${updatedMembership.clubRole}.`
    });

    await auditLogger(req,{
        action:"ROLE_CHANGED",
        entityType:"Membership",
        entityId:updatedMembership.id,
        clubId:updatedMembership.clubId
    });

    res.json({
        success:true,
        membership:updatedMembership
    });
});

const getCommittee = asyncHandler(async(req,res)=>{
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

        res.json({
            success: true,
            total: committee.length,
            committee
        });
});

const getClubAnalytics = asyncHandler(async(req,res)=>{
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
            success: true,
            analytics: {
                approved,
                pending,
                rejected,
                leads
            }
        });
});

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