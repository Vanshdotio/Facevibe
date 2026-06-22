import React from "react";
import { useNavigate } from "react-router-dom";

// Custom SVG Icons
const MusicNoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18V5L21 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FeaturesGrid = () => {
  const features = [
    { title: "Emotion Detection", desc: "Millisecond facial feature scanning." },
    { title: "Smart Playlists", desc: "Dynamic playlist transitions." },
    { title: "Real-time AI", desc: "On-device neural network processing." },
    { title: "Mood History", desc: "Personal analytics charts." },
    { title: "Privacy First", desc: "Local analysis (data never leaves)." },
    { title: "Offline Mode", desc: "Cache your favorite emotion matches." }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {features.map((f, i) => (
        <div key={i} className="border border-white/5 bg-zinc-950/40 p-5 rounded-2xl flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-[#00C896]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h4 className="text-white font-bold text-sm">{f.title}</h4>
          <p className="text-zinc-500 text-xs leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#070708] text-white selection:bg-white selection:text-black overflow-x-hidden font-sans pt-28 pb-16">
      {/* Decorative spatial background rings */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] max-w-[850px] aspect-square rounded-full border border-white/5 pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-1/4 -translate-x-1/2 w-[55%] max-w-[550px] aspect-square rounded-full border border-white/5 pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-0 left-6 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-sm font-semibold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        {/* Hero Header */}
        <div className="text-center mt-8 max-w-2xl">
          <div className="w-16 h-16 bg-[#00C896]/10 border border-[#00C896]/20 rounded-2xl flex items-center justify-center text-[#00C896] mb-6 mx-auto">
            <MusicNoteIcon />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Facevibe
          </h1>
          <div className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-[10px] font-bold text-zinc-400 mt-4 tracking-wider uppercase">
            v2.4.1
          </div>
          <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed">
            Revolutionizing the way you experience music through cutting-edge AI technology and emotional intelligence.
          </p>
        </div>

        {/* 3-Column Stats Row */}
        <div className="w-full max-w-4xl grid grid-cols-3 gap-6 sm:gap-10 mt-16 py-8 border-y border-white/5 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00C896] tracking-tight">2M+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
              Users Worldwide
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00C896] tracking-tight">50K+</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
              Songs Curated
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00C896] tracking-tight">98%</div>
            <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-1">
              Detection Accuracy
            </div>
          </div>
        </div>

        {/* Two-Column Content Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mt-20 items-start">
          {/* Left Column: Mission & How It Works */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Our Mission Glassmorphism Card */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white tracking-tight mb-4">Our Mission</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                At Facevibe, we believe music is more than just sound—it's an emotional journey. Our mission is to bridge the gap between human emotion and musical expression. By utilizing on-device, privacy-first facial cues analysis, we match your exact mood with real-time recommendations, creating the perfect soundtrack for every moment of your life.
              </p>
            </div>

            {/* How It Works Steps */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white tracking-tight">How It Works</h3>
              <div className="flex flex-col gap-5">
                {/* Step 1 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00C896] text-black font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-md shadow-[#00C896]/20">
                    1
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mt-1">Facial Capture</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                      Enable your camera and let our lightweight AI model analyze subtle micro-expressions in milliseconds.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00C896] text-black font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-md shadow-[#00C896]/20">
                    2
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mt-1">Emotion Mapping</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                      Cues are processed locally to establish your current emotional quadrant (e.g. calm, energetic, happy).
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00C896] text-black font-bold flex items-center justify-center flex-shrink-0 text-sm shadow-md shadow-[#00C896]/20">
                    3
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mt-1">Curated Playlist</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                      Enjoy a dynamically matching, high-quality audio stream sourced directly from our independent Audius integrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Outline Icons Grid & Meet the Team */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* 6-Feature Grid */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Key Features</h3>
              <FeaturesGrid />
            </div>

            {/* Meet the Team */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold text-white tracking-tight">Meet the Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Member 1 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/20 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    AK
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">Alon K.</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">AI Engineering Lead</p>
                  </div>
                </div>

                {/* Member 2 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/20 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    SR
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">Sarah R.</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">UX Research & Design</p>
                  </div>
                </div>

                {/* Member 3 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/20 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    MJ
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">Michael J.</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">DevOps & Cloud Systems</p>
                  </div>
                </div>

                {/* Member 4 */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950/20 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    JL
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">Jessica L.</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Product Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered Get in Touch Form Card */}
        <div className="w-full max-w-2xl bg-[#0c0c0e]/80 border border-white/5 p-10 rounded-3xl text-center mt-24 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-radial-gradient from-[#00C896]/5 to-transparent pointer-events-none" />
          
          <div className="w-12 h-12 rounded-2xl bg-[#00C896]/10 border border-[#00C896]/20 text-[#00C896] flex items-center justify-center mx-auto mb-6">
            <MailIcon />
          </div>
          
          <h2 className="text-2xl font-bold text-white tracking-tight relative z-10 leading-tight">
            Get in Touch
          </h2>
          <p className="mt-2 text-zinc-400 text-sm max-w-md mx-auto relative z-10 leading-relaxed">
            Have questions about Facevibe? Our support team is ready to assist you.
          </p>
          
          <div className="mt-8 relative z-10 flex flex-col items-center gap-4">
            <a
              href="mailto:support@facevibe.com"
              className="text-[#00C896] hover:text-[#00b285] text-base font-semibold tracking-tight transition-colors duration-200"
            >
              support@facevibe.com
            </a>
            
            <a
              href="mailto:support@facevibe.com"
              className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-6 py-3 rounded-full mt-2 transition-all duration-200 active:scale-95 shadow-lg shadow-white/5 inline-block"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Minimal inline copyright footer */}
        <div className="mt-28 w-full border-t border-white/5 pt-8 text-center text-zinc-600 text-xs font-medium tracking-tight">
          © 2026 Facevibe. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
