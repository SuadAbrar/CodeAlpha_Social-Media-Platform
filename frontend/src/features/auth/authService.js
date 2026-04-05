import API from "../../services/api.js";

// Register user
export const register = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// Login user
export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
