import api from "./axios";

export const getCommitteeTasks = committeeId =>
    api.get(`/tasks/committee/${committeeId}`);

export const getTask = taskId =>
    api.get(`/tasks/${taskId}`);

export const createTask = (committeeId,data)=>
    api.post(
        `/tasks/committee/${committeeId}`,
        data
    );

export const updateTask=(taskId,data)=>
    api.patch(
        `/tasks/${taskId}`,
        data
    );

export const updateTaskStatus=(taskId,status)=>
    api.patch(
        `/tasks/${taskId}/status`,
        {status}
    );

export const assignTask=(
    taskId,
    committeeMemberId
)=>
    api.patch(
        `/tasks/${taskId}/assign`,
        {committeeMemberId}
    );

export const archiveTask=taskId=>
    api.patch(
        `/tasks/${taskId}/archive`
    );

export const restoreTask=taskId=>
    api.patch(
        `/tasks/${taskId}/restore`
    );

export const deleteTask=taskId=>
    api.delete(
        `/tasks/${taskId}`
    );

export const getTaskStats=committeeId=>
    api.get(
        `/tasks/committee/${committeeId}/stats`
    );


export const reorderTask=(taskId,status,position)=>{
    return api.patch(
        `/tasks/${taskId}/reorder`,
        {
            status,
            position
        }
    );
};