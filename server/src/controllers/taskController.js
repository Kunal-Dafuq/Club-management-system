const taskService = require("../services/taskService");
const auditLogger = require("../utils/auditLogger");
const asyncHandler=require("../middleware/asyncHandler");
const ApiError=require("../utils/ApiError");
const { createActivity } = require("../services/activityService");

const createTask = asyncHandler(async (req,res)=>{
        const task = await taskService.createTask(
            Number(req.params.committeeId),
            req.membership.id,
            req.body
        );

        if(
            !req.membership ||
            !allowed.includes(req.membership.role)
        ){
            throw new ApiError(
                403,
                "Only committee leads can create tasks."
            );
        }

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-created", task);

        await auditLogger(req,{
            action:"TASK_CREATED",
            entityType:"Task",
            entityId:task.id,
            description:`Created task "${task.title}"`,
            clubId:task.committee.clubId
        });

        res.status(201).json(task);
});

const getCommitteeTasks = asyncHandler(async (req,res)=>{
        const tasks = await taskService.getCommitteeTasks(
            Number(req.params.committeeId)
        );

        res.json({
        success:true,
        tasks
    });
});

const getTaskById = asyncHandler(async (req,res)=>{
        const task = await taskService.getTaskById(
            Number(req.params.taskId)
        );

        res.json({
        success:true,
        task
    });
});

const assignTask = asyncHandler(async (req,res)=>{
        const task = await taskService.assignTask(
            Number(req.params.taskId),
            Number(req.body.committeeMemberId)
        );

        await createActivity({
            clubId:
                task.committee.clubId,
            userId:
                req.user.id,
            action:
                "TASK_ASSIGNED",
            description:
                `Assigned "${task.title}"`
        });

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated", task);

        await auditLogger(req,{
            action:"TASK_ASSIGNED",
            entityType:"Task",
            entityId:task.id
        });

        res.json({
        success:true,
        task
    });
});

const updateStatus = asyncHandler(async (req,res)=>{
        const task = await taskService.updateStatus(
            Number(req.params.taskId),
            req.body.status
        );

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated", task);

        await createActivity({
            clubId:task.committee.clubId,
            userId:req.user.id,
            action:"TASK_STATUS_UPDATED",
            description:
            `${task.title} moved to ${task.status}`
        });

        await auditLogger(req,{
            action:"TASK_STATUS_UPDATED",
            entityType:"Task",
            entityId:task.id,
            metadata:{
                status:task.status
            }
        });

        res.json({
        success:true,
        task
    });
});

const updateTask = asyncHandler(async (req,res)=>{
        const task = await taskService.updateTask(
            Number(req.params.taskId),
            req.body
        );

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated", task);

        await auditLogger(req,{
            action:"TASK_UPDATED",
            entityType:"Task",
            entityId:task.id
        });

        res.json({
        success:true,
        task
    });;
});

const archiveTask = asyncHandler(async (req,res)=>{
        const task = await taskService.archiveTask(
            Number(req.params.taskId)
        );

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated", task);
        await auditLogger(req,{
            action:"TASK_ARCHIVED",
            entityType:"Task",
            entityId:task.id
        });

        res.json({
        success:true,
        task
    });;
});

const restoreTask = asyncHandler(async (req, res) => {
    const task = await taskService.restoreTask(
        Number(req.params.taskId)
    );

    req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated", task);

    await auditLogger(req, {
        action: "TASK_RESTORED",
        entityType: "Task",
        entityId: task.id,
        clubId: task.committee?.clubId
    });

    res.json({
        success: true,
        task
    });
});

const deleteTask = asyncHandler(async (req,res)=>{
    const taskId = Number(req.params.taskId);

    const task = await taskService.deleteTask(
        taskId,
        req.user.id
    );

    if(
        task.createdById!==req.membership.id &&
        req.membership.role!=="PRESIDENT"
    ){
        throw new ApiError(
            403,
            "Not allowed."
        );
    }

    req.io
    ?.to(`committee-${task.committeeId}`)
    .emit(
        "task-deleted",
        task.id
    );

    await auditLogger(req,{
        action:"TASK_DELETED",
        entityType:"Task",
        entityId:task.id
    });

    res.json({
        success:true,
        message:"Task deleted."
    });
});

const reorderTask = asyncHandler(async (req,res)=>{
        const task = await taskService.reorderTask(
            Number(req.params.taskId),
            req.body.status,
            req.body.position
        );

        req.io
        ?.to(`committee-${task.committeeId}`)
        .emit("task-updated",task);

        await auditLogger(req,{
            action:"TASK_REORDERED",
            entityType:"Task",
            entityId:task.id,
            metadata:{
                status:task.status,
                position:task.position
            }
        });

        res.json({
        success:true,
        task
    });;
});

const getTaskStatistics = asyncHandler(async (req,res)=>{
        const stats =
            await taskService.getTaskStatistics(
                Number(req.params.committeeId)
            );

        res.json({
        success:true,
        stats
        });
});

module.exports={
    createTask,
    getCommitteeTasks,
    getTaskById,
    assignTask,
    updateStatus,
    updateTask,
    archiveTask,
    restoreTask,
    deleteTask,
    reorderTask,
    getTaskStatistics
};