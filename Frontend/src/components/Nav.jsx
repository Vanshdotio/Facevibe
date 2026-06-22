import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };
  const toLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      let navbar = navRef.current;
      if (!navbar) return;
      let currentScroll = window.pageYOffset;

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)"; // Hide navbar
      } else {
        navbar.style.transform = "translateY(0)"; // Show navbar
      }
      lastScrollTop = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0F1115]/70 backdrop-blur-md border-b border-white/[0.02] transition-transform duration-300 ease-in-out"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div
          onClick={toHome}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z"/>
            </svg>
          </div>
          <span className="text-white font-semibold text-[15px] tracking-tight">Facevibe</span>
        </div>

        {/* Center Section: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#pricing" className="hover:text-white transition-colors duration-200">
            Pricing
          </a>
          <a href="/about" className="hover:text-white transition-colors duration-200">
            About
          </a>
        </nav>

        {/* Right Section: Auth Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/moodDetection")}
                className="text-xs bg-[#00C896] hover:bg-[#00D9A3] text-black px-4 py-1.5 rounded-full font-bold transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Go to Player
              </button>
              <img
                src={user.avatar || "https://i.pravatar.cc/40"}
                alt="avatar"
                className="w-8 h-8 rounded-full border border-white/20"
              />
              <span className="text-white text-xs hidden sm:inline">{user.name || user.fullName}</span>
              <button
                onClick={logout}
                className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <button
                onClick={toLogin}
                className="text-zinc-400 text-xs font-medium hover:text-white transition-colors cursor-pointer"
              >
                Sign in
              </button>
              <button
                onClick={toLogin}
                className="bg-[#00C896] hover:bg-[#00D9A3] text-black text-[11px] font-semibold px-4.5 py-2.25 rounded-full flex items-center gap-1.25 transition-all duration-200 active:scale-95 shadow-md shadow-[#00C896]/10 cursor-pointer"
              >
                Get Started
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[3] ml-1.25"
                >
                  <path
                    d="M9 5L16 12L9 19"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
