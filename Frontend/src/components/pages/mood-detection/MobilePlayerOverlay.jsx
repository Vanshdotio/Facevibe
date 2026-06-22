import React from "react";
import { FiHeart, FiPause, FiPlay } from "react-icons/fi";
import { BiShuffle, BiRepeat, BiSkipPrevious, BiSkipNext } from "react-icons/bi";

const MobilePlayerOverlay = ({
  showMobilePlayer,
  setShowMobilePlayer,
  currentTrack,
  isPlaying,
  togglePlay,
  toggleFavorite,
  isFavorited,
  currentTime,
  duration,
  handleSeek,
  formatTime,
  isLooping,
  setIsLooping,
  handlePrevTrack,
  handleNextTrack,
  isShuffling,
  setIsShuffling,
  setShowSyncedLyrics
}) => {
  return (
    <div className={`fixed inset-0 bg-[#0F1115] z-50 flex flex-col justify-between px-6 py-8 md:hidden select-none font-sans text-white transition-transform duration-300 ease-[cubic-bezier(0.32,0.94,0.6,1)] ${showMobilePlayer && currentTrack ? "translate-y-0" : "translate-y-full"}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setShowMobilePlayer(false)}
          className="p-2 -ml-2 text-zinc-400 hover:text-white cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <span className="text-sm font-semibold tracking-wider text-zinc-300">Now Playing</span>
        <div className="w-10" />
      </div>

      {/* Main Album Art & Info Container */}
      <div className="flex-grow flex flex-col justify-center items-center my-6 gap-8">
        
        {/* Album Cover */}
        <div className="w-full aspect-square max-w-[320px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-zinc-800/40">
          <img 
            src={currentTrack?.coverImage || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop"} 
            alt={currentTrack?.title || "Cover"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Song Meta (Title, Artist, Like) */}
        <div className="w-full max-w-[320px] flex items-center justify-between px-1">
          <div className="overflow-hidden pr-4">
            <h2 className="text-xl font-bold text-white truncate leading-tight capitalize">
              {currentTrack?.title || "No Song Loaded"}
            </h2>
            <p className="text-sm text-zinc-400 truncate mt-1">
              {currentTrack?.artist || ""}
            </p>
          </div>
          <button 
            onClick={() => currentTrack && toggleFavorite(currentTrack)}
            className={`text-2xl cursor-pointer ${
              currentTrack && isFavorited(currentTrack) ? "text-[#00C896]" : "text-zinc-500 hover:text-zinc-350"
            } transition-colors flex-shrink-0`}
          >
            <FiHeart fill={currentTrack && isFavorited(currentTrack) ? "currentColor" : "none"} />
          </button>
        </div>

      </div>

      {/* Player controls & seeking */}
      <div className="w-full max-w-[320px] mx-auto flex flex-col gap-6 pb-6">
        
        {/* Progress Slider */}
        <div className="flex flex-col gap-2.5">
          <input 
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-[#00C896] bg-zinc-850 h-[3px]"
            style={{
              background: `linear-gradient(to right, #00C896 0%, #00C896 ${(currentTime / (duration || 1)) * 100}%, #27272a ${(currentTime / (duration || 1)) * 100}%, #27272a 100%)`
            }}
          />
          <div className="flex justify-between items-center text-[11px] text-zinc-500 font-semibold px-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls buttons row */}
        <div className="flex items-center justify-between px-2">
          
          {/* Loop / Repeat */}
          <button 
            onClick={() => setIsLooping(prev => !prev)}
            className={`text-xl cursor-pointer ${isLooping ? "text-[#00C896]" : "text-zinc-500 hover:text-white"} transition-colors`}
          >
            <BiRepeat />
          </button>

          {/* Prev */}
          <button 
            onClick={handlePrevTrack}
            className="text-2xl text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <BiSkipPrevious />
          </button>

          {/* Play / Pause Circle */}
          <button 
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-[#00C896] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
          >
            {isPlaying ? <FiPause size={22} className="text-black" /> : <FiPlay size={22} className="text-black translate-x-0.5" />}
          </button>

          {/* Next */}
          <button 
            onClick={handleNextTrack}
            className="text-2xl text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <BiSkipNext />
          </button>

          {/* Shuffle */}
          <button 
            onClick={() => setIsShuffling(prev => !prev)}
            className={`text-xl cursor-pointer ${isShuffling ? "text-[#00C896]" : "text-zinc-500 hover:text-white"} transition-colors`}
          >
            <BiShuffle />
          </button>

        </div>

        {/* Lyrics toggle overlay at bottom */}
        <div className="flex flex-col items-center mt-4">
          <button 
            onClick={() => {
              setShowMobilePlayer(false);
              setShowSyncedLyrics(true);
            }}
            className="flex flex-col items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-white tracking-widest uppercase transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Lyrics
          </button>
        </div>

      </div>

    </div>
  );
};

export default MobilePlayerOverlay;
