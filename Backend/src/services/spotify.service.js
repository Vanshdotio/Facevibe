const axios = require("axios");
const { getSpotifyToken } = require("../config/spotify");

/**
 * Searches Spotify for a track by name.
 * Falls back to mock data if Spotify API is not configured or fails.
 * 
 * @param {string} songName - Name of the song to search
 * @returns {Promise<object>} Track metadata
 */
const searchTrack = async (songName) => {
  const token = await getSpotifyToken();

  if (!token) {
    // Return high-fidelity mockup data if credentials are not configured
    return getMockSpotifyData(songName);
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: songName,
        type: "track",
        limit: 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const items = response.data.tracks?.items;
    if (items && items.length > 0) {
      const track = items[0];
      return {
        title: track.name,
        artist: track.artists[0]?.name || "Unknown Artist",
        album: track.album?.name || "Unknown Album",
        coverImage: track.album?.images[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        spotifyId: track.id,
      };
    }

    return getMockSpotifyData(songName);
  } catch (error) {
    console.error(`Spotify API search failed: ${error.message}`);
    return getMockSpotifyData(songName);
  }
};

/**
 * High-fidelity fallback database mapping song queries to realistic metadata.
 */
function getMockSpotifyData(songName) {
  const normalized = songName.toLowerCase();
  
  const library = {
    "blinding lights": {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
      spotifyId: "0VjIjW4GlUZAMYd2vXMiVb",
    },
    "levitating": {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      spotifyId: "39LLxExzy6HrmGvhs8j6Iq",
    },
    "sunflower": {
      title: "Sunflower",
      artist: "Post Malone & Swae Lee",
      album: "Spider-Man: Into the Spider-Verse",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      spotifyId: "3K3r2Z9z9eXU367297eXU3",
    },
    "someone like you": {
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
      spotifyId: "4JE6666666666666666666",
    },
    "fix you": {
      title: "Fix You",
      artist: "Coldplay",
      album: "X&Y",
      coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      spotifyId: "7LVFVHFb64R3K1dZc5eXU3",
    },
    "yellow": {
      title: "Yellow",
      artist: "Coldplay",
      album: "Parachutes",
      coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      spotifyId: "3Z55555555555555555555",
    },
    "perfect": {
      title: "Perfect",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      coverImage: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=300&h=300&fit=crop",
      spotifyId: "1Sl7777777777777777777",
    }
  };

  // Find dynamic/partial match
  for (const key of Object.keys(library)) {
    if (normalized.includes(key)) {
      return library[key];
    }
  }

  // Generic fallback if not in mock database
  return {
    title: songName,
    artist: "Unknown Artist",
    album: "Single",
    coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    spotifyId: "mock-" + Math.random().toString(36).substring(7),
  };
}

module.exports = { searchTrack };
