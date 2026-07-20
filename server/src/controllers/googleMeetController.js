const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

const prisma = require("../config/prisma");

const {createMeet} = require("../services/googleMeetService");

const createMeetLink = asyncHandler(async (req, res) => {
    const eventId = Number(req.params.eventId);

    if (Number.isNaN(eventId)) {
        throw new ApiError(
            400,
            "Invalid event id."
        );
    }

    const event = await prisma.event.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        throw new ApiError(
            404,
            "Event not found."
        );
    }

    const meet = await createMeet(
        eventId,
        req.user.id
    );

    res.status(201).json({
        success: true,
        message: "Google Meet created successfully.",
        meet
    });
});

module.exports = {
    createMeetLink
};