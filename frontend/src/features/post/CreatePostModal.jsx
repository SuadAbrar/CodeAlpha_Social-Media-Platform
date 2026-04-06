import { useState } from "react";
import { createPost } from "./postService";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPost = await createPost({ content, image });
      onPostCreated(newPost);
      onClose();
      setContent("");
      setImage("");
    } catch (error) {
      console.error("Create post failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full text-slate-700 max-w-md shadow-sm transition hover:shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition duration-300 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
          />

          <button className="w-full bg-slate-700 text-white py-3 rounded-2xl hover:bg-sky-600 transition">
            Post
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-slate-700 bg-slate-200 hover:text-red-600 transition rounded-lg px-3 py-2 hover:bg-red-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
