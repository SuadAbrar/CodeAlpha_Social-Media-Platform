import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  toggleFollowUser,
  getUserPosts,
} from "../features/user/userService.js";
import { PostCard } from "../features/post/PostList.jsx";

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserProfile(id);
      const postsData = await getUserPosts(id);

      setUser(userData);
      setPosts(postsData);
      setIsFollowing(userData.isFollowing);
    };

    fetchData();
  }, [id]);

  const handleFollow = async () => {
    setIsFollowing((prev) => !prev);

    try {
      await toggleFollowUser(id);
    } catch (error) {
      console.error(error);
      setIsFollowing((prev) => !prev); // rollback
    }
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm animate-pulse">
          <div className="flex items-center gap-5">
            <div className="h-20 w-20 rounded-full bg-slate-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-slate-200 rounded w-32"></div>
              <div className="h-4 bg-slate-200 rounded w-48"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded-xl w-20"></div>
          </div>
        </div>
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

            <div className="flex gap-6 text-sm text-slate-500 mt-2">
              <span>
                <b className="text-slate-700">{user.followers?.length || 0}</b>{" "}
                Followers
              </span>
              <span>
                <b className="text-slate-700">{user.following?.length || 0}</b>{" "}
                Following
              </span>
            </div>
          </div>

          <button
            onClick={handleFollow}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition duration-300 active:scale-95 ${
              isFollowing
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                : "bg-sky-600 text-white hover:bg-sky-700 shadow-sm"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
            <p className="text-slate-500">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Profile;
