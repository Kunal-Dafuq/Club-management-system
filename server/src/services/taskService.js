const prisma = require("../config/prisma");
const workflow = require("../utils/taskWorkflow");

const { createAuditLog } = require("./auditService");

const createTask = async (
    committeeId,
    membershipId,
    data
) => {
    return prisma.$transaction(async (tx) => {
        const committee = await tx.committee.findUnique({
            where: {
                id: committeeId
            }
        });

        if (!committee) {
            throw new Error("Committee not found");
        }

        const membership = await tx.membership.findUnique({
            where: {
                id: membershipId
            }
        });

        if (!membership) {
            throw new Error("Membership not found");
        }

        if (membership.status !== "APPROVED") {
            throw new Error("Member is not approved");
        }

        if (membership.clubId !== committee.clubId) {
            throw new Error(
                "Member belongs to another club"
            );
        }

        const duplicate = await tx.task.findFirst({
            where: {
                committeeId,
                title: data.title,
                isArchived: false
            }
        });

        if (duplicate) {
            throw new Error(
                "Task already exists"
            );
        }

        const count = await tx.task.count({

            where: {
                committeeId,
                isArchived: false
            }
        });

        const task = await tx.task.create({
            data: {
                title: data.title,
                description: data.description,
                priority: (data.priority || "MEDIUM").toUpperCase(),
                dueDate:
                    data.dueDate
                        ? new Date(data.dueDate)
                        : null,
                committeeId,
                createdById: membershipId,
                position: count + 1
            }
        });

        const creator = await tx.user.findUnique({
            where: {
                id: membership.userId
            },
            select: {
                name: true
            }
        });

        await tx.activity.create({
            data: {
                clubId: committee.clubId,
                userId: membership.userId,
                action: "TASK_CREATED",
                description: `${creator.name} created task "${task.title}"`
            }
        });

        const heads = await tx.committeeMember.findMany({
            where: {
                committeeId,
                role: {
                    in: [
                        "HEAD",
                        "COORDINATOR"
                    ]
                }
            },
            include: {
                membership: true
            }
        });

        if (heads.length > 0) {
            await tx.notification.createMany({
                data: heads.map(head => ({
                    userId: head.membership.userId,

                    message:
                        `New task "${task.title}" has been created.`
                }))
            });
        }
        return tx.task.findUnique({
            where: {
                id: task.id
            },
            include: {
                committee: true,
                assignedTo: {
                    include: {
                        membership: {
                            include: {
                                user: true
                            }
                        }
                    }
                },
                createdBy: {
                    include: {
                        user: true
                    }
                }
            }
        });
    });
};

const getCommitteeTasks = async (committeeId) => {
    return prisma.task.findMany({
        where: {
            committeeId,
            isArchived: false
        },
        include: {
            assignedTo: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                }
            },
            createdBy: {
                include: {
                    user: true
                }
            }
        },
        orderBy: [
            {
                position: "asc"
            },
            {
                createdAt: "desc"
            }
        ]
    });
};

const getTaskById = async (taskId) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        },
        include: {
            committee: true,
            assignedTo: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                }
            },
            createdBy: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};

const assignTask = async (taskId, committeeMemberId) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const committeeMember = await prisma.committeeMember.findUnique({
        where: {
            id: committeeMemberId
        }
    });

    if (!committeeMember) {
        throw new Error("Committee member not found");
    }

    if (committeeMember.committeeId !== task.committeeId) {
        throw new Error("Member does not belong to this committee");
    }

    const updatedTask = await prisma.task.update({
        where:{
            id:taskId
        },

        data:{
            assignedToId:committeeMemberId
        },

        include:{
            committee:true,
            assignedTo:{
                include:{
                    membership:{
                        include:{
                            user:true
                        }
                    }
                }
            }
        }
    });

    await prisma.notification.create({
        data:{
            userId:
                updatedTask
                .assignedTo
                .membership
                .userId,
            message:
                `You were assigned "${updatedTask.title}".`
        }
    });

    return updatedTask;
};

const updateStatus = async (taskId, newStatus) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const allowed = workflow[task.status] || [];

    if (!allowed.includes(newStatus)) {
        throw new Error(
            `Cannot move task from ${task.status} to ${newStatus}`
        );
    }

    const updateData = {
        status: newStatus,
        completedAt:
            newStatus === "COMPLETED"
                ? new Date()
                : null
    };

    return prisma.task.update({
        where: {
            id: taskId
        },
        data: updateData,
        include: {
            committee: true
        }
    });
};

const updateTask = async (taskId, data) => {
    return prisma.task.update({
        where:{
            id:taskId
        },
        data: {
            title: data.title ?? undefined,
            description: data.description ?? undefined,
            priority: data.priority
                ? data.priority.toUpperCase()
                : undefined,
            dueDate:
                data.dueDate !== undefined
                    ? (data.dueDate ? new Date(data.dueDate) : null)
                    : undefined
        },
        include:{
            committee:true
        }
    });
};

const archiveTask = async (taskId) => {
    return prisma.task.update({
        where:{
            id:taskId
        },
        data: {
            isArchived: true,
            archivedAt: new Date()
        },
        include:{
            committee:true
        }
    });
};

const deleteTask = async (taskId, userId) => {
    const task = await prisma.task.findUnique({
        where: {
            id: taskId
        },
        include: {
            committee: true
        }
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const deletedTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            deletedAt: new Date()
        },
        include: {
            committee: true
        }
    });

    await createAuditLog({
        action: "TASK_DELETED",
        entityType: "Task",
        entityId: deletedTask.id,
        clubId: deletedTask.committee.clubId,
        performedById: userId,
        metadata: {
            title: deletedTask.title
        }
    });

    return deletedTask;
};

const restoreTask = async (taskId) => {
    return prisma.task.update({
        where: { id: taskId },
        data: {
            isArchived: false,
            archivedAt: null,
            deletedAt: null
        },
        include: {
            committee: true
        }
    });
};

const getTaskStatistics = async (committeeId) => {
    const tasks = await prisma.task.findMany({
        where: {
            committeeId,
            isArchived: false
        }
    });

    return {
        total: tasks.length,

        todo: tasks.filter(t => t.status === "TODO").length,

        inProgress: tasks.filter(
            t => t.status === "IN_PROGRESS"
        ).length,

        review: tasks.filter(
            t => t.status === "REVIEW"
        ).length,

        completed: tasks.filter(
            t => t.status === "COMPLETED"
        ).length,

        overdue: tasks.filter(task =>
            task.dueDate &&
            task.status !== "COMPLETED" &&
            task.dueDate < new Date()
        ).length
    };
};

const reorderTask = async(
    taskId,
    status,
    position
)=>{
    return prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            status,
            position
        },
        include: {
            committee: true
        }
    });
};

module.exports = {
    createTask,
    getCommitteeTasks,
    getTaskById,
    assignTask,
    updateStatus,
    updateTask,
    archiveTask,
    restoreTask,
    deleteTask,
    getTaskStatistics,
    reorderTask
};