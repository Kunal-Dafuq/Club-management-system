import { getSocket } from "./socket";

const prisma = require("../config/prisma");

module.exports = io => {
    io.on("connection", socket => {
        socket.on(
            "join-committee",
            committeeId => {
                socket.join(
                    `committee-${committeeId}`
                );
            }
        );

        socket.on(
            "leave-committee",
            committeeId => {
                socket.leave(
                    `committee-${committeeId}`
                );
            }
        );

        socket.on(
            "task-created",
            data => {
                io.to(
                    `committee-${data.committeeId}`

                ).emit(
                    "task-created",
                    data
                );
            }
        );

        socket.on(
            "task-updated",

            data => {
                io.to(
                    `committee-${data.committeeId}`
                ).emit(
                    "task-updated",
                    data
                );
            }
        );

        socket.on(
            "task-deleted",

            data => {
                io.to(
                    `committee-${data.committeeId}`
                ).emit(
                    "task-deleted",
                    data.id
                );
            }
        );
    });
};

export const emitTaskCreated = task => {
    getSocket().emit(
        "task-created",
        task
    );
};

export const emitTaskUpdated = task => {
    getSocket().emit(
        "task-updated",
        task
    );
};

export const emitTaskDeleted = task => {
    getSocket().emit(
        "task-deleted",
        task
    );
};