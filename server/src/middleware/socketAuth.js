const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const socketAuth = async (socket, next) => {
    try {
        const token =
            socket.handshake.auth.token ||
            socket.handshake.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return next(new Error("Authentication required"));
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!user) {
            return next(new Error("User not found"));
        }

        socket.user = user;

        next();
    }

    catch (err) {
        next(new Error("Unauthorized"));
    }
};

module.exports = socketAuth;