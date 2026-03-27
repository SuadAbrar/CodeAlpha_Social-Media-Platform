import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  // Check if JWT_SECRET is configured
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
    return res.status(500).json({ message: "Server configuration error" });
  }

  const authHeader = req.headers.authorization;

  // Check for Authorization header and Bearer token format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.substring(7);

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database and exclude password
    const user = await User.findById(decoded.id).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access denied. Token expired." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    } else {
      // Log unexpected errors for monitoring
      console.error("JWT verification error:", error);
      return res
        .status(401)
        .json({ message: "Access denied. Token verification failed." });
    }
  }
};

export default authMiddleware;
