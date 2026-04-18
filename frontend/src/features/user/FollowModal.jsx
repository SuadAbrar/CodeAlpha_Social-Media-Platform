import { useEffect } from "react";
import { Link } from "react-router-dom";

const FollowModal = ({
  isOpen,
  onClose,
  title,
  users = [],
  loading,
  currentUser,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const renderBody = () => {
    if (loading) {
      return (
        <div className="py-12 text-center text-slate-500">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-slate-200 border-t-sky-600 animate-spin" />
          Loading users...
        </div>
      );
    }

    if (!users.length) {
      return (
        <div className="py-12 text-center text-slate-500">No users found.</div>
      );
    }

    return (
      <div className="space-y-2 max-h-90 overflow-y-auto pr-1">
        {users.map((user) => {
          const isCurrent = currentUser?._id === user._id;
          const isFollowed = currentUser?.following?.some(
            (followedId) => followedId.toString() === user._id.toString(),
          );

          return (
            <Link
              key={user._id}
              to={`/profile/${user._id}`}
              className="group flex items-center justify-between gap-4 rounded-3xl bg-slate-50 px-4 py-3 transition hover:bg-slate-100"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-linear-to-br from-sky-400 to-slate-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-slate-900">{user.username}</p>
                </div>
              </div>
              {!isCurrent && currentUser?.following ? (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    isFollowed
                      ? "bg-slate-100 text-slate-700"
                      : "bg-sky-600 text-white"
                  }`}
                >
                  {isFollowed ? "Following" : "Follow"}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden transform transition duration-300 ease-out scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">
              {users.length} user{users.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="px-4 pb-4">{renderBody()}</div>
      </div>
    </div>
  );
};

export default FollowModal;
