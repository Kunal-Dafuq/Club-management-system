import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

const login = (credentials) =>
    handleApi(() => api.post("/auth/login", credentials));

const register = (userData) =>
    handleApi(() => api.post("/auth/register", userData));

const getProfile = () =>
    handleApi(() => api.get("/auth/profile"));

export default {
    login,
    register,
    getProfile,
};