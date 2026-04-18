import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getFollowers,
  getFollowing,
  getMe,
  searchUsers,
  toggleFollowUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.middleware.js";
import optionalAuthMiddleware from "../middleware/optionalAuth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/search", searchUsers);
router.put("/update", authMiddleware, updateUserProfile);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);
router.get("/:id", optionalAuthMiddleware, getUserProfile);
router.post("/:id/follow", authMiddleware, toggleFollowUser);

export default router;
