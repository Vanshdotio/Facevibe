const spotifyService = require("../services/spotify.service");
const lyricsService = require("../services/lyrics.service");
const audiusService = require("../services/audius.service");
const recommendationService = require("../services/recommendation.service");
const Favorite = require("../models/favorite.model");

/**
 * Recommends songs based on a mood
 * GET /api/songs/recommend
 */
const recommend = async (req, res, next) => {
  const { mood } = req.query;

  try {
    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood query parameter is required." });
    }

    const songTitles = recommendationService.getRecommendedSongTitles(mood);
    
    // Fetch Spotify metadata for each song title in parallel
    const tracksPromise = songTitles.map(title => spotifyService.searchTrack(title));
    const tracks = await Promise.all(tracksPromise);

    return res.status(200).json({
      success: true,
      mood,
      tracks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Combined details API (Spotify + Lyrics + Audius Stream)
 * GET /api/song/details
 */
const getDetails = async (req, res, next) => {
  const { title, artist } = req.query;

  try {
    if (!title) {
      return res.status(400).json({ success: false, message: "Title query parameter is required." });
    }

    const searchStr = artist ? `${artist} - ${title}` : title;

    // Run parallel calls to services for maximum efficiency
    const [spotifyMeta, lyrics, audiusMeta] = await Promise.all([
      spotifyService.searchTrack(searchStr),
      lyricsService.getLyrics(artist || "Unknown", title),
      audiusService.searchAudiusTrack(title)
    ]);

    // Construct unified song detail object
    const result = {
      title: spotifyMeta.title || title,
      artist: spotifyMeta.artist || artist || "Unknown Artist",
      album: spotifyMeta.album || "Single",
      coverImage: spotifyMeta.coverImage,
      spotifyId: spotifyMeta.spotifyId,
      lyrics,
      streamUrl: audiusMeta.streamUrl,
      duration: audiusMeta.duration,
      audiusTrackId: audiusMeta.trackId
    };

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Audius stream provider
 * GET /api/play
 */
const playTrack = async (req, res, next) => {
  const { song } = req.query;

  try {
    if (!song) {
      return res.status(400).json({ success: false, message: "Song query parameter is required." });
    }

    const audiusMeta = await audiusService.searchAudiusTrack(song);
    
    return res.status(200).json({
      streamUrl: audiusMeta.streamUrl
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Saves a song to user's favorites
 * POST /api/favorites
 */
const addFavorite = async (req, res, next) => {
  const { title, artist, coverImage } = req.body;

  try {
    if (!title || !artist) {
      return res.status(400).json({ success: false, message: "Song title and artist are required." });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      title: title.trim(),
      artist: artist.trim(),
      coverImage
    });

    return res.status(201).json({
      success: true,
      favorite
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Gets all favorite songs for current user
 * GET /api/favorites
 */
const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: favorites.length,
      favorites
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Removes a song from user's favorites
 * DELETE /api/favorites/:id
 */
const deleteFavorite = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Favorite.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Favorite record not found or unauthorized." });
    }

    return res.status(200).json({
      success: true,
      message: "Removed from favorites successfully."
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recommend,
  getDetails,
  playTrack,
  addFavorite,
  getFavorites,
  deleteFavorite
};
