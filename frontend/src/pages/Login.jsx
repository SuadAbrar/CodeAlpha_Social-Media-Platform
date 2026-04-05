import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { login as loginUser } from "../features/auth/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, setLoading, loading } = useAuth();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await loginUser(form);
      login(userData);
      navigate("/");
    } catch (submitError) {
      console.error("Login failed:", submitError);
      setError(
        submitError.response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_30%),linear-gradient(135deg,#eef2ff,#ffffff)] px-4 py-10">
      <div className="w-full max-w-lg rounded-3xl bg-white/95 border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm">
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            {/* <div className="mx-auto mb-4 h-12 w-12 rounded-3xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl shadow-sm">
              S
            </div> */}
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              SocialApp
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Login to continue to your feed and stay connected.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <FaEnvelope className="h-4 w-4 text-slate-400" /> Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="emailAddress@gmail.com"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <FaLock className="h-4 w-4 text-slate-400" /> Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded-full px-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaGoogle className="h-4 w-4" /> Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaTwitter className="h-4 w-4" /> Twitter
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-slate-900 transition hover:text-blue-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
