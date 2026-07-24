import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const getTaskActivity = (taskId) => 
    handleApi(() => api.get(`/activity/task/${taskId}`));

export const getClubActivity = (clubId) => 
    handleApi(() => api.get(`/activity/club/${clubId}`));