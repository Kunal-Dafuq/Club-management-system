const prisma = require("../config/prisma");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const { createNotification } = require("../services/notificationService");
const { createActivity } = require("../services/activityService");

const sendAnnouncement = asyncHandler(async (req, res) => {
    const {
        clubId,
        title,
        message
    } = req.body;

    if (!clubId || !title || !message) {
        throw new ApiError(
            400,
            "Club, title and message are required."
        );
    }

    const club = await prisma.club.findUnique({
        where: {
            id: Number(clubId)
        }
    });

    if (!club) {
        throw new ApiError(
            404,
            "Club not found."
        );
    }

    const announcement = await prisma.announcement.create({
        data: {
            clubId: Number(clubId),
            title,
            content: message,
            createdById: req.user.id
        }
    });

    await createActivity({
        clubId,
        userId: req.user.id,
        action: "ANNOUNCEMENT",
        description: `Announcement "${title}" posted.`
    });

    const members = await prisma.membership.findMany({
        where: {
            clubId: Number(clubId)
        },
        select: {
            userId: true
        }
    });

    await Promise.all(
        members.map(member =>
            createNotification({
                userId: member.userId,
                message: `📢 ${club.name}: ${title}`
            })
        )
    );

    await auditLogger(req, {
        action: "ANNOUNCEMENT_CREATED",
        entityType: "Announcement",
        entityId: announcement.id,
        clubId
    });

    req.io
    ?.to(`club-${clubId}`)
    .emit("announcement:new", announcement);

    res.status(201).json({
        success: true,
        message: "Announcement published successfully.",
        announcement
    });
});

const getAnnouncements = asyncHandler(async (req, res) => {
    const clubId = Number(req.params.clubId);
    const page = Number(req.query.page) || 1;
    const limit = 20;

    const announcements = await prisma.announcement.findMany({
        where: {
            clubId: clubId
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            creator: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    res.json({
        success: true,
        total: announcements.length,
        announcements
    });
});

const updateAnnouncement = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const announcement = await prisma.announcement.findUnique({
        where:{
            id
        }
    });

    if(!announcement){
        throw new ApiError(
            404,
            "Announcement not found."
        );
    }

    if(
        announcement.createdById!==req.user.id &&
        req.membership.role!=="PRESIDENT"
    ){
        throw new ApiError(
            403,
            "Not allowed."
        );
    }

    const updated = await prisma.announcement.update({
        where: {
            id
        },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    });

    await auditLogger(req, {
        action: "ANNOUNCEMENT_UPDATED",
        entityType: "Announcement",
        entityId: id,
        clubId: announcement.clubId
    });

    req.io
        ?.to(`club-${announcement.clubId}`)
        .emit("announcement:update", announcement);

    res.json({
        success: true,
        updated
    });
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const announcement = await prisma.announcement.findUnique({
        where: {
            id
        }
    });

    if(
        announcement.createdById !== req.user.id &&
        req.membership.role !== "PRESIDENT"
    ){
        throw new ApiError(
            403,
            "Not allowed."
        );
    }

    await prisma.announcement.update({
        where: {
            id
        },
        data: {
           deletedAt: new Date()
        }
    });

    await createActivity({
        clubId: announcement.clubId,
        userId: req.user.id,
        action: "ANNOUNCEMENT_DELETED",
        description: announcement.title
    });

    await auditLogger(req, {
        action: "ANNOUNCEMENT_DELETED",
        entityType: "Announcement",
        entityId: id,
        clubId: announcement.clubId
    });

    req.io
        ?.to(`club-${announcement.clubId}`)
        .emit("announcement:deleted", id);

    res.json({
        success: true,
        message: "Announcement deleted."
    });

});

module.exports = {
    sendAnnouncement,
    getAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};