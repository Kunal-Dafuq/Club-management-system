import api from "../api/axios";
import { handleApi } from "../api/handleApi";

export const createRsvp = (data) =>
    handleApi(() => api.post("/rsvps", data));
 
export const getMyRsvps = () =>
    handleApi(() => api.get("/rsvps"));