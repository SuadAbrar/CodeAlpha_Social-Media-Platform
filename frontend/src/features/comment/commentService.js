import API from "../../services/api.js";

export const getCommentsByPost = async (postId) => {
  const response = await API.get(`/comments/post/${postId}`);
  return response.data.data;
};

export const addComment = async (postId, text) => {
  const response = await API.post(`/comments`, { postId, text });
  return response.data.data;
};
