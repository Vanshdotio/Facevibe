const express = require("express");
const { analyze } = require("../controllers/mood.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Protected route for analyzing face/mood query
router.post("/analyze", protect, analyze);

module.exports = router;
