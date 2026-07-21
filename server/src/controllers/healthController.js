const asyncHandler = require("../middleware/asyncHandler");
const prisma = require("../config/prisma");
const { Ollama } = require("ollama");

const ollama = new Ollama({
    host: process.env.OLLAMA_HOST
});

const health = asyncHandler(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    let aiStatus = "offline";

    try {
        await ollama.list();
        aiStatus = "online";
    } catch (err) {
        console.error(err);
    }

    res.json({
        success: true,
        database: "healthy",
        ai: aiStatus,
        uptime: process.uptime(),
        timestamp: new Date()
    });

});

module.exports = {
    health
};