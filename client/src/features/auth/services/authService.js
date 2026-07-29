import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

const login = async (credentials) => {
  return handleApi(() => api.post("/auth/login", credentials));
};

const register = async (userData) => {
  return handleApi(() => api.post("/auth/register", userData));
};

const getProfile = async () => {
  return handleApi(() => api.get("/auth/me"));
};

const logout = async () => {
  return handleApi(() => api.post("/auth/logout"));
};

export default {
  login,
  register,
  getProfile,
  logout,
};