import React from "react";
import { FiCamera } from "react-icons/fi";

const FaceScanner = ({
  cameraActive,
  capturedImage,
  scanState,
  handleScanMood,
  handleRetake,
  videoRef,
  canvasRef
}) => {
  return (
    <div className="bg-[#121318] border border-zinc-800/60 rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">Face Scanner</h3>
        <span className="text-xs font-semibold text-[#00C896] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
          Ready
        </span>
      </div>

      {/* Camera Box */}
      <div className="bg-[#0b0c0f] border border-zinc-900 rounded-xl h-56 flex items-center justify-center relative overflow-hidden">
        
        {/* Live Video Stream */}
        {cameraActive && (
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {/* Snapshot Display */}
        {capturedImage && (
          <img 
            src={capturedImage} 
            alt="Captured face" 
            className="w-full h-full object-cover rounded-xl" 
          />
        )}

        {/* Ready placeholder overlay */}
        {!cameraActive && !capturedImage && (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-24 h-24 rounded-full border border-dashed border-[#00C896]/30 flex items-center justify-center text-[#00C896]/60">
              <div className="w-20 h-20 rounded-full border border-dashed border-[#00C896]/60 flex flex-col items-center justify-center gap-1.5">
                <FiCamera size={20} />
                <span className="text-[8px] tracking-wider uppercase font-semibold">Ready</span>
              </div>
            </div>
            <span className="text-xs text-zinc-500 font-medium">Ready to scan</span>
          </div>
        )}

        {/* Scanning visual sweep laser */}
        {scanState === "scanning" && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-[#00C896]/5 pointer-events-none" />
            <div className="laser-beam absolute left-0 w-full h-0.5 bg-[#00C896] shadow-[0_0_10px_#00C896] pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs text-xs font-semibold tracking-widest text-[#00C896] uppercase">
              Analyzing Face...
            </div>
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Scan Buttons */}
      <div className="flex flex-col items-center">
        <button 
          onClick={handleScanMood}
          disabled={scanState === "scanning"}
          className={`w-full bg-[#00C896] hover:bg-[#00D9A3] disabled:bg-[#00C896]/40 text-black py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <line x1="7" y1="12" x2="17" y2="12" />
          </svg>
          {scanState === "scanning" ? "Scanning..." : "Scan Mood"}
        </button>

        {(cameraActive || capturedImage || scanState === "success") && (
          <button 
            onClick={handleRetake}
            className="text-zinc-500 hover:text-white text-xs font-semibold mt-3.5 transition-colors cursor-pointer"
          >
            Retake
          </button>
        )}
      </div>
    </div>
  );
};

export default FaceScanner;
