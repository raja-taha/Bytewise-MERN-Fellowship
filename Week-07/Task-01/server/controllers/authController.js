const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createError = require("../utils/appError");

// Register User
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new createError("User already exists", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Assign JWT
    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "30d",
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
    }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError("User not found", 404));
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new createError("Invalid password", 401));
    }

    const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "30d",
    });

    res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
      });
  } catch (error) {
    next(error);
  }
};
