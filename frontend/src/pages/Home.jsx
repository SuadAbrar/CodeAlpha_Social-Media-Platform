import { useState } from "react";
import PostList from "../features/post/PostList";
import CreatePostModal from "../features/post/CreatePostModal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 w-full bg-white border border-slate-200 p-4 rounded-2xl text-left text-slate-500 hover:bg-slate-50 cursor-pointer transition"
      >
        What's on your mind?
      </button>
      <PostList />
      <CreatePostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Home;
