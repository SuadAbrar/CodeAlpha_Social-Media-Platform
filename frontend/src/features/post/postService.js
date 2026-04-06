import API from "../../services/api.js";

export const getFeedPosts = async (data) => {
  const response = await API.get("/posts/feed", data);
  return response.data.data;
};
