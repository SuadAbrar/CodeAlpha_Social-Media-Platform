import { useEffect, useState } from "react";
import { getFeedPosts } from "../features/post/postService";
import PostList from "../features/post/PostList";
import CreatePostModal from "../features/post/CreatePostModal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getFeedPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <button
        onClick={() => setIsOpen(true)}
        className="mb-6 w-full bg-white border border-slate-200 p-4 rounded-2xl text-left text-slate-500 hover:bg-slate-50 cursor-pointer transition"
      >
        What's on your mind?
      </button>
      <PostList posts={posts} />
      <CreatePostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Home;
