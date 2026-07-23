import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const { authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await login({
        email,
        password
      });

      const { token, refreshToken, user } = response.data;

      if (token && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: refreshToken
        });

        if (sessionError) {
          throw new Error("Failed to initialize session security.");
        }
      }

      authLogin(token, user);
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
        <h1 className="text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-4 text-zinc-400">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-3 p-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-zinc-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-3 p-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mt-6 text-sm text-red-500 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 p-4 rounded-xl bg-violet-600 font-semibold text-white hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;