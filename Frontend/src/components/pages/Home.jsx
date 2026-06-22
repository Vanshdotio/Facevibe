import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orb from "../Orb";
import SpotlightCard from "../SpotlightCard";

// Beautiful SVG Icons for Capabilities
const RealTimeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M15 3H12V5H15V3Z" fill="currentColor" />
    <path d="M9 3H6V5H9V3Z" fill="currentColor" />
    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C13.2544 3 14.4503 3.25684 15.5398 3.72252L17.0654 2.1969C15.5492 1.4287 13.8248 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 10.1752 22.5713 8.45077 21.8031 6.93457L20.2775 8.46018C20.7432 9.54967 21 10.7456 21 12Z" fill="currentColor" />
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AdaptiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="6" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    <circle cx="16" cy="12" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    <circle cx="10" cy="18" r="2.5" fill="currentColor" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const RecommendationsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 3L14.5 8.5L20 9.5L16 13.5L17 19L12 16.5L7 19L8 13.5L4 9.5L9.5 8.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PrivateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IntegrationsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M9 12H15M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="15" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="15" y="15" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="15" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 9L13 14L10 11L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState([false, false, false]);

  const toMoodDetection = () => {
    navigate("/moodDetection");
  };

  const toRegister = () => {
    navigate("/register");
  };

  const togglePlayTrack = (index) => {
    setIsPlaying((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-sans pt-20">
      {/* Planetary decorative giant background circle */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] aspect-square rounded-full border border-white/5 pointer-events-none z-0" />
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 z-10 min-h-[calc(100vh-5rem)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-20 lg:pt-0 pb-12 lg:pb-0">
        {/* Left Column: Heading and Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-[11px] font-semibold text-zinc-300 tracking-wide uppercase">
              AI-Powered Emotion Detection
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-[4.2rem] font-extrabold tracking-tight leading-[1.05] text-white">
            Music That Understands <br />
            <span className="text-zinc-500 font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-500">
              How You Feel.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
            An AI-powered music experience that detects your emotion and instantly recommends the perfect soundtrack.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <button
              onClick={toMoodDetection}
              className="bg-brand hover:bg-brand-hover text-black text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-lg shadow-brand/10 cursor-pointer"
            >
              Try Demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[3]">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#features"
              className="text-zinc-300 hover:text-white text-sm font-semibold flex items-center gap-1 transition-colors duration-200 cursor-pointer"
            >
              Learn More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Stats Row */}
          <div className="mt-10 pt-6 border-t border-white/5 w-full grid grid-cols-3 gap-2 sm:gap-6">
            <div className="pr-4">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">12M+</div>
              <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                Moods Analyzed
              </div>
            </div>
            <div className="pl-4 sm:pl-6 border-l border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">98%</div>
              <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                Accuracy Rate
              </div>
            </div>
            <div className="pl-4 sm:pl-6 border-l border-white/5">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">200K</div>
              <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
                Active Users
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Mockup Scanning Player */}
        <div className="lg:col-span-5 flex justify-center w-full relative">
          {/* Subtle glow behind the card */}
          <div className="absolute inset-0 bg-brand/5 rounded-3xl blur-3xl -z-10" />

          <div className="bg-[#0c0c0e]/85 backdrop-blur-md border border-white/5 rounded-3xl p-5 w-full max-w-[340px] shadow-2xl flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Scanning emotion...
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-500 hover:text-white cursor-pointer">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Circular Scanning Avatar Container */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              {/* Outer Scanning Ring */}
              <svg className="absolute w-[112%] h-[112%] -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="rgba(255, 255, 255, 0.02)"
                  strokeWidth="1.5"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#00C896"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray="289"
                  strokeDashoffset="140"
                  className="animate-[spin_10s_linear_infinite]"
                  style={{ transformOrigin: "50% 50%" }}
                />
              </svg>

              {/* Inner Circle Ring with Avatar */}
              <div className="absolute w-28 h-28 rounded-full border border-white/10 overflow-hidden bg-zinc-950 flex items-center justify-center">
                <img
                  src="/assets/scanning_avatar.png"
                  alt="Scanning Face"
                  className="w-full h-full object-cover grayscale brightness-95"
                />
              </div>
            </div>

            {/* Detected Mood Status Card */}
            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                  Detected Mood
                </div>
                <div className="text-xs font-bold text-white mt-0.5">
                  Calm & Focused
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center border border-brand/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="currentColor" />
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Recommended Tracks Header */}
            <div className="flex justify-between items-center border-t border-white/5 pt-3.5">
              <span className="text-[11px] font-semibold text-zinc-400">Recommended for you</span>
              <span className="text-[10px] text-zinc-500">3 tracks</span>
            </div>

            {/* Tracks List */}
            <div className="flex flex-col gap-2">
              {/* Track 1 */}
              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-semibold text-white">Quiet Horizons</h4>
                    <p className="text-[9px] text-zinc-500">Aurelia</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePlayTrack(0)}
                  className="w-6.5 h-6.5 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  {isPlaying[0] ? (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="4" height="16" />
                      <rect x="16" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Track 2 */}
              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-orange-400 to-yellow-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-semibold text-white">Slow Light</h4>
                    <p className="text-[9px] text-zinc-500">Mona & Léo</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePlayTrack(1)}
                  className="w-6.5 h-6.5 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  {isPlaying[1] ? (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="4" height="16" />
                      <rect x="16" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Track 3 */}
              <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <div className="w-7 h-7 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-semibold text-white">Drift Theory</h4>
                    <p className="text-[9px] text-zinc-500">Rever</p>
                  </div>
                </div>
                <button
                  onClick={() => togglePlayTrack(2)}
                  className="w-6.5 h-6.5 rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  {isPlaying[2] ? (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="4" height="16" />
                      <rect x="16" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5V19L19 12L8 5Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 py-28 z-10 text-center">
        {/* Decorative Green Light Orb */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-block px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 mb-6">
          <span className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
            Capabilities
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-[3.2rem] font-bold text-white tracking-tight">
          Everything you need to feel the music
        </h2>

        {/* Description */}
        <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          A complete emotion-aware engine that turns how you feel into the perfect listening experience.
        </p>

        {/* Features Card Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <RealTimeIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Real-time Detection</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Our vision model reads micro-expressions in milliseconds to understand your current emotional state.
            </p>
          </SpotlightCard>

          {/* Card 2 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <AdaptiveIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Adaptive Soundtracks</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Playlists that shift seamlessly as your mood evolves throughout the day, with no manual input.
            </p>
          </SpotlightCard>

          {/* Card 3 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <RecommendationsIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Smart Recommendations</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              A recommendation engine trained on millions of mood-to-music pairings for uncanny accuracy.
            </p>
          </SpotlightCard>

          {/* Card 4 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <PrivateIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Private by Design</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              All processing happens on-device. Your facial data never leaves your machine, ever.
            </p>
          </SpotlightCard>

          {/* Card 5 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <IntegrationsIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Team Integrations</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Sync Facevibe into Spotify, Apple Music, and your favorite workspace tools with a single click.
            </p>
          </SpotlightCard>

          {/* Card 6 */}
          <SpotlightCard className="bg-[#0b0b0d]/70 border border-white/5 p-8 rounded-2xl flex flex-col items-start text-left gap-4 hover:border-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
              <AnalyticsIcon />
            </div>
            <h3 className="text-lg font-bold text-white">Mood Analytics</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Track emotional trends over weeks and discover the music that genuinely lifts your spirit.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        <div className="w-full bg-gradient-to-br from-[#00261c] via-[#003829] to-[#001c15] border border-brand/10 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center gap-6">
          {/* Accent light glow */}
          <div className="absolute inset-0 bg-radial-gradient from-brand/10 to-transparent pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl md:text-[3.2rem] font-bold text-white tracking-tight relative z-10 leading-tight">
            Let your emotions choose the music
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto relative z-10 leading-relaxed">
            Start your free trial today. No credit card required, cancel anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 relative z-10">
            <button
              onClick={toMoodDetection}
              className="bg-brand hover:bg-brand-hover text-black text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-lg shadow-brand/10 cursor-pointer"
            >
              Try Demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[3]">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={toRegister}
              className="text-white bg-transparent  hover:text-zinc-300 text-sm font-semibold flex items-center gap-1 transition-colors duration-200 cursor-pointer"
            >
              Learn More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
