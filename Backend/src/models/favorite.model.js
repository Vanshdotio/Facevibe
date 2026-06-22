const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  title: {
    type: String,
    required: [true, "Song title is required"],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, "Artist is required"],
    trim: true,
  },
  coverImage: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
