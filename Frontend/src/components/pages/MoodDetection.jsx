import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  FiCamera, FiMusic, FiPlay, FiPause, FiVolume2, FiVolumeX, 
  FiHeart, FiSearch, FiBell, FiRefreshCw, FiChevronRight, FiList, FiBookOpen 
} from "react-icons/fi";
import { 
  BiShuffle, BiRepeat, BiSkipPrevious, BiSkipNext 
} from "react-icons/bi";

import Lenis from "lenis";

// Modular Subcomponents
import MoodDetectionHeader from "./mood-detection/MoodDetectionHeader";
import FaceScanner from "./mood-detection/FaceScanner";
import DetectedMood from "./mood-detection/DetectedMood";
import AnalysisSummary from "./mood-detection/AnalysisSummary";
import RecommendedSongs from "./mood-detection/RecommendedSongs";
import BottomPlayer from "./mood-detection/BottomPlayer";
import MobilePlayerOverlay from "./mood-detection/MobilePlayerOverlay";
import SyncedLyricsOverlay from "./mood-detection/SyncedLyricsOverlay";

// Mood Config Mapping for Dynamic Indicators (Colors, Emojis, Badges)
const moodColors = {
  happy: {
    bg: "bg-[#00C896]/10",
    border: "border-[#00C896]/20",
    text: "text-[#00C896]",
    emoji: "😊",
    title: "Happy",
    energy: "High",
    genre: "Pop",
    pills: [true, true, true, false] // 3 green, 1 gray
  },
  calm: {
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20",
    text: "text-[#F59E0B]",
    emoji: "😌",
    title: "Calm",
    energy: "Medium",
    genre: "Ambient",
    pills: [true, true, false, false] // 2 yellow, 2 gray
  },
  sad: {
    bg: "bg-[#60A5FA]/10",
    border: "border-[#60A5FA]/20",
    text: "text-[#60A5FA]",
    emoji: "😔",
    title: "Sad",
    energy: "Low",
    genre: "Acoustic",
    pills: [true, false, false, false]
  },
  angry: {
    bg: "bg-[#EF4444]/10",
    border: "border-[#EF4444]/20",
    text: "text-[#EF4444]",
    emoji: "😠",
    title: "Angry",
    energy: "High",
    genre: "Rock/Metal",
    pills: [true, true, true, true]
  },
  excited: {
    bg: "bg-[#F97316]/10",
    border: "border-[#F97316]/20",
    text: "text-[#F97316]",
    emoji: "🤩",
    title: "Excited",
    energy: "High",
    genre: "Dance",
    pills: [true, true, true, true]
  },
  romantic: {
    bg: "bg-[#EC4899]/10",
    border: "border-[#EC4899]/20",
    text: "text-[#EC4899]",
    emoji: "❤️",
    title: "Romantic",
    energy: "Medium",
    genre: "R&B/Pop",
    pills: [true, true, true, false]
  },
  neutral: {
    bg: "bg-[#9CA3AF]/10",
    border: "border-[#9CA3AF]/20",
    text: "text-[#9CA3AF]",
    emoji: "😐",
    title: "Neutral",
    energy: "Medium",
    genre: "Lo-Fi",
    pills: [true, true, false, false]
  }
};

// Rich client-side catalog matching the screenshot for Happy, with fallbacks for others
const MOODS_CATALOG = {
  happy: [
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      mood: "Happy",
      duration: "3:22",
      coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      mood: "Happy",
      duration: "2:47",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      mood: "Happy",
      duration: "3:23",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      mood: "Happy",
      duration: "2:58",
      coverImage: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      mood: "Happy",
      duration: "2:21",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      mood: "Happy",
      duration: "2:54",
      coverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=120&h=120&fit=crop",
      emoji: "😊"
    },
    {
      title: "Heat Waves",
      artist: "Glass Animals",
      mood: "Calm",
      duration: "3:59",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=120&fit=crop",
      emoji: "😌"
    },
    {
      title: "Shivers",
      artist: "Ed Sheeran",
      mood: "Happy",
      duration: "3:27",
      coverImage: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=120&h=120&fit=crop",
      emoji: "😊"
    }
  ],
  calm: [
    {
      title: "Yellow",
      artist: "Coldplay",
      mood: "Calm",
      duration: "4:26",
      coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=120&h=120&fit=crop",
      emoji: "😌"
    },
    {
      title: "Perfect",
      artist: "Ed Sheeran",
      mood: "Calm",
      duration: "4:23",
      coverImage: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=120&h=120&fit=crop",
      emoji: "😌"
    },
    {
      title: "Heat Waves",
      artist: "Glass Animals",
      mood: "Calm",
      duration: "3:59",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=120&fit=crop",
      emoji: "😌"
    },
    {
      title: "Landslide",
      artist: "Fleetwood Mac",
      mood: "Calm",
      duration: "3:19",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&h=120&fit=crop",
      emoji: "😌"
    }
  ],
  sad: [
    {
      title: "Someone Like You",
      artist: "Adele",
      mood: "Sad",
      duration: "4:45",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&h=120&fit=crop",
      emoji: "😔"
    },
    {
      title: "Fix You",
      artist: "Coldplay",
      mood: "Sad",
      duration: "4:54",
      coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=120&h=120&fit=crop",
      emoji: "😔"
    }
  ],
  angry: [
    {
      title: "In the End",
      artist: "Linkin Park",
      mood: "Angry",
      duration: "3:36",
      coverImage: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=120&h=120&fit=crop",
      emoji: "😠"
    },
    {
      title: "Chop Suey!",
      artist: "System of a Down",
      mood: "Angry",
      duration: "3:30",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=120&fit=crop",
      emoji: "😠"
    }
  ],
  excited: [
    {
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      mood: "Excited",
      duration: "4:30",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=120&h=120&fit=crop",
      emoji: "🤩"
    },
    {
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      mood: "Excited",
      duration: "3:56",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&h=120&fit=crop",
      emoji: "🤩"
    }
  ],
  romantic: [
    {
      title: "Thinking Out Loud",
      artist: "Ed Sheeran",
      mood: "Romantic",
      duration: "4:41",
      coverImage: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=120&h=120&fit=crop",
      emoji: "❤️"
    },
    {
      title: "All of Me",
      artist: "John Legend",
      mood: "Romantic",
      duration: "4:29",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&h=120&fit=crop",
      emoji: "❤️"
    }
  ],
  neutral: [
    {
      title: "Closer",
      artist: "The Chainsmokers",
      mood: "Neutral",
      duration: "4:04",
      coverImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=120&h=120&fit=crop",
      emoji: "😐"
    },
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      mood: "Neutral",
      duration: "3:53",
      coverImage: "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=120&h=120&fit=crop",
      emoji: "😐"
    }
  ]
};

const SYNCED_LYRICS = {
  "blinding lights": [
    { time: 0, text: "🎵 (Instrumental Intro) 🎵" },
    { time: 6, text: "Yeah..." },
    { time: 9, text: "I've been tryna call" },
    { time: 12, text: "I've been on my own for long enough" },
    { time: 17, text: "Maybe you can show me how to love, maybe" },
    { time: 23, text: "I'm going through withdrawals" },
    { time: 27, text: "You don't even have to do too much" },
    { time: 31, text: "You can turn me on with just a touch, baby" },
    { time: 37, text: "I look around and Sin City's cold and empty" },
    { time: 44, text: "No one's around to judge me" },
    { time: 48, text: "I can't see clearly when you're gone" },
    { time: 52, text: "I said, ooh, I'm blinded by the lights" },
    { time: 59, text: "No, I can't sleep until I feel your touch" },
    { time: 66, text: "I said, ooh, I'm drowning in the night" },
    { time: 73, text: "Oh, when I'm like this, you're the one I trust" }
  ],
  "levitating": [
    { time: 0, text: "🎵 (Levitating Intro) 🎵" },
    { time: 3, text: "If you wanna run away with me, I know a galaxy" },
    { time: 7, text: "And I can take you for a ride" },
    { time: 10, text: "I had a premonition that we fell into a rhythm" },
    { time: 14, text: "Where the music don't stop for life" },
    { time: 17, text: "Glitter in the sky, glitter in my eyes" },
    { time: 21, text: "Shining just the way I like" },
    { time: 24, text: "If you wanna run away with me, I know a galaxy" },
    { time: 28, text: "And I can take you for a ride" },
    { time: 31, text: "I feel like we're levitating!" }
  ],
  "as it was": [
    { time: 0, text: "🎵 (As It Was Intro) 🎵" },
    { time: 5, text: "Holdin' me back" },
    { time: 8, text: "Gravity's holdin' me back" },
    { time: 11, text: "I want you to hold out the palm of your hand" },
    { time: 15, text: "Why don't we leave it at that?" },
    { time: 18, text: "Nothin' to say" },
    { time: 21, text: "When everything gets in the way" },
    { time: 24, text: "Seems you cannot be replaced" },
    { time: 27, text: "And I'm the one who will stay, oh" },
    { time: 31, text: "In this world, it's just us" },
    { time: 35, text: "You know it's not the same as it was" }
  ],
  "stay": [
    { time: 0, text: "🎵 (Stay Intro) 🎵" },
    { time: 2, text: "I do the same thing I told you that I never would" },
    { time: 5, text: "I told you I'd change, even when I knew I never could" },
    { time: 9, text: "I know that I can't find nobody else as good as you" },
    { time: 13, text: "I need you to stay, need you to stay, yeah" }
  ],
  "good 4 u": [
    { time: 0, text: "🎵 (Good 4 U Intro) 🎵" },
    { time: 4, text: "Well, good for you, I guess you moved on really easily" },
    { time: 9, text: "You found a new girl and it only took a couple weeks" },
    { time: 14, text: "Remember when you said that you wanted to give me the world?" },
    { time: 19, text: "Well, good for you, I guess you're gettin' everything you want" }
  ],
  "watermelon sugar": [
    { time: 0, text: "🎵 (Watermelon Sugar Intro) 🎵" },
    { time: 6, text: "Strawberries on a summer evening" },
    { time: 12, text: "Baby, you're the end of June" },
    { time: 18, text: "I want your belly and that summer feeling" },
    { time: 24, text: "Getting washed away in you" },
    { time: 29, text: "Watermelon sugar high!" }
  ],
  "heat waves": [
    { time: 0, text: "🎵 (Heat Waves Intro) 🎵" },
    { time: 4, text: "Last night, all I think about is you" },
    { time: 9, text: "Don't stop, baby, you can show me how to love" },
    { time: 14, text: "Sometimes all I think about is you" },
    { time: 19, text: "Late nights in the middle of June" },
    { time: 24, text: "Heat waves been faking me out" },
    { time: 29, text: "Can't make you happier now" }
  ],
  "shivers": [
    { time: 0, text: "🎵 (Shivers Intro) 🎵" },
    { time: 4, text: "I took an arrow to the heart" },
    { time: 8, text: "I never kissed a mouth that tastes like yours" },
    { time: 12, text: "Strawberries and somethin' more" },
    { time: 16, text: "Ooh yeah, baby, let me run with you" }
  ]
};

const getSyncedLyricsForTrack = (track, rawLyrics, duration) => {
  if (!track) return [];
  const normalizedTitle = track.title.toLowerCase().trim();
  if (SYNCED_LYRICS[normalizedTitle]) {
    return SYNCED_LYRICS[normalizedTitle];
  }

  // Fallback: Dynamically parse raw plain-text lyrics and sync them evenly
  if (!rawLyrics || rawLyrics === "Lyrics not found.") {
    return [
      { time: 0, text: `🎵 Listening to ${track.title} 🎵` },
      { time: Math.floor(duration * 0.1), text: "Enjoy the high-fidelity sound quality" },
      { time: Math.floor(duration * 0.3), text: "Find yourself in the music" },
      { time: Math.floor(duration * 0.6), text: "Facevibe matches your emotions" },
      { time: Math.floor(duration * 0.8), text: "Thank you for listening!" }
    ];
  }

  const lines = rawLyrics.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) {
    return [{ time: 0, text: "No lyrics available." }];
  }

  const step = duration / lines.length;
  return lines.map((line, idx) => ({
    time: Math.floor(idx * step),
    text: line
  }));
};

const formatTime = (secs) => {
  if (isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const parseDurationToSeconds = (durationStr) => {
  if (!durationStr) return 200;
  const parts = durationStr.split(":");
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 200;
};

const MoodDetection = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);

  // Search & Curation States
  const [searchQuery, setSearchQuery] = useState("");
  const [detectedMood, setDetectedMood] = useState("happy"); // Default pre-populated to match screenshot
  const [confidence, setConfidence] = useState(94);
  const [scanState, setScanState] = useState("success"); // Idle initially is simulated but we pre-load success state
  const [recommendedSongs, setRecommendedSongs] = useState(MOODS_CATALOG.happy);

  // Audio Playback States
  const [currentTrack, setCurrentTrack] = useState(MOODS_CATALOG.happy[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(parseDurationToSeconds(MOODS_CATALOG.happy[0].duration));
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Lyrics & UI States
  const [showLyrics, setShowLyrics] = useState(false);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  const [showSyncedLyrics, setShowSyncedLyrics] = useState(false);
  const [syncedLyrics, setSyncedLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [lyrics, setLyrics] = useState("");
  const [favoritesList, setFavoritesList] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Camera Scanner States
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const profileMenuRef = useRef(null);
  const activeLineRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Initialize Lenis for nested columns on desktop to support smooth scrolling
  useEffect(() => {
    let lenisLeft;
    let lenisRight;
    let rafId;

    if (window.innerWidth >= 1024) {
      if (leftColumnRef.current) {
        lenisLeft = new Lenis({
          wrapper: leftColumnRef.current,
          content: leftColumnRef.current.firstElementChild,
          smoothWheel: true,
        });
      }
      if (rightColumnRef.current) {
        lenisRight = new Lenis({
          wrapper: rightColumnRef.current,
          content: rightColumnRef.current.firstElementChild,
          smoothWheel: true,
        });
      }

      function raf(time) {
        if (lenisLeft) lenisLeft.raf(time);
        if (lenisRight) lenisRight.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisLeft) lenisLeft.destroy();
      if (lenisRight) lenisRight.destroy();
    };
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  // Load recommendations & Favorites on Mount/Auth
  useEffect(() => {
    if (user) {
      loadFavorites();
      if (detectedMood) {
        loadRecommendations(detectedMood);
      }
    }
  }, [user]);

  // Setup click outside profiles listener
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Sync Audio Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sync lyrics when currentTrack, lyrics, or duration changes
  useEffect(() => {
    if (currentTrack) {
      const parsed = getSyncedLyricsForTrack(currentTrack, lyrics, duration);
      setSyncedLyrics(parsed);
      setCurrentLyricIndex(-1);
    }
  }, [currentTrack, lyrics, duration]);

  // Update current lyric line based on current time
  useEffect(() => {
    if (syncedLyrics.length === 0) return;
    
    let activeIdx = -1;
    for (let i = 0; i < syncedLyrics.length; i++) {
      if (currentTime >= syncedLyrics[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }
    
    if (activeIdx !== currentLyricIndex) {
      setCurrentLyricIndex(activeIdx);
    }
  }, [currentTime, syncedLyrics]);

  // Auto-scroll the active lyric line to the center of the list
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [currentLyricIndex]);

  // Load Favorites from API
  const loadFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/favorites", { withCredentials: true });
      if (res.data && res.data.favorites) {
        setFavoritesList(res.data.favorites);
      }
    } catch (err) {
      console.warn("Failed to load favorites from backend.", err);
    }
  };

  // Toggle Favorite Handler
  const toggleFavorite = async (track) => {
    const isFav = favoritesList.find(f => f.title.toLowerCase() === track.title.toLowerCase());
    try {
      if (isFav) {
        await axios.delete(`http://localhost:3000/api/favorites/${isFav._id}`, { withCredentials: true });
        setFavoritesList(prev => prev.filter(f => f._id !== isFav._id));
      } else {
        const res = await axios.post("http://localhost:3000/api/favorites", {
          title: track.title,
          artist: track.artist,
          coverImage: track.coverImage
        }, { withCredentials: true });
        if (res.data && res.data.favorite) {
          setFavoritesList(prev => [res.data.favorite, ...prev]);
        }
      }
    } catch (err) {
      console.error("Favorite toggle error", err);
    }
  };

  const isFavorited = (track) => {
    if (!track) return false;
    return favoritesList.some(f => f.title.toLowerCase() === track.title.toLowerCase());
  };

  // Load recommendations
  const loadRecommendations = async (moodName) => {
    try {
      const res = await axios.get("http://localhost:3000/api/songs/recommend", {
        params: { mood: moodName },
        withCredentials: true
      });
      let apiTracks = res.data?.tracks || [];
      const clientCatalog = MOODS_CATALOG[moodName.toLowerCase()] || [];

      // Merge backend recommendations with screenshot/local high-fidelity catalog
      const merged = [...apiTracks];
      clientCatalog.forEach(track => {
        if (!merged.some(t => t.title.toLowerCase() === track.title.toLowerCase())) {
          merged.push(track);
        }
      });
      setRecommendedSongs(merged);
    } catch (err) {
      console.warn("API recommendations failed, loading high-fidelity fallback catalog.", err);
      setRecommendedSongs(MOODS_CATALOG[moodName.toLowerCase()] || []);
    }
  };

  // Camera Management
  const startCamera = async () => {
    setCapturedImage(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 320, height: 240 }
      });
      setStream(mediaStream);
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable. Simulating visual scanning feed.", err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  // Handle binding of the camera stream to the video element after it mounts
  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.warn("Failed to autoplay video stream:", err);
      });
    }
  }, [cameraActive, stream]);

  // Auto-start camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Mood Scan Button Handler
  const handleScanMood = async () => {
    setScanState("scanning");

    // Take canvas snapshot if camera is active
    if (cameraActive && videoRef.current) {
      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = video.videoWidth || 320;
          canvas.height = video.videoHeight || 240;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setCapturedImage(canvas.toDataURL("image/png"));
        }
      } catch (e) {
        console.warn("Failed to capture snapshot", e);
      }
      stopCamera();
    } else {
      // Fallback placeholder snapshot for simulation mode
      setCapturedImage("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=320&h=240&fit=crop");
    }

    // 2.5 second animation simulation
    setTimeout(async () => {
      const moods = ["happy", "calm", "sad", "angry", "excited", "romantic", "neutral"];
      // Choose mood randomly with bias to happy/calm
      let selectedMood = "happy";
      const roll = Math.random();
      if (roll > 0.8) selectedMood = "calm";
      else if (roll > 0.7) selectedMood = "sad";
      else if (roll > 0.6) selectedMood = "excited";
      else if (roll > 0.5) selectedMood = "neutral";
      else if (roll > 0.4) selectedMood = "romantic";
      else if (roll > 0.3) selectedMood = "angry";

      try {
        const res = await axios.post("http://localhost:3000/api/mood/analyze", {
          mood: selectedMood
        }, { withCredentials: true });

        if (res.data && res.data.success) {
          setDetectedMood(res.data.mood);
          setConfidence(res.data.confidence);
          await loadRecommendations(res.data.mood);
          
          // Auto-play the first song from new list
          const firstSong = MOODS_CATALOG[res.data.mood]?.[0];
          if (firstSong) {
            selectTrack(firstSong);
          }
        }
      } catch (err) {
        console.error("Scan submission error", err);
        // Fallback simulated success
        const mockConf = Math.floor(Math.random() * (98 - 82 + 1)) + 82;
        setDetectedMood(selectedMood);
        setConfidence(mockConf);
        await loadRecommendations(selectedMood);
        
        const firstSong = MOODS_CATALOG[selectedMood]?.[0];
        if (firstSong) {
          selectTrack(firstSong);
        }
      } finally {
        setScanState("success");
      }
    }, 2500);
  };

  // Reset/Retake Camera scanner
  const handleRetake = () => {
    setCapturedImage(null);
    setScanState("idle");
    setDetectedMood(null);
    setConfidence(0);
    startCamera();
  };

  // Audio Playback Controls
  const selectTrack = async (track) => {
    if (currentTrack && currentTrack.title === track.title) {
      togglePlay();
      return;
    }

    setIsPlaying(false);
    setCurrentTrack(track);
    setLyrics("");

    // Read track duration
    const trackSecs = parseDurationToSeconds(track.duration);
    setDuration(trackSecs);
    setCurrentTime(0);

    // Initial source setup
    const sampleHelixCode = (track.title.length % 5) + 1;
    const fallbackStreamUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${sampleHelixCode}.mp3`;
    
    if (audioRef.current) {
      audioRef.current.src = fallbackStreamUrl;
      audioRef.current.loop = isLooping;
      audioRef.current.load();
    }

    try {
      // Query backend detailed stream URLs & Lyrics in parallel
      const res = await axios.get("http://localhost:3000/api/song/details", {
        params: { title: track.title, artist: track.artist },
        withCredentials: true
      });

      if (res.data) {
        const details = res.data;
        if (details.lyrics) setLyrics(details.lyrics);
        if (details.streamUrl && audioRef.current) {
          audioRef.current.src = details.streamUrl;
          audioRef.current.load();
        }
      }
    } catch (err) {
      console.warn("Backend stream search failed. Playing mock stream.", err);
    }

    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.warn("Playback block:", e);
          // Try playing again
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.warn("Playback failed", e);
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleAudioEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      handleNextTrack();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || parseDurationToSeconds(currentTrack?.duration));
    }
  };

  const handleNextTrack = () => {
    if (recommendedSongs.length === 0) return;
    let nextIdx = 0;
    if (isShuffling) {
      nextIdx = Math.floor(Math.random() * recommendedSongs.length);
    } else {
      const currIdx = recommendedSongs.findIndex(t => t.title === currentTrack?.title);
      nextIdx = (currIdx + 1) % recommendedSongs.length;
    }
    selectTrack(recommendedSongs[nextIdx]);
  };

  const handlePrevTrack = () => {
    if (recommendedSongs.length === 0) return;
    const currIdx = recommendedSongs.findIndex(t => t.title === currentTrack?.title);
    let prevIdx = currIdx - 1;
    if (prevIdx < 0) prevIdx = recommendedSongs.length - 1;
    selectTrack(recommendedSongs[prevIdx]);
  };

  // Search filter
  const filteredSongs = recommendedSongs.filter(song => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  });

  const activeMoodInfo = moodColors[detectedMood?.toLowerCase()] || moodColors.happy;

  
  return (
    <div className="min-h-screen lg:h-screen bg-[#0F1115] text-white flex flex-col font-sans select-none antialiased overflow-y-auto lg:overflow-hidden overflow-x-hidden">
      
      {/* Keyframe Animation Styling Block */}
      <style>{`
        @keyframes rotate-dashed {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .dashed-circle-scanner {
          border: 2px dashed #00C896;
          border-radius: 50%;
          animation: rotate-dashed 20s linear infinite;
        }
        @keyframes laser-sweep {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
        .laser-beam {
          animation: laser-sweep 2.2s infinite ease-in-out;
        }
        @keyframes equalizer-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-eq-1 { animation: equalizer-bar 0.8s infinite ease-in-out 0.1s; }
        .animate-eq-2 { animation: equalizer-bar 0.8s infinite ease-in-out 0.3s; }
        .animate-eq-3 { animation: equalizer-bar 0.8s infinite ease-in-out 0.2s; }
        .animate-eq-4 { animation: equalizer-bar 0.8s infinite ease-in-out 0.4s; }
        .animate-eq-5 { animation: equalizer-bar 0.8s infinite ease-in-out 0.1s; }

        /* Custom range slider styling */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 4px rgba(0,0,0,0.5);
          transition: transform 0.1s;
        }
        input[type="range"]:hover::-webkit-slider-thumb {
          transform: scale(1.3);
          background: #00C896;
        }

        /* Global scrollbar style for all scrollable elements in this page */
        *::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: #272d38 !important;
          border-radius: 9999px !important;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #363e4d !important;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #272d38 transparent;
        }

        /* Responsive Dashboard Layout CSS */
        @media (min-width: 1024px) {
          .desktop-grid-container {
            height: calc(100vh - 11rem) !important;
            overflow: hidden !important;
          }
          .desktop-column-left {
            height: 100% !important;
            overflow-y: auto !important;
          }
          .desktop-column-right {
            height: 100% !important;
            overflow-y: auto !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-grid-container {
            height: auto !important;
            overflow: visible !important;
          }
          .desktop-column-left {
            height: auto !important;
            overflow: visible !important;
            padding-right: 0 !important;
          }
          .desktop-column-right {
            height: auto !important;
            overflow: visible !important;
            padding-right: 0 !important;
          }
        }
      `}</style>

      {/* 1. Header (Top Navigation) */}
      <MoodDetectionHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        logout={logout}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        profileMenuRef={profileMenuRef}
      />

      {/* Main Body Layout */}
      <div className="mt-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 select-none pt-4 pb-28 lg:pb-4 desktop-grid-container">
        
        {/* Left Column Pane (grid span 4) */}
        <div ref={leftColumnRef} className="lg:col-span-4 flex flex-col gap-6 h-full min-h-0 overflow-y-auto pr-2 custom-scrollbar desktop-column-left">
          <div className="flex flex-col gap-6">
            <FaceScanner 
              cameraActive={cameraActive}
              capturedImage={capturedImage}
              scanState={scanState}
              handleScanMood={handleScanMood}
              handleRetake={handleRetake}
              videoRef={videoRef}
              canvasRef={canvasRef}
            />

            <DetectedMood 
              detectedMood={detectedMood}
              confidence={confidence}
              activeMoodInfo={activeMoodInfo}
            />

            <AnalysisSummary 
              detectedMood={detectedMood}
              activeMoodInfo={activeMoodInfo}
            />
          </div>
        </div>

        {/* Right Column Pane (grid span 8) */}
        <RecommendedSongs 
          scrollRef={rightColumnRef}
          filteredSongs={filteredSongs}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          selectTrack={selectTrack}
          togglePlay={togglePlay}
          detectedMood={detectedMood}
          activeMoodInfo={activeMoodInfo}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          moodColors={moodColors}
        />

      </div>

      {/* 3. Fixed Bottom Audio Player */}
      <BottomPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isLooping={isLooping}
        isShuffling={isShuffling}
        setIsLooping={setIsLooping}
        setIsShuffling={setIsShuffling}
        togglePlay={togglePlay}
        handlePrevTrack={handlePrevTrack}
        handleNextTrack={handleNextTrack}
        handleSeek={handleSeek}
        handleVolumeChange={handleVolumeChange}
        toggleMute={toggleMute}
        toggleFavorite={toggleFavorite}
        isFavorited={isFavorited}
        setShowSyncedLyrics={setShowSyncedLyrics}
        showSyncedLyrics={showSyncedLyrics}
        setShowMobilePlayer={setShowMobilePlayer}
        formatTime={formatTime}
        lyrics={lyrics}
      />

      {/* 4. Full Screen Mobile Player Overlay */}
      <MobilePlayerOverlay 
        showMobilePlayer={showMobilePlayer}
        setShowMobilePlayer={setShowMobilePlayer}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        toggleFavorite={toggleFavorite}
        isFavorited={isFavorited}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        formatTime={formatTime}
        isLooping={isLooping}
        setIsLooping={setIsLooping}
        handlePrevTrack={handlePrevTrack}
        handleNextTrack={handleNextTrack}
        isShuffling={isShuffling}
        setIsShuffling={setIsShuffling}
        setShowSyncedLyrics={setShowSyncedLyrics}
      />

      {/* 5. Full Screen Synced Lyrics Page Overlay */}
      {showSyncedLyrics && currentTrack && (
        <SyncedLyricsOverlay 
          showSyncedLyrics={showSyncedLyrics}
          setShowSyncedLyrics={setShowSyncedLyrics}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          toggleFavorite={toggleFavorite}
          isFavorited={isFavorited}
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          formatTime={formatTime}
          isLooping={isLooping}
          setIsLooping={setIsLooping}
          handlePrevTrack={handlePrevTrack}
          handleNextTrack={handleNextTrack}
          isShuffling={isShuffling}
          setIsShuffling={setIsShuffling}
          syncedLyrics={syncedLyrics}
          currentLyricIndex={currentLyricIndex}
          audioRef={audioRef}
          setCurrentTime={setCurrentTime}
          activeLineRef={activeLineRef}
          volume={volume}
          isMuted={isMuted}
          handleVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
          setShowMobilePlayer={setShowMobilePlayer}
        />
      )}

      {/* Audio Element */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />
    </div>
  );
};

export default MoodDetection;
