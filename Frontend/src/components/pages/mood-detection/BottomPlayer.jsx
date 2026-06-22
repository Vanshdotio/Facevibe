import React, { useState } from "react";
import { 
  FiMusic, FiPlay, FiPause, FiVolume2, FiVolumeX, 
  FiHeart, FiBookOpen 
} from "react-icons/fi";
import { 
  BiShuffle, BiRepeat, BiSkipPrevious, BiSkipNext 
} from "react-icons/bi";

const BottomPlayer = ({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isLooping,
  isShuffling,
  setIsLooping,
  setIsShuffling,
  togglePlay,
  handlePrevTrack,
  handleNextTrack,
  handleSeek,
  handleVolumeChange,
  toggleMute,
  toggleFavorite,
  isFavorited,
  setShowSyncedLyrics,
  showSyncedLyrics,
  setShowMobilePlayer,
  formatTime,
  lyrics // plain text lyrics for fallback
}) => {
  const [showPlainLyrics, setShowPlainLyrics] = useState(false);

  return (
    <>
      <footer 
        onClick={() => {
          if (window.innerWidth < 768) {
            setShowMobilePlayer(true);
          }
        }}
        className="fixed bottom-0 left-0 right-0 h-24 bg-[#0a0b0d]/95 border-t border-zinc-800/60 backdrop-blur-lg z-50 px-4 sm:px-6 flex items-center justify-between shadow-2xl select-none cursor-pointer md:cursor-default"
      >
        
        {/* Progress Bar for Mobile (thin top-line tracker) */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-800/50 md:hidden">
          <div 
            className="h-full bg-[#00C896] transition-all duration-100" 
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }} 
          />
        </div>

        {/* Left Side: Current Song Info */}
        <div className="flex items-center gap-3 w-auto max-w-[70%] md:w-[28%] md:min-w-[240px]">
          {currentTrack ? (
            <>
              <img
                src={currentTrack.coverImage || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=120&h=120&fit=crop"}
                alt={currentTrack.title}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border border-zinc-850 object-cover flex-shrink-0 ${isPlaying ? "animate-[spin_24s_linear_infinite]" : ""}`}
              />
              <div className="overflow-hidden w-24 sm:w-36 md:w-40 flex-shrink-0">
                <div className="flex items-center gap-1.5 w-full">
                  <h4 className="text-[12px] md:text-[13px] font-bold text-white truncate leading-tight flex-1">
                    {currentTrack.title}
                  </h4>
                  <div className={`flex items-end gap-[1.5px] h-3 w-4 flex-shrink-0 mb-0.5 transition-opacity duration-200 ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-1" />
                    <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-2" />
                    <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-3" />
                    <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-4" />
                  </div>
                </div>
                <p className="text-zinc-500 text-[10px] md:text-[11px] font-medium truncate mt-0.5">{currentTrack.artist}</p>
              </div>
              
              {/* Favorite Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(currentTrack);
                }}
                className={`hidden md:block flex-shrink-0 cursor-pointer ${
                  isFavorited(currentTrack) 
                    ? "text-[#00C896]" 
                    : "text-zinc-500 hover:text-zinc-350"
                } transition-colors`}
              >
                <FiHeart size={16} fill={isFavorited(currentTrack) ? "currentColor" : "none"} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 text-zinc-500 text-xs font-semibold">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center">
                <FiMusic size={16} />
              </div>
              <div>No Song Loaded</div>
            </div>
          )}
        </div>

        {/* Center Section: Playback Controls & Progress Bar */}
        <div className="hidden md:flex flex-col items-center gap-2 w-[44%] max-w-[600px]" onClick={(e) => e.stopPropagation()}>
          
          {/* Action buttons */}
          <div className="flex items-center gap-5">
            
            {/* Shuffle Button */}
            <button 
              onClick={() => setIsShuffling(prev => !prev)}
              className={`text-base cursor-pointer ${isShuffling ? "text-[#00C896]" : "text-zinc-500 hover:text-white"} transition-colors`}
            >
              <BiShuffle size={18} />
            </button>

            {/* Prev Track Button */}
            <button 
              onClick={handlePrevTrack}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <BiSkipPrevious size={26} />
            </button>

            {/* Play/Pause Circle Button */}
            <button 
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              {isPlaying ? <FiPause size={14} className="text-black" /> : <FiPlay size={14} className="text-black translate-x-0.5" />}
            </button>

            {/* Next Track Button */}
            <button 
              onClick={handleNextTrack}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <BiSkipNext size={26} />
            </button>

            {/* Loop Button */}
            <button 
              onClick={() => setIsLooping(prev => !prev)}
              className={`text-base cursor-pointer ${isLooping ? "text-[#00C896]" : "text-zinc-500 hover:text-white"} transition-colors`}
            >
              <BiRepeat size={18} />
            </button>

          </div>

          {/* Seek Progress Bar */}
          <div className="flex items-center gap-3 w-full text-[10px] text-zinc-500 font-semibold select-none">
            <span>{formatTime(currentTime)}</span>
            <input 
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="flex-grow accent-[#00C896] bg-zinc-800"
              style={{
                background: `linear-gradient(to right, #00C896 0%, #00C896 ${(currentTime / (duration || 1)) * 100}%, #27272a ${(currentTime / (duration || 1)) * 100}%, #27272a 100%)`
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>

        {/* Right Section: Volume & Lyrics */}
        <div className="flex items-center justify-end gap-3 md:gap-4.5 w-auto md:w-[28%] md:min-w-[200px]" onClick={(e) => e.stopPropagation()}>
          
          {/* Mobile-only Play/Pause Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              {isPlaying ? <FiPause size={15} className="text-black" /> : <FiPlay size={15} className="text-black translate-x-0.5" />}
            </button>
          </div>

          {/* Lyrics toggle */}
          <button 
            onClick={() => setShowSyncedLyrics(true)}
            className={`hidden md:flex p-2 rounded-lg border border-zinc-850 bg-zinc-900/40 cursor-pointer ${
              showSyncedLyrics ? "border-[#00C896]/30 text-[#00C896]" : "text-zinc-500 hover:text-white hover:border-zinc-700"
            } transition-colors items-center justify-center`}
            title="Open Synced Lyrics"
          >
            <FiBookOpen size={15} />
          </button>

          {/* Volume speaker */}
          <button 
            onClick={toggleMute}
            className="hidden md:block text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
          </button>

          {/* Volume slider */}
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 accent-[#00C896] bg-zinc-800 hidden md:block"
            style={{
              background: `linear-gradient(to right, #00C896 0%, #00C896 ${(isMuted ? 0 : volume) * 100}%, #27272a ${(isMuted ? 0 : volume) * 100}%, #27272a 100%)`
            }}
          />

        </div>

      </footer>

      {/* Slide-up Plain Lyrics Panel Overlay */}
      {showPlainLyrics && (
        <div className="fixed bottom-26 left-4 right-4 sm:left-auto sm:right-8 sm:w-80 max-h-[50vh] bg-[#121318]/95 border border-zinc-800/80 rounded-2xl shadow-2xl z-[60] overflow-hidden backdrop-blur-md flex flex-col transition-all">
          <div className="p-4 border-b border-zinc-800/40 flex justify-between items-center bg-zinc-900/50">
            <h4 className="font-bold text-xs text-[#00C896] uppercase tracking-wider">Song Lyrics</h4>
            <button 
              onClick={() => setShowPlainLyrics(false)}
              className="text-[10px] text-zinc-500 hover:text-white font-semibold uppercase transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
          <div className="p-5 overflow-y-auto flex-grow text-[11px] leading-relaxed text-zinc-300 font-medium text-center custom-scrollbar" data-lenis-prevent>
            {lyrics ? (
              lyrics.split("\n").map((line, i) => (
                <p key={i} className="mb-2.5 hover:text-[#00C896] transition-colors duration-150 font-sans">
                  {line}
                </p>
              ))
            ) : (
              <p className="text-zinc-500 py-16">
                {currentTrack 
                  ? "Fetching lyrics for this track..." 
                  : "No lyrics available. Please select a song."}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BottomPlayer;
