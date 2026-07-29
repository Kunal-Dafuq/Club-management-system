import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import authService from "../features/auth/services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser && savedUser !== "undefined"
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem("token");
      return savedToken && savedToken !== "undefined" ? savedToken : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Clear authentication state completely
  const clearAuth = useCallback(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {
      console.error("Failed to clear auth storage:", e);
    }
    setToken(null);
    setUser(null);
  }, []);

  // Synchronize user profile from backend (/auth/me)
  const refreshProfile = useCallback(async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken || currentToken === "undefined") {
      setLoading(false);
      return;
    }

    // Skip hitting the backend if using the demo exploration session
    if (
      currentToken.includes("demo") ||
      currentToken === "jwt_demo_token_clubplanet_orgos_2026"
    ) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.getProfile();
      if (response.success && response.data?.user) {
        const freshUser = response.data.user;
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      } else if (response.error && response.error.includes("401")) {
        // Invalid or expired token
        clearAuth();
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        clearAuth();
      }
    } finally {
      setLoading(false);
    }
  }, [clearAuth]);

  // Session persistence and initial profile synchronization on mount
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  // Listen for automatic 401 unauthorized events from axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuth();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, [clearAuth]);

  // Login action: persist token & user state
  const authLogin = useCallback((newToken, newUser) => {
    if (!newToken || !newUser) return;
    try {
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Failed to save auth to storage:", e);
    }
    setToken(newToken);
    setUser(newUser);
  }, []);

  // Logout action: call backend logout endpoint, clear local state & redirect
  const logout = useCallback(async () => {
    try {
      if (token && !token.includes("demo")) {
        await authService.logout();
      }
    } catch (err) {
      console.error("Logout API note:", err);
    } finally {
      clearAuth();
      if (typeof window !== "undefined") {
        window.location.replace("/login");
      }
    }
  }, [token, clearAuth]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      authLogin,
      logout,
      refreshProfile,
      clearAuth,
      isAuthenticated: !!token && !!user,
    }),
    [user, token, loading, authLogin, logout, refreshProfile, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;