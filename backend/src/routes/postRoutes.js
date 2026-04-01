import express from "express";
import {
  createPost,
  getFeedPosts,
  getPostById,
  updatePost,
  getUserPosts,
  toggleLikePost,
  deletePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/feed", authMiddleware, getFeedPosts);
router.get("/:postId", authMiddleware, getPostById);
router.put("/:postId", authMiddleware, updatePost);
router.get("/user/:userId", authMiddleware, getUserPosts);
router.post("/like/:postId", authMiddleware, toggleLikePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;
