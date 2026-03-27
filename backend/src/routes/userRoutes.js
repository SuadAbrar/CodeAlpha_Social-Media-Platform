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
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.get("/me", authMiddleware, getMe);
router.put("/update", authMiddleware, updateUserProfile);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);
router.get("/search", searchUsers);
router.post("/:id/follow", authMiddleware, toggleFollowUser);

export default router;
