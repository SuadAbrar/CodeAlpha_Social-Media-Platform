import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Password hashing is handled by the User model's pre-save hook
    const user = await User.create({
      username,
      email,
      password, // Plain password; will be hashed by the model
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    // Handle duplicate key errors gracefully
    if (error.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

// login user
// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Use the model's comparePassword method
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout user
// @desc    Invalidate user session client side
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = (req, res) => {
  // With stateless JWT, logout is handled by client token removal.
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
