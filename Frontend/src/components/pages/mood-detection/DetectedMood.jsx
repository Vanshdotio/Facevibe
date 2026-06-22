import React from "react";

const DetectedMood = ({ detectedMood, confidence, activeMoodInfo }) => {
  return (
    <div className="bg-[#121318] border border-zinc-800/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Detected Mood</h3>
      
      {detectedMood ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl leading-none">{activeMoodInfo.emoji}</span>
              <div>
                <h4 className="text-base font-bold text-white leading-tight capitalize">{activeMoodInfo.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Confidence: {confidence}%</p>
              </div>
            </div>
            <span className={`px-2 py-0.75 rounded-md text-[10px] font-bold border ${activeMoodInfo.bg} ${activeMoodInfo.border} ${activeMoodInfo.text}`}>
              High
            </span>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5 mt-1">
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium">
              <span>Confidence</span>
              <span className={activeMoodInfo.text}>{confidence}%</span>
            </div>
            <div className="w-full h-2 bg-[#1c1c1f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00C896] rounded-full transition-all duration-500" 
                style={{ width: `${confidence}%` }} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-zinc-500 text-xs font-medium py-4 text-center">
          Scan your mood to view emotional analysis.
        </div>
      )}
    </div>
  );
};

export default DetectedMood;
