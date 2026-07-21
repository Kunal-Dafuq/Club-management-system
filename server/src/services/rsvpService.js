const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const auditLogger = require("../utils/auditLogger");

const createRSVP = async (req, eventId, status) => {
    const userId = req.user.id;

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) {
        throw new ApiError(404, "Event not found.");
    }

    const rsvp = await prisma.rSVP.create({
        data: {
            eventId,
            userId,
            status
        },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    await auditLogger(req, {
        action: "RSVP_CREATED",
        entityType: "Event",
        entityId: eventId,
        metadata: { status }
    });

    return rsvp;
};

const getEventRSVPs = async (eventId) => {
    const attendees = await prisma.rSVP.findMany({
        where: { eventId },
        select: {
            id: true,
            status: true,
            user: {
                select: { id: true, name: true, email: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return attendees;
};

const updateRSVP = async (req, id, status) => {
    const updatedRsvp = await prisma.rSVP.update({
        where: { id },
        data: { status },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    await auditLogger(req, {
        action: "RSVP_UPDATED",
        entityType: "RSVP",
        entityId: id,
        metadata: { previousStatus: updatedRsvp.status, newStatus: status }
    });

    return updatedRsvp;
};

const deleteRSVP = async (req, id) => {
    await prisma.rSVP.delete({
        where: { id }
    });

    await auditLogger(req, {
        action: "RSVP_DELETED",
        entityType: "RSVP",
        entityId: id
    });

    return true;
};

module.exports = {
    createRSVP,
    getEventRSVPs,
    updateRSVP,
    deleteRSVP
};