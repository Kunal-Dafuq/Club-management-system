import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-[#06080F] text-white space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-violet-500/20 border-b-violet-400 animate-spin" />
        </div>
        <div className="text-xs font-mono font-extrabold uppercase tracking-widest text-cyan-400 animate-pulse">
          VERIFYING ORGOS SESSION...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;