import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFeedPosts } from "../features/post/postService";
import PostList from "../features/post/PostList";
import CreatePostModal from "../features/post/CreatePostModal";
import { ScaleButton, PostSkeleton, EmptyState } from "../components/UI";
import { useToast } from "../context/ToastContext";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getFeedPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        addToast("Failed to load posts", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [addToast]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    addToast("Post created successfully!", "success");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ScaleButton
          onClick={() => setIsOpen(true)}
          className="mb-6 w-full bg-white border border-slate-200 p-4 rounded-2xl text-left text-slate-500 hover:bg-slate-50 transition"
        >
          What's on your mind?
        </ScaleButton>
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No posts yet"
          description="Be the first to share something with your community!"
          action={
            <ScaleButton
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700"
            >
              Create Your First Post
            </ScaleButton>
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PostList posts={posts} />
        </motion.div>
      )}

      <CreatePostModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default Home;
