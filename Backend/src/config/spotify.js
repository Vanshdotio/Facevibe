const axios = require("axios");

let tokenCache = {
  accessToken: null,
  expiresAt: null
};

/**
 * Retrieves the Spotify Access Token using Client Credentials Flow.
 * Automatically refreshes/re-requests the token if expired or not available.
 * 
 * @returns {Promise<string|null>} Access token or null if credentials missing/invalid
 */
const getSpotifyToken = async () => {
  const now = Date.now();
  
  // Return cached token if valid (with 60 seconds buffer time)
  if (tokenCache.accessToken && tokenCache.expiresAt && now < tokenCache.expiresAt - 60000) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Gracefully handle missing or placeholder credentials
  if (!clientId || !clientSecret || clientId.includes("here") || clientSecret.includes("here")) {
    console.warn("Spotify credentials not set or contain placeholder text. Spotify integration will run in mock mode.");
    return null;
  }

  try {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }).toString(),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const { access_token, expires_in } = response.data;
    tokenCache.accessToken = access_token;
    // expires_in is in seconds, convert to millisecond timestamp
    tokenCache.expiresAt = now + (expires_in * 1000);

    return tokenCache.accessToken;
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error(`Error requesting Spotify Access Token: ${errorMsg}`);
    return null;
  }
};

module.exports = { getSpotifyToken };
