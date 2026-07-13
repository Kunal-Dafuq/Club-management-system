import api from "./axios";

export const getTaskActivity = taskId =>
    api.get(`/activity/task/${taskId}`);

export const getClubActivity = clubId =>
    api.get(`/activity/club/${clubId}`);