import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Automatically attach Bearer token if present
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("Failed to read token from storage:", e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // Clear storage
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (e) {
        console.error("Failed to clear storage on 401:", e);
      }

      // Notify application state (AuthContext)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));

        // If not an initial profile synchronization check (/auth/me), redirect to login
        const currentPath = window.location.pathname;
        const isAuthMeRequest = error.config?.url?.includes("/auth/me");
        if (
          !isAuthMeRequest &&
          currentPath !== "/login" &&
          currentPath !== "/register" &&
          currentPath !== "/"
        ) {
          window.location.replace("/login?session=expired");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;