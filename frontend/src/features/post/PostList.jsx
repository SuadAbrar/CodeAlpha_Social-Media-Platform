import { useState } from "react";
import { motion } from "framer-motion";
import { toggleLikePost } from "./postService.js";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentSection from "../comment/CommentSection";
import { useAuth } from "../../context/AuthContext";
import { ScaleButton } from "../../components/UI";
import { useToast } from "../../context/ToastContext";

export const PostCard = ({ post, index = 0 }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(
    post.likesCount || post.likes?.length || 0,
  );
  const [isLiking, setIsLiking] = useState(false);

  const isOwnPost = user && post.user?._id === user._id;

  const handleLike = async () => {
    if (isOwnPost || isLiking) return;

    setIsLiking(true);
    const prevLiked = isLiked;

    // optimistic update
    setIsLiked(!prevLiked);
    setLikesCount((prev) => prev + (isLiked ? -1 : 1));

    try {
      await toggleLikePost(post._id);
    } catch (error) {
      console.error("Error toggling like:", error);
      addToast("Failed to like post", "error");
      setIsLiked(prevLiked);
      setLikesCount((prev) => prev + (isLiked ? 1 : -1));
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 transition hover:shadow-md"
    >
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-linear-to-br from-sky-400 to-slate-600 flex items-center justify-center text-sm font-semibold text-white shadow-lg">
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
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          src={post.image}
          alt="post"
          className="rounded-2xl mb-4 w-full object-cover max-h-100"
        />
      )}

      {/* Content */}
      {post.content && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm text-slate-800 mb-4 leading-relaxed"
        >
          {post.content}
        </motion.p>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex items-center gap-6 text-slate-600 mb-4"
      >
        <ScaleButton
          onClick={handleLike}
          disabled={isOwnPost || isLiking}
          className={`flex items-center gap-2 transition ${
            isLiked ? "text-red-500" : "text-slate-600"
          } ${isOwnPost ? "cursor-not-allowed opacity-50" : "hover:text-red-500"}`}
        >
          <motion.div
            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </motion.div>
          <span className="text-sm">{likesCount}</span>
        </ScaleButton>
      </motion.div>

      <CommentSection postId={post._id} />
    </motion.div>
  );
};

const PostList = ({ posts }) => {
  const isEmpty = posts.length === 0;

  if (isEmpty) {
    return (
      <div className="text-center text-slate-500 mt-10">No posts to show.</div>
    );
  }
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostCard key={post._id} post={post} index={index} />
      ))}
    </div>
  );
};

export default PostList;
