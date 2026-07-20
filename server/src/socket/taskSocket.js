const { getIO } = require("./socket");

const registerTaskSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-committee", (committeeId) => {
            socket.join(`committee-${committeeId}`);
        });

        socket.on("leave-committee", (committeeId) => {
            socket.leave(`committee-${committeeId}`);
        });

        socket.on("task-open", ({ taskId, user }) => {
            socket.join(`task-${taskId}`);

            socket.to(`task-${taskId}`).emit(
                "presence-joined",
                user
            );
        });

        socket.on("task-close", ({ taskId, user }) => {
            socket.leave(`task-${taskId}`);

            socket.to(`task-${taskId}`).emit(
                "presence-left",
                user.id
            );
        });

        socket.on("comment-added", (data) => {
            io.to(`task-${data.taskId}`).emit(
                "comment-added",
                data
            );
        });

        socket.on("typing-comment", (data) => {
            socket.to(`task-${data.taskId}`).emit(
                "typing-comment",
                data
            );
        });
    });
};

const emitTaskCreated = (task) => {
    getIO()
        .to(`committee-${task.committeeId}`)
        .emit("task-created", task);

};

const emitTaskUpdated = (task) => {
    getIO()
        .to(`committee-${task.committeeId}`)
        .emit("task-updated", task);

};

const emitTaskDeleted = (task) => {
    getIO()
        .to(`committee-${task.committeeId}`)
        .emit("task-deleted", task.id);

};

module.exports = {
    registerTaskSocket,
    emitTaskCreated,
    emitTaskUpdated,
    emitTaskDeleted
};