import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaUserCircle, FaHome, FaSearch, FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 border-b border-slate-200 shadow-sm backdrop-blur-sm">
      <div className="md:max-w-6xl mx-auto flex items-center justify-between px-2 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-tight text-sky-600 hover:text-slate-900 transition"
        >
          {/* <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-lg shadow-sm">
            ♡
          </div> */}
          SocialApp
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-600 transition rounded-lg px-3 py-2 hover:bg-slate-50"
          >
            <FaHome className="h-4 w-4" />
            <span className="hidden sm:block">Home</span>
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-600 transition rounded-lg px-3 py-2 hover:bg-slate-50"
          >
            <FaSearch className="h-4 w-4" />
            <span className="hidden sm:block">Search</span>
          </Link>

          <Link
            to="/notifications"
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-600 transition rounded-lg px-3 py-2 hover:bg-slate-50"
          >
            <FaBell className="h-4 w-4" />
            <span className="hidden sm:block">Notifications</span>
          </Link>

          <div className="h-6 w-px bg-slate-200" />

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-sky-600 transition rounded-lg py-2"
          >
            <span className="hidden sm:block">{user?.username}</span>
            <FaUserCircle className="h-5 w-5" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-slate-700 hover:text-red-600 transition rounded-lg px-3 py-2 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
