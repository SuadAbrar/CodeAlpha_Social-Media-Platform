import API from "../../services/api.js";

export const getMe = async () => {
  const res = await API.get("/users/me");
  return res.data.data;
};

export const getUserProfile = async (userId) => {
  const res = await API.get(`/users/${userId}`);
  return res.data.data;
};

export const searchUsers = async (query) => {
  const res = await API.get(`/users/search?query=${encodeURIComponent(query)}`);
  return res.data.data;
};

export const toggleFollowUser = async (userId) => {
  const res = await API.post(`/users/${userId}/follow`);
  return res.data.data;
};

export const getFollowers = async (userId, page = 1, limit = 50) => {
  const res = await API.get(
    `/users/${userId}/followers?page=${page}&limit=${limit}`,
  );
  return res.data.data;
};

export const getFollowing = async (userId, page = 1, limit = 50) => {
  const res = await API.get(
    `/users/${userId}/following?page=${page}&limit=${limit}`,
  );
  return res.data.data;
};

export const getUserPosts = async (userId) => {
  const res = await API.get(`/posts/user/${userId}`);
  return res.data.data;
};
