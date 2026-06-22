const express = require("express");
const {
  recommend,
  getDetails,
  playTrack,
  addFavorite,
  getFavorites,
  deleteFavorite
} = require("../controllers/song.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Protected song and favorites routes
router.get("/songs/recommend", protect, recommend);
router.get("/song/details", protect, getDetails);
router.get("/play", protect, playTrack);

router.post("/favorites", protect, addFavorite);
router.get("/favorites", protect, getFavorites);
router.delete("/favorites/:id", protect, deleteFavorite);

module.exports = router;
