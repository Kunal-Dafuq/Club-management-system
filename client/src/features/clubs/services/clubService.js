import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const getClubs = () =>
    handleApi(() => api.get("/clubs"));

export const getClub = (id) =>
    handleApi(() => api.get(`/clubs/${id}`));

export const createClub = (data) =>
    handleApi(() => api.post("/clubs", data));

export const updateClub = (id, data) =>
    handleApi(() => api.put(`/clubs/${id}`, data));

export const deleteClub = (id) =>
    handleApi(() => api.delete(`/clubs/${id}`));