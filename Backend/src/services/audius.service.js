const axios = require("axios");

/**
 * Searches Audius for a track by name and constructs a stream URL.
 * Falls back to high-fidelity mock stream URL if search returns empty or fails.
 * 
 * @param {string} songName - Name of the track
 * @returns {Promise<object>} Stream details (streamUrl, trackId, duration)
 */
const searchAudiusTrack = async (songName) => {
  const appName = process.env.AUDIUS_APP_NAME || "Facevibe";
  
  try {
    const response = await axios.get("https://api.audius.co/v1/tracks/search", {
      params: {
        query: songName,
        app_name: appName,
      },
      timeout: 5000
    });

    const tracks = response.data?.data;
    if (tracks && tracks.length > 0) {
      const track = tracks[0];
      const trackId = track.id;
      const duration = track.duration || 180;
      const streamUrl = `https://api.audius.co/v1/tracks/${trackId}/stream?app_name=${appName}`;
      
      return {
        streamUrl,
        trackId,
        duration,
      };
    }

    return getFallbackStream(songName);
  } catch (error) {
    console.error(`Audius search failed for ${songName}: ${error.message}`);
    return getFallbackStream(songName);
  }
};

/**
 * Fallback stream constructor utilizing public sample audio files.
 */
function getFallbackStream(songName) {
  const code = (songName.length % 5) + 1;
  return {
    streamUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${code}.mp3`,
    trackId: `mock-audius-${Math.random().toString(36).substring(7)}`,
    duration: 240,
  };
}

module.exports = { searchAudiusTrack };
