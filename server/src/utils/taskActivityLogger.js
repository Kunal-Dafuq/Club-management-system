const prisma = require("../config/prisma");

const logTaskActivity = async ({
    taskId,
    membershipId,
    action,
    details
}) => {
    return prisma.activity.create({
        data: {
            taskId,
            membershipId,
            action,
            description: details
        }
    });
};

module.exports = logTaskActivity;