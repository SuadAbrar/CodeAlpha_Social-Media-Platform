import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { searchUsers } from "../features/user/userService.js";
import { getExplorePosts } from "../features/post/postService.js";
import { PostCard } from "../features/post/PostList.jsx";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        const posts = await getExplorePosts();
        setExplorePosts(posts);
      } catch (error) {
        console.error("Error fetching explore posts:", error);
      }
    };

    fetchExplorePosts();
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setActiveTab("explore");
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const users = await searchUsers(searchQuery.trim());
        setSearchResults(users);
        setActiveTab("search");
      } catch (error) {
        console.error("Error searching users:", error);
      } finally {
        setLoading(false);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const users = await searchUsers(searchQuery.trim());
      setSearchResults(users);
      setActiveTab("search");
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Form */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-3xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-sky-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("explore")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
            activeTab === "explore"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Explore
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
            activeTab === "search"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Search Results
        </button>
      </div>

      {/* Content */}
      {activeTab === "explore" && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Discover New Posts
            </h2>
            <p className="text-slate-600">
              See what's happening from users around the world
            </p>
          </div>

          {explorePosts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
              <p className="text-slate-500">No posts to explore yet</p>
            </div>
          ) : (
            explorePosts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      )}

      {activeTab === "search" && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Search Results
            </h2>
            <p className="text-slate-600">
              {searchResults.length > 0
                ? `Found ${searchResults.length} user${searchResults.length === 1 ? "" : "s"}`
                : "No users found"}
            </p>
          </div>

          {searchResults.length === 0 && searchQuery && !loading ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
              <p className="text-slate-500">
                No users found for "{searchQuery}"
              </p>
            </div>
          ) : (
            searchResults.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-sky-400 to-slate-600 flex items-center justify-center text-white font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {user.username}
                    </h3>
                  </div>

                  <Link
                    to={`/profile/${user._id}`}
                    className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition flex items-center gap-2"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
