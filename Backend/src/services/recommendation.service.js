const moodSongs = {
  happy: [
    "Blinding Lights",
    "Levitating",
    "Sunflower"
  ],
  sad: [
    "Someone Like You",
    "Fix You"
  ],
  calm: [
    "Yellow",
    "Perfect"
  ],
  angry: [
    "In the End",
    "Chop Suey!",
    "Bulls on Parade"
  ],
  excited: [
    "Can't Stop the Feeling!",
    "Uptown Funk",
    "Don't Stop Me Now"
  ],
  romantic: [
    "Thinking Out Loud",
    "All of Me",
    "Make You Feel My Love"
  ],
  neutral: [
    "Closer",
    "Shape of You",
    "Something Just Like This"
  ]
};

/**
 * Retrieves track titles mapped to a specific mood.
 * 
 * @param {string} mood - The current mood keyword
 * @returns {string[]} Mapped track names
 */
const getRecommendedSongTitles = (mood) => {
  const normalized = mood ? mood.toLowerCase().trim() : "neutral";
  return moodSongs[normalized] || moodSongs["neutral"];
};

module.exports = { getRecommendedSongTitles };
