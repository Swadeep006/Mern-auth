import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide both email and password");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid password");
    }
    generateToken(res, user._id);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Registration attempt for email:", email);

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("User already exists:", email);
    res.status(400);
    throw new Error("User already exists");
  }

  try {
    console.log("Creating new user:", email);
    const user = await User.create({
      name,
      email,
      password,
    });

    console.log("User created successfully:", !!user);

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Debug route to check user and password
// @route   GET /api/users/debug/:email
// @access  Development only (remove in production)
const debugUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json({
    exists: !!user,
    passwordLength: user ? user.password.length : 0,
    isHashed: user ? user.password.startsWith("$2") : false,
    email: user ? user.email : null,
  });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  debugUser,
};
