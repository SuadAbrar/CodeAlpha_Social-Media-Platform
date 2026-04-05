import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import { register as registerUser } from "../features/auth/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, setLoading, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await registerUser(form);
      register(userData);
      navigate("/login");
    } catch (submitError) {
      console.error("Registration failed:", submitError);
      setError(
        submitError.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_20%),linear-gradient(135deg,#f8fafc,#eef2ff)] px-4 py-10">
      <div className="w-full max-w-lg rounded-[2.5rem] bg-white/95 border border-slate-200 shadow-[0_32px_96px_rgba(15,23,42,0.14)] backdrop-blur-sm transition duration-500 ease-out hover:-translate-y-1">
        <div className="p-8 sm:p-10">
          <div className="mb-8 text-center">
            {/* <div className="mx-auto mb-4 h-14 w-14 rounded-[1.75rem] bg-sky-100 text-sky-600 flex items-center justify-center text-3xl shadow-sm shadow-sky-200/70">
              ♡
            </div> */}
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.24em] text-sky-600">
              SocialApp
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              Join the community
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Create your account and start sharing your story with friends
              around the world.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaUser className="h-4 w-4 text-slate-400" /> Username
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Choose a cool username"
                className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </label>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaEnvelope className="h-4 w-4 text-slate-400" /> Email address
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
                className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
              />
            </label>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FaLock className="h-4 w-4 text-slate-400" /> Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded-full px-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
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
              className="inline-flex w-full items-center justify-center rounded-[1.75rem] bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? "Creating account..." : "Create your account"}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaGoogle className="h-4 w-4" /> Continue with Google
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-[1.75rem] border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              <FaTwitter className="h-4 w-4" /> Continue with Twitter
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-slate-900 transition hover:text-sky-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
