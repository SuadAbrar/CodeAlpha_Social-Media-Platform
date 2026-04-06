import PostList from "../features/post/PostList";

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-6 text-center">Home Feed</h1> */}
      <PostList />
    </div>
  );
};

export default Home;
