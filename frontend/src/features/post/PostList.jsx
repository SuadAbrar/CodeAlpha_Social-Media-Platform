import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { getFeedPosts } from "./postService.js";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getFeedPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-500">Loading posts...</p>;
  } else if (posts.length === 0) {
    return <p className="text-center text-slate-500">No posts to show.</p>;
  } else {
    return (
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  }
};

export default PostList;
