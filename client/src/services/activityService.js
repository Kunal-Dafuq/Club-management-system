import api from "../api/axios";

export const getClubActivities = (clubId) =>
  api.get(`/activity/club/${clubId}`);