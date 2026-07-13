import api from "./axios";

export const getTaskComments=id=>
    api.get(`/task-comments/task/${id}`);

export const createComment=(id,data)=>
    api.post(`/task-comments/task/${id}`,data);

export const updateComment=(id,data)=>
    api.patch(`/task-comments/${id}`,data);

export const deleteComment=id=>
    api.delete(`/task-comments/${id}`);

export const replyComment=(id,data)=>
    api.post(`/task-comments/${id}/reply`,data);