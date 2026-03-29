import Post from "../models/Post.js";
import User from "../models/User.js";

const URL_REGEX = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/\S*)?$/i;
const MAX_CONTENT_LENGTH = 500;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const sendSuccess = (res, data, message, pagination, status = 200) => {
  const payload = { success: true, data };
  if (message) payload.message = message;
  if (pagination) payload.pagination = pagination;
  return res.status(status).json(payload);
};

const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

const parsePagination = (req) => {
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  return { page: Math.max(1, page), limit: Math.max(1, limit) };
};

const validatePostInput = ({ content, image }) => {
  if (
    (!content || !content.toString().trim()) &&
    (!image || !image.toString().trim())
  ) {
    return "Content or image is required";
  }

  if (content && content.toString().trim().length > MAX_CONTENT_LENGTH) {
    return `Content must be ${MAX_CONTENT_LENGTH} characters or fewer`;
  }

  if (
    image &&
    image.toString().trim() &&
    !URL_REGEX.test(image.toString().trim())
  ) {
    return "Invalid image URL format";
  }

  return null;
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const validationError = validatePostInput({ content, image });
    if (validationError) {
      return sendError(res, 400, validationError);
    }

    const post = new Post({
      user: req.user._id,
      content: content ? content.toString().trim() : "",
      image: image ? image.toString().trim() : "",
    });

    await post.save();
    return sendSuccess(res, post, "Post created successfully", null, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return sendError(res, 500, "Server error while creating post");
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:postId
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "user",
      "username profilePicture",
    );
    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    return sendSuccess(res, post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return sendError(res, 500, "Server error while fetching post");
  }
};

// @desc    Get feed posts (own + following)
// @route   GET /api/posts/feed
// @access  Private
export const getFeedPosts = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req);
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id).select("following");
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const userIds = [req.user._id, ...(user.following || [])];

    const [total, posts] = await Promise.all([
      Post.countDocuments({ user: { $in: userIds } }),
      Post.find({ user: { $in: userIds } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profilePicture"),
    ]);

    return sendSuccess(res, posts, "Feed posts retrieved", {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching feed posts:", error);
    return sendError(res, 500, "Server error while fetching feed posts");
  }
};

// @desc    Get posts by a specific user
// @route   GET /api/posts/user/:userId
// @access  Public
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, limit } = parsePagination(req);
    const skip = (page - 1) * limit;

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return sendError(res, 404, "User not found");
    }

    const [total, posts] = await Promise.all([
      Post.countDocuments({ user: userId }),
      Post.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profilePicture"),
    ]);

    return sendSuccess(res, posts, "User posts retrieved", {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return sendError(res, 500, "Server error while fetching user posts");
  }
};

// @desc    Update a post
// @route   PATCH /api/posts/:postId
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const validationError = validatePostInput({ content, image });
    if (validationError) {
      return sendError(res, 400, validationError);
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "Unauthorized to update this post");
    }

    if (content !== undefined) {
      post.content = content.toString().trim();
    }
    if (image !== undefined) {
      post.image = image.toString().trim();
    }

    const updatedPost = await post.save();
    return sendSuccess(res, updatedPost, "Post updated successfully");
  } catch (error) {
    console.error("Error updating post:", error);
    return sendError(res, 500, "Server error while updating post");
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:postId
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return sendError(res, 404, "Post not found");
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "Unauthorized to delete this post");
    }

    await post.remove();
    return sendSuccess(res, null, "Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    return sendError(res, 500, "Server error while deleting post");
  }
};
