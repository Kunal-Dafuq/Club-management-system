const prisma = require("../config/prisma");
const taskService = require("../services/taskService");
const auditLogger = require("../utils/auditLogger");
const { createActivity } = require("../services/activityService");

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(
            Number(req.params.committeeId),
            req.membership.id,
            req.body
        );

        req.io.to(`committee-${req.params.committeeId}`)
            .emit("task-created", task);

        await auditLogger(req,{
            action:"TASK_CREATED",
            entityType:"Task",
            entityId:task.id,
            description:`Created task "${task.title}"`,
            clubId:task.committee.clubId
        });

        res.status(201).json(task);
    }

    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

const getCommitteeTasks = async (req, res) => {
    try {
        const tasks = await taskService.getCommitteeTasks(
            Number(req.params.committeeId)
        );

        res.json(tasks);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(
            Number(req.params.taskId)
        );

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const assignTask = async (req, res) => {
    try {
        const task = await taskService.assignTask(
            Number(req.params.taskId),
            Number(req.body.committeeMemberId)
        );

        req.io.to(`committee-${task.committeeId}`)
            .emit("task-updated", task);

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};

const updateStatus = async (req, res) => {
    try {
        const task = await taskService.updateStatus(
            Number(req.params.taskId),
            req.body.status
        );

        req.io.to(`committee-${task.committeeId}`)
            .emit("task-updated", task);

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};

const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            Number(req.params.taskId),
            req.body
        );

        req.io.to(`committee-${task.committeeId}`)
            .emit("task-updated", task);

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }
};

const archiveTask = async (req, res) => {
    try {
        const task = await taskService.archiveTask(
            Number(req.params.taskId)
        );

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const restoreTask = async (req, res) => {
    await taskService.restoreTask(taskId);

    await auditLogger(req,{
        action:"TASK_RESTORED",
        entityType:"Task",
        entityId:taskId,
        description:"Task restored"
    });

    res.json({
        message:"Task restored"
    });

    try {
        const task = await taskService.restoreTask(
            Number(req.params.taskId)
        );

        res.json(task);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(
            Number(req.params.taskId)
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const getTaskStatistics = async (req, res) => {
    try {
        const stats =
            await taskService.getTaskStatistics(
                Number(req.params.committeeId)
            );

        res.json(stats);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
};

const reorderTask = async(req,res)=>{
    const task=await taskService.reorderTask(
        Number(req.params.taskId),
        req.body.status,
        req.body.position
    );

    res.json(task);

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