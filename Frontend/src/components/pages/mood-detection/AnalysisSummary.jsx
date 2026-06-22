import React from "react";

const AnalysisSummary = ({ detectedMood, activeMoodInfo }) => {
  return (
    <div className="bg-[#121318] border border-zinc-800/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Analysis Summary</h3>
      
      <div className="flex flex-col text-xs">
        
        {/* Row 1 */}
        <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/40">
          <span className="text-zinc-500 font-medium">Detected Emotion</span>
          <span className="text-white font-bold capitalize">{detectedMood || "None"}</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/40">
          <span className="text-zinc-500 font-medium">Energy Level</span>
          {detectedMood ? (
            <div className="flex items-center gap-2">
              <div className="flex items-end gap-[3px] h-3">
                {activeMoodInfo.pills.map((fill, i) => (
                  <span 
                    key={i} 
                    className={`w-[3px] rounded-full transition-colors ${
                      i === 0 ? "h-2" : i === 1 ? "h-3" : i === 2 ? "h-2.5" : "h-1.5"
                    } ${fill ? "bg-[#00C896]" : "bg-zinc-700"}`} 
                  />
                ))}
              </div>
              <span className="text-white font-bold">{activeMoodInfo.energy}</span>
            </div>
          ) : (
            <span className="text-zinc-500 font-semibold">—</span>
          )}
        </div>

        {/* Row 3 */}
        <div className="flex items-center justify-between py-2.5 border-b border-zinc-800/40">
          <span className="text-zinc-500 font-medium">Suggested Genre</span>
          <span className="text-white font-bold">{detectedMood ? activeMoodInfo.genre : "None"}</span>
        </div>

        {/* Row 4 */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-zinc-500 font-medium">Recommended Time</span>
          <span className="text-white font-bold">Morning</span>
        </div>

      </div>
    </div>
  );
};

export default AnalysisSummary;
