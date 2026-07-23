const prisma = require("../config/prisma");

const rsvpService = require("../services/rsvpService");

const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const createRSVP = asyncHandler(async (req, res) => {
    const eventId = Number(req.params.id);

    if (Number.isNaN(eventId)) {
        throw new ApiError(400, "Invalid event.");
    }

    const rsvp = await rsvpService.createRSVP(
        req,
        eventId,
        req.body.status
    );

    res.status(201).json({
        success: true,
        message: "RSVP submitted.",
        rsvp
    });
});

const getEventRSVPs = asyncHandler(async (req, res) => {
    const attendees = await rsvpService.getEventRSVPs(
        Number(req.params.eventId)
    );

    res.json({
        success: true,
        total: attendees.length,
        attendees
    });
});

const updateRSVP = asyncHandler(async (req, res) => {
    const rsvp = await rsvpService.updateRSVP(
        req,
        eventId,
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
        req,
        eventId,
    );

    res.json({
        success: true,
        message: "RSVP removed."
    });
});

const getAttendees = asyncHandler(async (req, res) => {
    const eventId = Number(req.params.id);

    const attendees = await prisma.rSVP.findMany({
        where: {
            eventId
        },
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

    res.json({
        success: true,
        count: attendees.length,
        attendees
    });
});

module.exports = {
    createRSVP,
    getEventRSVPs,
    updateRSVP,
    deleteRSVP,
    getAttendees
};