const express = require("express");
const { addHistory, getHistory, deleteHistory } = require("../controllers/history.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Protected user scan logs routes
router.post("/", protect, addHistory);
router.get("/", protect, getHistory);
router.delete("/:id", protect, deleteHistory);

module.exports = router;
