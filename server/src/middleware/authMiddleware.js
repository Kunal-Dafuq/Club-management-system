const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../middleware/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new ApiError(401, "Not authorized, token missing.");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired.");
        }
        throw new ApiError(401, "Invalid token.");
    }

    const userId = Number(decoded.id);
    if (Number.isNaN(userId)) {
        throw new ApiError(401, "Invalid token payload.");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: true,
            memberships: {
                select: {
                    id: true,
                    clubId: true,
                    status: true,
                    clubRole: true
                }
            }
        }
    });

    if (!user) {
        throw new ApiError(401, "User no longer exists.");
    }

    const membershipMap = {};
    const approvedMemberships = user.memberships.filter(
        membership => membership.status === "APPROVED"
    );

    approvedMemberships.forEach(membership => {
        membershipMap[membership.clubId] = membership.id;
    });

    user.membershipMap = membershipMap;
    req.user = user;

    let activeClubId = Number(req.headers["x-club-id"]);

    if (!activeClubId && req.params.roomId) {
        const roomId = Number(req.params.roomId);
        if (!Number.isNaN(roomId)) {
            const room = await prisma.chatRoom.findUnique({
                where: { id: roomId },
                select: { clubId: true }
            });
            if (room?.clubId) {
                activeClubId = room.clubId;
            }
        }
    }

    if (activeClubId) {
        const membership = approvedMemberships.find(
            m => m.clubId === activeClubId
        );
        req.membership = membership || null;
    } else {
        req.membership = null;
    }

    next();
});

module.exports = {
    protect
};