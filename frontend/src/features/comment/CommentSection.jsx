import { useState, useEffect } from "react";
import { getCommentsByPost, addComment } from "./commentService.js";

const CommentInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      <button className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 cursor-pointer">
        Post
      </button>
    </form>
  );
};

const CommentList = ({ comments }) => {
  if (!comments.length) {
    return (
      <p className="text-sm text-slate-400 text-center py-2">
        No comments yet. Be the first
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {comments.map((c) => (
        <div key={c._id} className="bg-slate-50 px-4 py-2 rounded-xl text-sm">
          <span className="font-semibold text-slate-800 mr-2">
            {c.user?.username || "User"}
          </span>
          <span className="text-slate-600">{c.text}</span>
        </div>
      ))}
    </div>
  );
};

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchComments();
  }, [show, postId]);

  const handleAddComment = async (text) => {
    try {
      const newComment = await addComment(postId, text);
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShow(!show)}
        className="text-sm text-sky-600 hover:text-sky-700 transition"
      >
        {show ? "Hide comments" : "View comments"}
      </button>

      {show && (
        <div className="mt-3 space-y-3">
          <CommentInput onAdd={handleAddComment} />

          {loading ? (
            <p className="text-sm text-slate-400">Loading comments...</p>
          ) : (
            <CommentList comments={comments} />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
