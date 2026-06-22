const express = require("express");
const { register, login, profile, logout } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Registration endpoints (supporting both /api/auth/register and /api/auth/user/register)
router.post("/register", register);
router.post("/user/register", register);

// Login endpoints (supporting both /api/auth/login and /api/auth/user/login)
router.post("/login", login);
router.post("/user/login", login);

// Profile/Get Current User endpoints (supporting both /api/auth/profile and /api/auth/user/me)
router.get("/profile", protect, profile);
router.get("/user/me", protect, profile);

// Logout endpoints (no auth required – client clears its own token)
router.post("/logout", logout);
router.post("/user/logout", logout);
router.get("/logout", logout);
router.get("/user/logout", logout);

module.exports = router;
