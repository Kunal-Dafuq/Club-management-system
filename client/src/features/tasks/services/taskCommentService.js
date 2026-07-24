import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const getTaskComments = (id) =>
    handleApi(() => api.get(`/task-comments/task/${id}`));

export const createComment = (id, data) =>
    handleApi(() => api.post(`/task-comments/task/${id}`, data));

export const updateComment = (id, data) =>
    handleApi(() => api.patch(`/task-comments/${id}`, data));

export const deleteComment = (id) =>
    handleApi(() => api.delete(`/task-comments/${id}`));

export const replyComment = (id, data) =>
    handleApi(() => api.post(`/task-comments/${id}/reply`, data));