import jwt from "jsonwebtoken";
import User from "../models/User.js";

const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.substring(7);

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }
  } catch (error) {
    console.warn("Optional auth token invalid or expired:", error.message);
  }

  return next();
};

export default optionalAuthMiddleware;
