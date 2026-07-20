const prisma = require("../config/prisma");
const { generateSlug } = require("../services/clubService");
const auditLogger = require("../utils/auditLogger");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const createClub = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        about,
        tagline,
        motto,
        location,
        foundedBy,
        category
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
      throw new ApiError(
        401,
        "Club already exists"
      );
    }

    const slug = await generateSlug(name);

    const duplicateSlug = await prisma.club.findUnique({
        where: {
            slug
        }
    });

    if (duplicateSlug) {
        throw new ApiError(
            409,
            "Club slug already exists."
        );
    }

    const club = await prisma.club.create({
        data: {
            name,
            slug,
            description,
            about,
            tagline,
            motto,
            location,
            foundedBy,
            category
        }
    });

    await auditLogger(req, {
      action: "CLUB_CREATED",
      entityType: "Club",
      entityId: club.id,
      description: `Club "${club.name}" created`,
      clubId: club.id
  });

    res.status(201).json({
      club
    });
});

const getClubs = asyncHandler(async (req, res) => {

    const clubs = await prisma.club.findMany({

      orderBy: {
        createdAt: "desc"
      },

      include: {

        memberships: {

          where: {
            status: "APPROVED"
          },

          include: {

            user: {
              select: {
                id: true,
                name: true,
                department: true,
                role: true
              }
            }

          }

        },

        events: {

          orderBy: {
            startTime: "asc"
          }

        }

      }

    });

    res.json(clubs);
});

const getClubById = asyncHandler(async (req, res) => {
    const clubId = Number(req.params.id);
    const club = await prisma.club.findUnique({

      where: {
        id: clubId
      },

      include: {
        memberships:{
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
          },

          orderBy:{
              joinedAt:"desc"
          }
        },

        activities:{
            take:10,

            orderBy:{
                createdAt:"desc"
            },

            include:{
                user:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        },

        announcements:{
            take:5,

            orderBy:{
                createdAt:"desc"
            },

            include:{
                creator:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        },

        events: {
          orderBy: {
            startTime: "asc"
          }
        }
      }
    });

    if (!club) {
      return res.status(404).json({
        message: "Club not found"
      });
    }

    res.json({

      ...club,

      stats: {

        totalMembers: club.memberships.filter(
          m => m.status === "APPROVED"
        ).length,

        pendingRequests: club.memberships.filter(
          m => m.status === "PENDING"
        ).length,

        totalEvents: club.events.length,

        upcomingEvents: club.events.filter(
          event => new Date(event.startTime) > new Date()
        ).length
      }
    });
});

const getClubBySlug = asyncHandler(async (req, res) => {
        const club = await prisma.club.findUnique({
            where: {
                slug: req.params.slug
            },

            include: {
                memberships: true,
                announcements: true,
                activities: true,
                events: true
            }
        });

        if (!club) {
            return res.status(404).json({

                message: "Club not found"

            });
        }
        res.json(club);
});

const updateClub = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        name,
        description,
        about,
        tagline,
        motto,
        location,
        foundedBy,
        category
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
          about,
          tagline,
          motto,
          location,
          foundedBy,
          category
      }
    });

    res.json({
      message:"Club updated",
      club:updatedClub
    });
});

const deleteClub = asyncHandler(async (req, res) => {
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

    await prisma.club.update({
      where:{
          id:Number(id)
      },
      data:{
          deletedAt:new Date()
      }
    });

    await createAuditLog({
      action:"CLUB_DELETED",
      entityType:"Club",
      entityId:id,
      performedById:req.user.id,
      description:`Deleted club ${existingClub.name}`,
      metadata:{
          clubName:club.name
      },
      ipAddress:req.ip,
      userAgent:req.headers["user-agent"]
  });

    res.json({
      message:"Club deleted successfully"
    });
});

const updateBranding = asyncHandler(async (req, res) => {
        const {
            primaryColor,
            secondaryColor,
            accentColor,
            tagline,
            motto
        } = req.body;

        const club = await prisma.club.update({
            where: {
                id: Number(req.params.id)
            },

            data: {
                primaryColor,
                secondaryColor,
                accentColor,
                tagline,
                motto
            }
        });

        res.json(club);
});

const updateSocialLinks = asyncHandler(async (req, res) => {
        const club = await prisma.club.update({
            where: {
                id: Number(req.params.id)
            },

            data: {
                website: req.body.website,
                github: req.body.github,
                instagram: req.body.instagram,
                linkedin: req.body.linkedin,
                youtube: req.body.youtube,
                discord: req.body.discord,
                email: req.body.email
            }
        });

        res.json(club);
});

module.exports = {
    createClub,
    getClubs,
    getClubById,
    getClubBySlug,
    updateClub,
    updateBranding,
    updateSocialLinks,
    deleteClub
};