import API from "../../services/api.js";

export const getFeedPosts = async (data) => {
  const response = await API.get("/posts/feed", data);
  return response.data.data;
};

export const toogleLikePost = async (postId) => {
  const response = await API.post(`/posts/like/${postId}`);
  return response.data.data;
};

export const createPost = async (data) => {
  const response = await API.post("/posts", data);
  return response.data.data;
};
