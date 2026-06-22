import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  return (
    <footer className="w-full bg-black border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section: Logo */}
        <div
          onClick={toHome}
          className="flex items-center gap-3 cursor-pointer select-none font-[Space_Grotesk]"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <rect x="3" y="10" width="3" height="4" rx="1.5" fill="currentColor" />
              <rect x="8" y="7" width="3" height="10" rx="1.5" fill="currentColor" />
              <rect x="13" y="5" width="3" height="14" rx="1.5" fill="currentColor" />
              <rect x="18" y="9" width="3" height="6" rx="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Facevibe</span>
        </div>

        {/* Right Section: Copyright Info */}
        <div className="text-zinc-600 text-xs font-medium tracking-tight">
          © 2026 Facevibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

