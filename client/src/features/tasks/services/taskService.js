import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const getCommitteeTasks = (committeeId) =>
    handleApi(() => api.get(`/tasks/committee/${committeeId}`));

export const getTask = (taskId) =>
    handleApi(() => api.get(`/tasks/${taskId}`));

export const createTask = (committeeId, data) =>
    handleApi(() => api.post(`/tasks/committee/${committeeId}`, data));

export const updateTask = (taskId, data) =>
    handleApi(() => api.patch(`/tasks/${taskId}`, data));

export const updateTaskStatus = (taskId, status) =>
    handleApi(() => api.patch(`/tasks/${taskId}/status`, { status }));

export const assignTask = (taskId, committeeMemberId) =>
    handleApi(() => api.patch(`/tasks/${taskId}/assign`, { committeeMemberId }));

export const archiveTask = (taskId) =>
    handleApi(() => api.patch(`/tasks/${taskId}/archive`));

export const restoreTask = (taskId) =>
    handleApi(() => api.patch(`/tasks/${taskId}/restore`));

export const deleteTask = (taskId) =>
    handleApi(() => api.delete(`/tasks/${taskId}`));

export const getTaskStats = (committeeId) =>
    handleApi(() => api.get(`/tasks/committee/${committeeId}/stats`));

export const reorderTask = (taskId, status, position) =>
    handleApi(() => api.patch(`/tasks/${taskId}/reorder`, { status, position }));