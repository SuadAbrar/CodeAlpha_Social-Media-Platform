import Post from "../models/Post.js";
import User from "../models/User.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    if (!content && !image) {
      return res.status(400).json({ message: "Content or image is required" });
    }

    const post = await Post.create({
      user: req.user._id,
      content,
      image,
    });

    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get feed (following users + own posts)
// @desc    Get feed posts
// @route   GET /api/posts/feed
// @access  Private

export const getFeedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user._id);

    const following = user.following;

    const posts = await Post.find({
      user: { $in: [...following, req.user._id] },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profilePicture");

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
