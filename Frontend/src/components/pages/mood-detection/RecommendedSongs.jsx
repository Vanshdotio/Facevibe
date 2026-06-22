import React from "react";
import { FiSearch, FiPlay, FiPause } from "react-icons/fi";

const RecommendedSongs = ({
  filteredSongs,
  currentTrack,
  isPlaying,
  selectTrack,
  togglePlay,
  detectedMood,
  activeMoodInfo,
  searchQuery,
  setSearchQuery,
  moodColors,
  scrollRef
}) => {
  return (
    <div className="lg:col-span-8 flex flex-col h-full min-h-0 bg-[#121318] border border-zinc-800/60 rounded-2xl p-4 sm:p-6 overflow-hidden">
      
      {/* Header area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800/40 pb-5 flex-shrink-0">
        <div>
          <h2 className="text-base font-bold text-white">Recommended Songs</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Based on your latest mood analysis.</p>
        </div>

        <div className="flex items-center gap-2.5">
          {detectedMood && (
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#F59E0B]`}>
              <span>{activeMoodInfo.emoji}</span>
              <span className="capitalize">{detectedMood} Mood</span>
            </div>
          )}

          <button className="border border-zinc-800 bg-[#1c1c1f]/40 hover:border-zinc-700 hover:text-white transition-colors text-zinc-300 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Search filter for mobile view */}
      <div className="relative mt-4 block md:hidden w-full flex-shrink-0">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          <FiSearch size={14} />
        </span>
        <input
          type="text"
          placeholder="Search recommended songs..."
          className="w-full bg-[#1c1c1f] border border-zinc-800/60 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#00C896] placeholder-zinc-500 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Curation Songs Table Scroll Wrapper */}
      <div ref={scrollRef} className="overflow-y-auto mt-4 w-full flex-grow pr-1 custom-scrollbar">
        <div className="flex flex-col">
          <table className="w-full text-left border-collapse select-none">
            <thead className="sticky top-0 bg-[#121318] z-10">
              <tr className="border-b border-zinc-800/40 text-[10px] text-zinc-500 font-bold uppercase tracking-wider bg-[#121318]">
                <th className="py-3.5 px-2 sm:px-3 w-10 min-w-[40px] bg-[#121318]">#</th>
                <th className="py-3.5 px-2 sm:px-3 w-[65%] sm:w-[55%] bg-[#121318]">Title</th>
                <th className="py-3.5 px-2 sm:px-3 w-[20%] bg-[#121318]">Mood</th>
                <th className="py-3.5 px-2 sm:px-3 w-[12%] hidden sm:table-cell bg-[#121318]">Duration</th>
                <th className="py-3.5 px-2 sm:px-3 w-[10%] sm:w-[8%] text-center bg-[#121318]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/20 text-xs">
              {filteredSongs.length > 0 ? (
                filteredSongs.map((track, idx) => {
                  const isCurrent = currentTrack && currentTrack.title.toLowerCase() === track.title.toLowerCase();
                  const trackMoodInfo = moodColors[track.mood?.toLowerCase()] || moodColors.happy;

                  return (
                    <tr 
                      key={idx} 
                      onClick={() => selectTrack(track)}
                      className={`hover:bg-zinc-800/20 group transition-colors cursor-pointer ${isCurrent ? "bg-[#1c1d24]/50" : ""}`}
                    >
                      {/* Index */}
                      <td className={`py-3 px-2 sm:px-3 font-medium w-10 min-w-[40px] ${isCurrent ? "text-[#00C896]" : "text-zinc-500"}`}>
                        {isCurrent && isPlaying ? (
                          <div className="flex items-end gap-[2px] h-3.5 w-5 justify-start">
                            <span className="w-[2.5px] bg-[#00C896] rounded-full h-full animate-eq-1" />
                            <span className="w-[2.5px] bg-[#00C896] rounded-full h-full animate-eq-2" />
                            <span className="w-[2.5px] bg-[#00C896] rounded-full h-full animate-eq-3" />
                            <span className="w-[2.5px] bg-[#00C896] rounded-full h-full animate-eq-4" />
                          </div>
                        ) : (
                          idx + 1
                        )}
                      </td>

                      {/* Title & Cover */}
                      <td className="py-3 px-2 sm:px-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <img
                            src={track.coverImage || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop"}
                            alt={track.title}
                            className="w-10 h-10 rounded-lg object-cover border border-zinc-800/50 flex-shrink-0"
                          />
                          <div className="overflow-hidden">
                            <h4 className={`font-semibold truncate text-[13px] ${isCurrent ? "text-[#00C896]" : "text-white"}`}>
                              {track.title}
                            </h4>
                            <p className="text-zinc-500 text-[11px] font-medium truncate mt-0.5">{track.artist}</p>
                          </div>
                        </div>
                      </td>

                      {/* Mood Tag */}
                      <td className="py-3 px-2 sm:px-3">
                        <div className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] font-semibold flex items-center justify-center gap-1.5 border w-fit ${trackMoodInfo.bg} ${trackMoodInfo.border} ${trackMoodInfo.text}`}>
                          <span>{trackMoodInfo.emoji}</span>
                          <span className="hidden sm:inline capitalize">{track.mood}</span>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-3 px-2 sm:px-3 text-zinc-500 font-medium hidden sm:table-cell">
                        {track.duration}
                      </td>

                      {/* Play Button Row */}
                      <td className="py-3 px-2 sm:px-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center">
                          {isCurrent && isPlaying ? (
                            <button 
                              onClick={() => togglePlay()}
                              className="w-8 h-8 rounded-full bg-[#00C896] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-[#00C896]/10 cursor-pointer"
                            >
                              <FiPause size={12} className="text-black" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => selectTrack(track)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                                isCurrent 
                                  ? "bg-[#00C896] text-black shadow-lg" 
                                  : "border border-zinc-800 bg-[#1c1c1f]/40 text-zinc-300 hover:border-[#00C896] hover:text-[#00C896]"
                              }`}
                            >
                              <FiPlay size={12} className={isCurrent ? "text-black translate-x-0.5" : "translate-x-0.5"} />
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-zinc-500 font-medium">
                    No songs found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSongs;
