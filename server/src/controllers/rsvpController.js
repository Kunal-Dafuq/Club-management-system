const prisma = require("../config/prisma");
const { createNotification } = require("../services/notificationService");
const { createActivity } = require("../services/activityService");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const createRSVP = asyncHandler(async (req, res) => {
    const eventId = Number(req.params.eventId);

    if (Number.isNaN(eventId)) {
        throw new ApiError(
            400,
            "Invalid event."
        );
    }

    const rsvp = await rsvpService.createRSVP(
        eventId,
        req.user.id,
        req.body.status
    );

    res.status(201).json({
        success: true,
        message: "RSVP submitted.",
        rsvp
    });
});

const getEventRSVPs = asyncHandler(async (req, res) => {
    const list = await rsvpService.getEventRSVPs(
        Number(req.params.eventId)
    );

    res.json({
        success: true,
        total: list.length,
        attendees: list
    });
});

const updateRSVP = asyncHandler(async (req, res) => {
    const rsvp = await rsvpService.updateRSVP(
        Number(req.params.id),
        req.body.status
    );

    res.json({
        success: true,
        message: "RSVP updated.",
        rsvp
    });
});

const deleteRSVP = asyncHandler(async (req, res) => {
    await rsvpService.deleteRSVP(
        Number(req.params.id)
    );

    res.json({
        success: true,
        message: "RSVP removed."
    });
});

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