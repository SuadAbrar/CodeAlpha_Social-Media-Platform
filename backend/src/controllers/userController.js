import User from "../models/User.js";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
const URL_REGEX = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/\S*)?$/i;
const MAX_BIO_LENGTH = 250;
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const sendSuccess = (res, data, message, pagination) => {
  const payload = { success: true, data };
  if (message) payload.message = message;
  if (pagination) payload.pagination = pagination;
  return res.status(200).json(payload);
};

const sendError = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

const parsePagination = (req) => {
  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  return { page: Math.max(1, page), limit: Math.max(1, limit) };
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(res, user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return sendError(res, 500, "Server error while fetching profile");
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const isFollowing = Boolean(
      req.user?.following?.some(
        (followedId) => followedId.toString() === user._id.toString(),
      ),
    );
    return sendSuccess(res, {
      id: user._id,
      username: user.username,
      bio: user.bio || "",
      profilePicture: user.profilePicture || "",
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
      isFollowing,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return sendError(res, 500, "Server error while fetching user profile");
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { username, bio, profilePicture } = req.body;

    if (username && !USERNAME_REGEX.test(username)) {
      return sendError(
        res,
        400,
        "Invalid username; allow letters, numbers, underscore, 3-30 chars",
      );
    }

    if (bio && bio.length > MAX_BIO_LENGTH) {
      return sendError(res, 400, `Bio must be <= ${MAX_BIO_LENGTH} characters`);
    }

    if (profilePicture && !URL_REGEX.test(profilePicture)) {
      return sendError(res, 400, "Invalid profilePicture URL format");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return sendError(res, 400, "Username already taken");
      }
      user.username = username;
    }

    if (bio !== undefined) user.bio = bio;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;

    const updatedUser = await user.save();

    return sendSuccess(res, updatedUser, "Profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
    return sendError(res, 500, "Server error while updating profile");
  }
};

// Follow/unfollow user
export const toggleFollowUser = async (req, res) => {
  try {
    const { id: targetUserId } = req.params;
    const currentUserId = req.user._id.toString();

    if (!targetUserId || targetUserId === currentUserId) {
      return sendError(res, 400, "Cannot follow/unfollow yourself");
    }

    const [targetUser, currentUser] = await Promise.all([
      User.findById(targetUserId),
      User.findById(currentUserId),
    ]);

    if (!targetUser || !currentUser) {
      return sendError(res, 404, "User not found");
    }

    const isFollowing = currentUser.following.some(
      (followedId) => followedId.toString() === targetUserId.toString(),
    );

    if (isFollowing) {
      await Promise.all([
        User.findByIdAndUpdate(currentUserId, {
          $pull: { following: targetUserId },
        }),
        User.findByIdAndUpdate(targetUserId, {
          $pull: { followers: currentUserId },
        }),
      ]);
      return sendSuccess(res, null, "Unfollowed user");
    }

    await Promise.all([
      User.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId },
      }),
      User.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId },
      }),
    ]);
    return sendSuccess(res, null, "Followed user");
  } catch (error) {
    console.error("Error toggling follow status:", error);
    return sendError(res, 500, "Server error while toggling follow status");
  }
};

// Get followers list
export const getFollowers = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req);

    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const total = user.followers?.length || 0;
    const skip = (page - 1) * limit;

    const followers = await User.find({ _id: { $in: user.followers || [] } })
      .select("username profilePicture")
      .skip(skip)
      .limit(limit);

    return sendSuccess(res, followers, "Followers list retrieved", {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching followers:", error);
    return sendError(res, 500, "Server error while fetching followers");
  }
};

// Get following list
export const getFollowing = async (req, res) => {
  try {
    const { page, limit } = parsePagination(req);

    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const total = user.following?.length || 0;
    const skip = (page - 1) * limit;

    const following = await User.find({ _id: { $in: user.following || [] } })
      .select("username profilePicture")
      .skip(skip)
      .limit(limit);

    return sendSuccess(res, following, "Following list retrieved", {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching following:", error);
    return sendError(res, 500, "Server error while fetching following");
  }
};

// Search users by username
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || typeof query !== "string" || !query.trim()) {
      return sendError(res, 400, "Query parameter is required");
    }

    const users = await User.find({
      username: { $regex: query.trim(), $options: "i" },
    }).select("username profilePicture");

    return sendSuccess(res, users);
  } catch (error) {
    console.error("Error searching users:", error);
    return sendError(res, 500, "Server error while searching users");
  }
};
