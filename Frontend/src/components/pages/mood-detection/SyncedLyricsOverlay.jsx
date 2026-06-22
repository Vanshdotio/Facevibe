import React from "react";
import { 
  FiHeart, FiPause, FiPlay, FiVolumeX, FiVolume2, FiBookOpen 
} from "react-icons/fi";
import { 
  BiShuffle, BiRepeat, BiSkipPrevious, BiSkipNext 
} from "react-icons/bi";

const SyncedLyricsOverlay = ({
  showSyncedLyrics,
  setShowSyncedLyrics,
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
  syncedLyrics,
  currentLyricIndex,
  audioRef,
  setCurrentTime,
  activeLineRef,
  volume,
  isMuted,
  handleVolumeChange,
  toggleMute,
  setShowMobilePlayer
}) => {
  return (
    <div className="fixed inset-0 bg-[#0F1115]/95 z-[70] flex flex-col justify-between select-none font-sans text-white backdrop-blur-2xl animate-fade-in w-full overflow-x-hidden">
      
      {/* Blurred Background Art */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-35">
        <img 
          src={currentTrack.coverImage || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop"} 
          alt="Blurred Background"
          className="w-full h-full object-cover scale-125 blur-3xl"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-zinc-800/10">
        <button 
          onClick={() => {
            setShowSyncedLyrics(false);
            if (window.innerWidth < 768) {
              setShowMobilePlayer(true);
            }
          }}
          className="p-2 -ml-2 text-zinc-400 hover:text-white cursor-pointer"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        
        <div className="text-center max-w-[60%]">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Playing From Facevibe</h3>
          <p className="text-[13px] font-bold text-white truncate mt-0.5 capitalize">{currentTrack.title}</p>
        </div>
        
        <div className="w-10" />
      </div>

      {/* Synced Lyrics List Container */}
      <div className="flex-grow overflow-y-auto px-6 py-12 flex flex-col gap-6 scroll-smooth custom-scrollbar align-center justify-start text-center" data-lenis-prevent>
        <div className="h-[25vh]" />
        
        {syncedLyrics.map((line, idx) => {
          const isActive = idx === currentLyricIndex;
          return (
            <div 
              key={idx}
              ref={isActive ? activeLineRef : null}
              className="py-1"
            >
              <span
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = line.time;
                    setCurrentTime(line.time);
                  }
                }}
                className={`inline-block py-1.5 px-4 rounded-xl cursor-pointer transition-all duration-300 transform origin-center ${
                  isActive 
                    ? "text-[#00C896] text-xl sm:text-2xl font-bold scale-105 opacity-100" 
                    : "text-zinc-400 text-base sm:text-lg font-semibold opacity-40 hover:opacity-75 hover:scale-101"
                }`}
              >
                {line.text}
              </span>
            </div>
          );
        })}
        
        <div className="h-[35vh]" />
      </div>

      {/* Bottom Audio Player Bar inside Lyrics Page */}
      <div className="bg-[#0a0b0d]/95 border-t border-zinc-800/60 backdrop-blur-lg px-4 sm:px-6 py-4 flex items-center justify-between z-10 w-full select-none relative h-24 flex-shrink-0">
        
        {/* Left Side: Current Song Info */}
        <div className="flex items-center gap-3 w-auto max-w-[70%] md:w-[28%] md:min-w-[240px]">
          <img
            src={currentTrack.coverImage || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop"}
            alt={currentTrack.title}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-lg border border-zinc-850 object-cover flex-shrink-0 ${isPlaying ? "animate-[spin_24s_linear_infinite]" : ""}`}
          />
          <div className="overflow-hidden w-24 sm:w-36 md:w-40 flex-shrink-0">
            <div className="flex items-center gap-1.5 w-full">
              <h4 className="text-[12px] md:text-[13px] font-bold text-white truncate leading-tight flex-1">
                {currentTrack.title}
              </h4>
              {isPlaying && (
                <div className="flex items-end gap-[1.5px] h-3 w-4 flex-shrink-0 mb-0.5">
                  <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-1" />
                  <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-2" />
                  <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-3" />
                  <span className="w-[1.5px] bg-[#00C896] rounded-full h-full animate-eq-4" />
                </div>
              )}
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
        </div>

        {/* Center Section: Playback Controls & Progress Bar (Desktop only) */}
        <div className="hidden md:flex flex-col items-center gap-2 w-[44%] max-w-[600px]">
          
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
        <div className="flex items-center justify-end gap-3 md:gap-4.5 w-auto md:w-[28%] md:min-w-[200px]">
          
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

          {/* Lyrics toggle (Highlighted since it's open) */}
          <button 
            onClick={() => setShowSyncedLyrics(false)}
            className="hidden md:flex p-2 rounded-lg border border-[#00C896]/30 bg-zinc-900/40 cursor-pointer text-[#00C896] transition-colors items-center justify-center"
            title="Close Synced Lyrics"
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

      </div>

    </div>
  );
};

export default SyncedLyricsOverlay;
