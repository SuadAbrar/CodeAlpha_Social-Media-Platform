import { useState } from "react";
import { toggleLikePost } from "./postService.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(
    post.likesCount || post.likes?.length || 0,
  );

  const handleLike = async () => {
    // store previous state (for rollback)
    const prevLiked = isLiked;

    // 🔥 optimistic update
    setIsLiked(!prevLiked);
    setLikesCount((prev) => prev + (isLiked ? -1 : 1));

    try {
      await toggleLikePost(post._id);
    } catch (error) {
      console.error("Error toggling like:", error);
      setIsLiked(prevLiked); // rollback
      setLikesCount((prev) => prev + (isLiked ? 1 : -1));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 transition hover:shadow-md">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
          {post.user?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {post.user?.username}
          </p>
          <p className="text-xs text-slate-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="rounded-2xl mb-4 w-full object-cover max-h-100"
        />
      )}

      {/* Content */}
      {post.content && (
        <p className="text-sm text-slate-800 mb-4 leading-relaxed">
          {post.content}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-slate-600">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition transform active:scale-90 ${
            isLiked ? "text-red-500" : "text-slate-600"
          }`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
          <span className="text-sm">{likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
