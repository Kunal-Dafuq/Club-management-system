import api from "../api/axios";
import { handleApi } from "../api/handleApi";

export const getNotifications = () =>
    handleApi(() => api.get("/notifications"));