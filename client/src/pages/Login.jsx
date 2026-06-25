import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { authLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button clicked");
    try {
      setLoading(true);

      const response = await login({
        email,
        password
      });

      console.log(response.data);

      authLogin(
        response.data.token,
        response.data.user
      );

      navigate("/dashboard");
      
    } catch(error) {
      console.log(error.response);
      setError(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6"
    >

      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-10"
        >

        <h1 className="text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mt-4 text-zinc-400">
          Login to your account
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10"
        >
          <div>
            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e)=>
                setEmail(e.target.value)
              }
              className="
              w-full
              mt-3
              p-4
              rounded-xl
              bg-black/30
              border
              border-white/10"
            />

          </div>

          <div className="mt-6">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e)=>
                setPassword(e.target.value)
              }
              className="
              w-full
              mt-3
              p-4
              rounded-xl
              bg-black/30
              border
              border-white/10"
            />
          </div>

          {error && (
            <p
              className="
                mt-6
               text-red-500"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-10
              p-4
              rounded-xl
             bg-violet-600
              disabled:opacity-50"
          >

            {loading ? "Logging in..." : "Login"}

          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;