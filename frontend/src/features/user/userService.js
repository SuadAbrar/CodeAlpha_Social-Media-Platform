import API from "../../services/api.js";

export const getUserProfile = async (userId) => {
  const res = await API.get(`/users/${userId}`);
  return res.data.data;
};

export const toggleFollowUser = async (userId) => {
  const res = await API.post(`/users/${userId}/follow`);
  return res.data.data;
};

export const getUserPosts = async (userId) => {
  const res = await API.get(`/posts/user/${userId}`);
  return res.data.data;
};
