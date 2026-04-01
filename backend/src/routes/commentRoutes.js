import express from "express";
import {
  addComment,
  getCommentsByPost,
  deleteComment,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/post/:postId", getCommentsByPost);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
