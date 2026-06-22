const mongoose = require("mongoose");

const scanHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  mood: {
    type: String,
    required: [true, "Mood is required"],
    lowercase: true,
    trim: true,
  },
  confidence: {
    type: Number,
    required: [true, "Confidence score is required"],
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScanHistory = mongoose.model("ScanHistory", scanHistorySchema);
module.exports = ScanHistory;
