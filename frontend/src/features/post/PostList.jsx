import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  const isEmpty = posts.length === 0;

  if (isEmpty) {
    return (
      <div className="text-center text-slate-500 mt-10">No posts to show.</div>
    );
  }
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
