const prisma = require("../config/prisma");

const gracefulShutdown = (server) => {
    const shutdown = async (signal) => {
        console.log(
            `\n${signal} received.`
        );

        console.log(
            "Stopping ClubPlanet..."
        );

        try {
            await prisma.$disconnect();

            console.log(
                "Prisma disconnected."
            );

            server.close(() => {
                console.log(
                    "HTTP server stopped."
                );
                process.exit(0);
            });

        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    };

    process.on(
        "SIGINT",
        () => shutdown("SIGINT")
    );

    process.on(
        "SIGTERM",
        () => shutdown("SIGTERM")
    );
};

module.exports = gracefulShutdown;