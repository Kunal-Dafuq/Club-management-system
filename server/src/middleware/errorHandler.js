const Prisma = require("@prisma/client");
const ApiError = require("../utils/ApiError");

module.exports = (err, req, res) => {
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

    if (
        err instanceof Prisma.PrismaClientValidationError
    ) {
        return res.status(400).json({
            success: false,
            message: "Database validation failed."
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};