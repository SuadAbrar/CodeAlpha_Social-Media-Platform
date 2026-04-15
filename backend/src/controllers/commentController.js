import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const sendSuccess = (res, data, message, pagination, status = 200) => {
  const payload = { success: true, data };
  if (message) payload.message = message;
  if (pagination) payload.pagination = pagination;
  return res.status(status).json(payload);
};

const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// @desc    Create a new comment
// @route   POST /api/comments/
// @access  Private
export const addComment = async (req, res) => {
  try {
    const { postId, text, parentCommentId } = req.body;

    if (!text || !text.trim()) {
      return sendError(res, 400, "Post ID and comment text are required");
    }

    const post = await Post.findById(postId);
    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    const comment = await Comment.create({
      user: req.user._id,
      post: postId,
      text: text.trim(),
      parentComment: parentCommentId || null,
    });

    const populatedComment = await comment.populate("user", "username profilePicture");

    return sendSuccess(res, populatedComment, "Comment added successfully", null, 201);
  } catch (error) {
    console.error("Error adding comment:", error);
    return sendError(res, 500, "Server error while adding comment");
  }
};

// get comments for a specific post with pagination
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [total, comments] = await Promise.all([
      Comment.countDocuments({ post: postId }),
      Comment.find({ post: postId, parentComment: null })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profilePicture")
        .lean(),
    ]);

    return sendSuccess(res, comments, "comments fetched successfully", {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return sendError(res, 500, "Server error while fetching comments");
  }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendError(res, 404, "Comment not found");
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "Unauthorized to delete this comment");
    }

    await comment.deleteOne();
    return sendSuccess(res, null, "Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    return sendError(res, 500, "Server error while deleting comment");
  }
};
