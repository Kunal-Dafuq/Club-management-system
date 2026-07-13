const prisma = require("../config/prisma");
const { generateSlug } = require("../services/clubService");
const auditLogger = require("../utils/auditLogger");
const createClub = async (req,res)=>{
  try{
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
      return res.status(400).json({
        message:"Club already exists"
      });
    }

    const slug = await generateSlug(name);

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
  }

  catch(error){
    console.log(error);
    res.status(500).json({
      message:"Server error"
    });
  }
};

const getClubs = async (req, res) => {
  try {

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

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

const getClubById = async (req, res) => {
  try {
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

  }

  catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

const getClubBySlug = async (req, res) => {
    try {
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
    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"

        });
    }
};

const updateClub = async (req,res)=>{
  try{
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

    await prisma.club.update({
      where:{
          id
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
      description:`Deleted club ${club.name}`,
      metadata:{
          clubName:club.name
      },
      ipAddress:req.ip,
      userAgent:req.headers["user-agent"]
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

const updateBranding = async (req, res) => {
    try {
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

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"

        });
    }
};

const updateSocialLinks = async (req, res) => {
    try {
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

    }

    catch (error) {
        console.log(error);
        res.status(500).json({

            message: "Server error"
            
        });
    }
};

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