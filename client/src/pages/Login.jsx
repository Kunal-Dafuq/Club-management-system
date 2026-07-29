import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import authService from "../features/auth/services/authService";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      if (!response.success) {
        throw new Error(response.error || "Invalid credentials.");
      }

      const responseData = response.data?.data || response.data;
      const token = responseData?.token;
      const user = responseData?.user;

      if (!token || !user) {
        throw new Error("Invalid authentication payload received from server.");
      }

      authLogin(token, user);
      showToast("Signed into ClubPlanet OrgOS!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Invalid email or password. Please try again.";
      setError(errMsg);
      showToast(errMsg, true);
    } finally {
      setLoading(false);
    }
  };

  // Instant demo account for quick UI/UX testing without local DB setup
  const handleDemoLogin = () => {
    const demoUser = {
      id: "demo-kunal-01",
      name: "Kunal Dev",
      email: "kunal@clubplanet.edu",
      role: "PRESIDENT",
      department: "Computer Science & Engineering",
    };
    const demoToken = "jwt_demo_token_clubplanet_orgos_2026";

    authLogin(demoToken, demoUser);
    showToast("Demo Executive Session Activated!");
    setTimeout(() => {
      navigate(from, { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#06080F] text-white selection:bg-cyan-500/30">
      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-8 right-6 z-50 px-5 py-3.5 rounded-2xl backdrop-blur-xl border flex items-center gap-2.5 font-semibold text-sm shadow-2xl ${
              toast.isError
                ? "bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                : "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            }`}
          >
            {toast.isError ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            )}
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-md">
        <GlassCard className="p-8 sm:p-10 border-white/15 shadow-2xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* OrgOS Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-xs font-mono font-bold text-cyan-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLUBPLANET ORGOS // AUTHENTICATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign in to access your chartered student organization workspace.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="name@clubplanet.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 font-bold text-sm text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Sign Into Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] font-mono uppercase">
              <span className="bg-[#0A0D18] px-3 text-zinc-400">
                OR TEST INSTANTLY
              </span>
            </div>
          </div>

          {/* Demo Explorer Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Enter Demo Executive Account (Kunal)</span>
          </button>

          {/* Footer Link */}
          <p className="mt-8 text-center text-xs text-zinc-400">
            Don't have an account?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="text-cyan-400 hover:underline font-semibold ml-1"
            >
              Create student account →
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;