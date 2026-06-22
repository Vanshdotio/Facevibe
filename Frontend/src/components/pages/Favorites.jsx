import React from "react";

const Favorites = () => {
  const favoriteTracks = [
    { id: 1, title: "Quiet Horizons", artist: "Assets", mood: "Calm", gradient: "from-indigo-500 to-purple-600" },
    { id: 2, title: "Slow Light", artist: "Marco Laine", mood: "Focused", gradient: "from-pink-500 to-rose-600" },
    { id: 3, title: "Drift Theory", artist: "Rival", mood: "Relaxed", gradient: "from-teal-500 to-emerald-600" }
  ];

  return (
    <div className="pt-20 pb-12 px-6 md:px-12 bg-[#070708] min-h-screen font-sans text-white max-w-4xl mx-auto flex flex-col gap-6 select-none">
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
          Favorite Soundtracks
        </h1>
        <p className="text-neutral-400 text-sm">
          Your curation of tracks that perfectly matched your previous emotional states.
        </p>
      </div>

      <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col gap-3">
        {favoriteTracks.length > 0 ? (
          favoriteTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] border border-white/[0.02] hover:border-white/5 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded bg-gradient-to-br ${track.gradient} flex-shrink-0 flex items-center justify-center text-xs font-bold`}>
                  ♫
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white leading-tight">{track.title}</h4>
                  <p className="text-xs text-neutral-500">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-neutral-300">
                  {track.mood}
                </span>
                <button className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#00C896] group-hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-neutral-500">
            No favorite tracks saved yet. Start scanning your mood to discover recommendations!
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
