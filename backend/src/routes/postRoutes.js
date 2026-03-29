import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/feed", authMiddleware, getPosts);
router.get("/:postId", getPostById);
router.put("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;
