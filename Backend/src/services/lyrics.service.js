const axios = require("axios");

/**
 * Fetches lyrics from Lyrics.ovh API.
 * Falls back to "Lyrics not found." on error or empty results.
 * 
 * @param {string} artist - Artist name
 * @param {string} title - Song title
 * @returns {Promise<string>} Song lyrics or fallback string
 */
const getLyrics = async (artist, title) => {
  if (!artist || !title) {
    return "Lyrics not found.";
  }

  try {
    const formattedArtist = encodeURIComponent(artist.trim());
    const formattedTitle = encodeURIComponent(title.trim());
    const response = await axios.get(`https://api.lyrics.ovh/v1/${formattedArtist}/${formattedTitle}`, {
      timeout: 5000 // 5 seconds timeout to prevent hanging the combined API call
    });
    
    if (response.data && response.data.lyrics) {
      return response.data.lyrics;
    }
    
    return "Lyrics not found.";
  } catch (error) {
    // Graceful fallback to avoid throwing errors in parent calls
    console.warn(`Lyrics API lookup failed for ${artist} - ${title}: ${error.message}`);
    return "Lyrics not found.";
  }
};

module.exports = { getLyrics };
