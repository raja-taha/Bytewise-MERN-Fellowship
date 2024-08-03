const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const readUser = async (req, res) => {
  try {
    // Get the user ID from the request object
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email || !req.file) {
    return res
      .status(400)
      .json({ message: "Missing username, password, email, or image" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      image: req.file.path,
    });

    res.status(201).json({
      id: user._id,
      username,
      email,
      image: user.image,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid user data", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;

  try {
    const updates = { username, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid user data", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({
        _id: user._id,
        name: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid user data", error: error.message });
  }
};

module.exports = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
