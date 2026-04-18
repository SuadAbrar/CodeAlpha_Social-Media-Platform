import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getUserProfile,
  toggleFollowUser,
  getUserPosts,
  getMe,
  getFollowers,
  getFollowing,
} from "../features/user/userService.js";
import { useAuth } from "../context/AuthContext.jsx";
import { PostCard } from "../features/post/PostList.jsx";
import FollowModal from "../features/user/FollowModal.jsx";
import { ProfileSkeleton, EmptyState, ScaleButton } from "../components/UI";
import { useToast } from "../context/ToastContext";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser, setUser: setCurrentUser } = useAuth();
  const { addToast } = useToast();

  const [user, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("followers");
  const [modalLoading, setModalLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followingLoading, setFollowingLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile(id);
        const postsData = await getUserPosts(id);

        setUserProfile(userData);
        setPosts(postsData);
        setIsFollowing(Boolean(userData.isFollowing));
      } catch (error) {
        console.error("Error fetching profile:", error);
        addToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, addToast]);

  const openFollowModal = async (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setModalLoading(true);

    try {
      const users =
        type === "followers" ? await getFollowers(id) : await getFollowing(id);
      if (type === "followers") {
        setFollowers(users);
      } else {
        setFollowing(users);
      }
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      addToast(`Failed to load ${type}`, "error");
      if (type === "followers") setFollowers([]);
      else setFollowing([]);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFollow = async () => {
    if (followingLoading) return;

    setFollowingLoading(true);
    const prevFollowing = isFollowing;
    setIsFollowing((prev) => !prev);

    try {
      await toggleFollowUser(id);
      const [updatedUserData, updatedCurrentUserData] = await Promise.all([
        getUserProfile(id),
        getMe(),
      ]);
      setUserProfile(updatedUserData);
      setIsFollowing(updatedUserData.isFollowing);
      setCurrentUser(updatedCurrentUserData);
      addToast(
        updatedUserData.isFollowing ? "Followed user!" : "Unfollowed user",
        "success",
      );
    } catch (error) {
      console.error(error);
      setIsFollowing(prevFollowing);
      addToast("Failed to update follow status", "error");
    } finally {
      setFollowingLoading(false);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <EmptyState
          title="User not found"
          description="The user you're looking for doesn't exist or has been deleted."
          icon="👤"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-6 shadow-sm transition duration-300 hover:shadow-md">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full bg-linear-to-br from-sky-400 to-slate-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900">
              {user.username}
            </h2>

            <div className="flex gap-4 text-sm text-slate-500 mt-2">
              <button
                type="button"
                onClick={() => openFollowModal("followers")}
                className="rounded-full px-2 py-1 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <b className="text-slate-700">{user.followersCount || 0}</b>{" "}
                Followers
              </button>
              <button
                type="button"
                onClick={() => openFollowModal("following")}
                className="rounded-full px-2 py-1 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <b className="text-slate-700">{user.followingCount || 0}</b>{" "}
                Following
              </button>
            </div>
          </div>

          <ScaleButton
            onClick={handleFollow}
            disabled={followingLoading}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition duration-300 ${
              isFollowing
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                : "bg-sky-600 text-white hover:bg-sky-700 shadow-sm"
            }`}
          >
            {followingLoading ? (
              <div className="flex items-center gap-2">
                <Loader size="sm" />
                {isFollowing ? "Unfollowing..." : "Following..."}
              </div>
            ) : isFollowing ? (
              "Following"
            ) : (
              "Follow"
            )}
          </ScaleButton>
        </div>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description="This user hasn't shared any posts yet."
            icon="📝"
          />
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>

      <FollowModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalType === "followers" ? "Followers" : "Following"}
        users={modalType === "followers" ? followers : following}
        loading={modalLoading}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Profile;
