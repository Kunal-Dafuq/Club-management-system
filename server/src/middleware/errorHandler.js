const Prisma = require("@prisma/client");
const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            message: "Duplicate record."
        });
    }

    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            message: "Record not found."
        });
    }

    if (err.name === "ZodError") {
        return res.status(400).json({
            success: false,
            errors: err.errors
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            success: false,
            message: "Database validation failed."
        });
    }

    const statusCode = err.statusCode || 400; // Defaults to 400 for standard controller errors, or use 500 if preferred
    const message = err.message || "Internal Server Error";

    return res.status(err.statusCode || 500).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};