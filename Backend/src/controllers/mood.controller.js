const supportedMoods = ["happy", "sad", "angry", "calm", "excited", "romantic", "neutral"];

/**
 * Analyzes and validates user-submitted mood
 * POST /api/mood/analyze
 */
const analyze = async (req, res, next) => {
  const { mood } = req.body;

  try {
    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood field is required." });
    }

    const normalizedMood = mood.toLowerCase().trim();

    if (!supportedMoods.includes(normalizedMood)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported mood. Supported moods are: ${supportedMoods.join(", ")}`
      });
    }

    // Generate simulated high-accuracy confidence score (between 82 and 98)
    const confidence = Math.floor(Math.random() * (98 - 82 + 1)) + 82;

    return res.status(200).json({
      success: true,
      mood: normalizedMood,
      confidence
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyze };
