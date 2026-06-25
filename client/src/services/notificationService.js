import api from "../api/axios";

export const getNotifications = () =>
  api.get("/notifications");