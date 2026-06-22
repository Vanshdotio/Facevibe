const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Email syntax validation helper
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password requirements check helper
const checkPasswordStrength = (pwd) => {
  if (!pwd || pwd.length < 8) return false;
  if (!/[A-Z]/.test(pwd)) return false;
  if (!/[a-z]/.test(pwd)) return false;
  if (!/[0-9]/.test(pwd)) return false;
  if (!/[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(pwd)) return false;
  return true;
};

async function userRegister(req, res) {
  let { fullName, email, password } = req.body;

  // Trim whitespace
  fullName = fullName ? fullName.trim() : "";
  email = email ? email.trim() : "";

  // Server-side validations
  if (!fullName) {
    return res.status(400).json({ message: "Full name is required." });
  }

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (!password || !checkPasswordStrength(password)) {
    return res.status(400).json({ 
      message: "Password does not meet strength requirements (must contain 8+ characters, uppercase, lowercase, digit, and special character)." 
    });
  }

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "This email is already registered."
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword
  });

  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  });
}

async function userLogin(req, res) {
  let { email, password } = req.body;

  // Trim email
  email = email ? email.trim() : "";

  // Server-side validations
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  // Fixed token payload to match register token payload (signing with id)
  const token = jwt.sign({
    id: user._id
  }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName
    }
  });
}

function userLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully"
  });
}

async function profile(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "User not logged in"
    });
  }
  res.status(200).json({
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email
    }
  });
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  register: userRegister,
  login: userLogin,
  logout: userLogout,
  profile
};