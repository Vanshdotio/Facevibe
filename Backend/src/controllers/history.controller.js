const ScanHistory = require("../models/scan_history.model");

/**
 * Adds a new scan history log
 * POST /api/history
 */
const addHistory = async (req, res, next) => {
  const { mood, confidence } = req.body;

  try {
    if (!mood || confidence === undefined) {
      return res.status(400).json({ success: false, message: "Mood and confidence rating are required." });
    }

    const scan = await ScanHistory.create({
      userId: req.user._id,
      mood: mood.toLowerCase().trim(),
      confidence: Number(confidence)
    });

    return res.status(201).json({
      success: true,
      scan
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gets scan history logs for current user
 * GET /api/history
 */
const getHistory = async (req, res, next) => {
  try {
    const history = await ScanHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: history.length,
      history
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a scan history log by ID
 * DELETE /api/history/:id
 */
const deleteHistory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedScan = await ScanHistory.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!deletedScan) {
      return res.status(404).json({ success: false, message: "Scan log not found or unauthorized." });
    }

    return res.status(200).json({
      success: true,
      message: "Scan history record deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addHistory,
  getHistory,
  deleteHistory
};
