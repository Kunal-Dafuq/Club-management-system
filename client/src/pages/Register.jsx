import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  User,
  Mail,
  Lock,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import authService from "../features/auth/services/authService";
import useAuth from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import GlassCard from "../components/ui/GlassCard";

const Register = () => {
  const navigate = useNavigate();
  const { authLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "Computer Science & Engineering",
  });

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Register User
      const regResponse = await authService.register(formData);
      if (!regResponse.success) {
        throw new Error(regResponse.error || "Registration failed.");
      }

      // 2. Automatically log in to obtain JWT token & session
      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (!loginResponse.success) {
        throw new Error(
          loginResponse.error ||
            "Registered successfully, but automatic login failed. Please sign in."
        );
      }

      const loginData = loginResponse.data?.data || loginResponse.data;
      const { token, user } = loginData;

      if (!token || !user) {
        throw new Error("Invalid authentication payload received from server.");
      }

      authLogin(token, user);
      showToast("Account created & workspace session activated!");
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD, { replace: true });
      }, 500);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
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
      navigate(ROUTES.DASHBOARD, { replace: true });
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
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* OrgOS Header Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-400/30 bg-violet-500/10 text-xs font-mono font-bold text-violet-400 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLUBPLANET ORGOS // CHARTER REGISTRATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Get Started
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Create your student organization account to access campus tools.
          </p>

          {/* Error Banner */}
          {error && (
            <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="Kunal Dev"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Campus Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="kunal@clubplanet.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Academic Department
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="Computer Science & Engineering"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Account Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 font-bold text-sm text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Create Account & Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
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
            Already have an account?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-cyan-400 hover:underline font-semibold ml-1"
            >
              Sign into workspace →
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default Register;