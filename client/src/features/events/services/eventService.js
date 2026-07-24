import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const getEvents = (params = {}) => {
    return handleApi(() => api.get("/events", { params }));
};

export const getEvent = (id) => {
    return handleApi(() => api.get(`/events/${id}`));
};

export const createEvent = (data) => {
    return handleApi(() => api.post("/events", data));
};

export const updateEvent = (id, data) => {
    return handleApi(() => api.put(`/events/${id}`, data));
};

export const deleteEvent = (id) => {
    return handleApi(() => api.delete(`/events/${id}`));
};