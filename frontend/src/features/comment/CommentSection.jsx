import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCommentsByPost, addComment } from "./commentService.js";
import { ScaleButton, CommentSkeleton, EmptyState } from "../../components/UI";
import { useToast } from "../../context/ToastContext";

const CommentInput = ({ onAdd, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    onAdd(text);
    setText("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
      />
      <ScaleButton
        type="submit"
        disabled={!text.trim() || loading}
        className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 disabled:bg-slate-400"
      >
        {loading ? "..." : "Post"}
      </ScaleButton>
    </motion.form>
  );
};

const CommentList = ({ comments, loading }) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!comments.length) {
    return (
      <EmptyState
        icon="💬"
        title="No comments yet"
        description="Be the first to share your thoughts!"
        className="py-6"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      {comments.map((c, index) => (
        <motion.div
          key={c._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-slate-50 px-4 py-3 rounded-xl text-sm hover:bg-slate-100 transition"
        >
          <span className="font-semibold text-slate-800 mr-2">
            {c.user?.username || "User"}
          </span>
          <span className="text-slate-600">{c.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const { addToast } = useToast();

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      addToast("Failed to load comments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchComments();
  }, [show, postId]);

  const handleAddComment = async (text) => {
    setAddingComment(true);
    try {
      const newComment = await addComment(postId, text);
      setComments((prev) => [newComment, ...prev]);
      addToast("Comment added!", "success");
    } catch (error) {
      console.error("Error adding comment:", error);
      addToast("Failed to add comment", "error");
    } finally {
      setAddingComment(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      <ScaleButton
        onClick={() => setShow(!show)}
        className="text-sm text-sky-600 hover:text-sky-700 transition"
      >
        {show ? "Hide comments" : `View comments (${comments.length})`}
      </ScaleButton>

      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 space-y-3 overflow-hidden"
        >
          <CommentInput onAdd={handleAddComment} loading={addingComment} />
          <CommentList comments={comments} loading={loading} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CommentSection;
