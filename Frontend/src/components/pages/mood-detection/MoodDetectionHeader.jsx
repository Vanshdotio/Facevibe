import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell } from "react-icons/fi";

const MoodDetectionHeader = ({
  searchQuery,
  setSearchQuery,
  user,
  logout,
  showProfileMenu,
  setShowProfileMenu,
  profileMenuRef
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-[#0F1115] border-b border-zinc-800/40 z-40 px-4 sm:px-8 flex items-center justify-between select-none">
      
      {/* Logo */}
      <div 
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-black"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-8z"/>
          </svg>
        </div>
        <div>
          <span className="text-white font-bold text-[15px] tracking-tight block">Facevibe</span>
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block -mt-0.5">AI Music Discovery</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="relative max-w-md w-full mx-6 hidden md:block">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
          <FiSearch size={16} />
        </span>
        <input
          type="text"
          placeholder="Search songs..."
          className="w-full bg-[#1c1c1f] border border-zinc-800/60 rounded-xl pl-10 pr-4 py-2.25 text-sm text-white focus:outline-none focus:border-[#00C896] placeholder-zinc-500 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-5">
        <button className="relative w-9 h-9 rounded-full bg-[#1c1c1f]/50 border border-zinc-800/40 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer">
          <FiBell size={16} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00C896] border border-[#0F1115]" />
        </button>

        {/* User initials circle with click logout dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setShowProfileMenu(prev => !prev)}
            className="w-9 h-9 rounded-full bg-[#1c1c1f] border border-zinc-800/80 hover:border-zinc-700 text-white text-xs font-bold flex items-center justify-center uppercase select-none transition-colors cursor-pointer"
          >
            {user ? (user.name ? user.name.substring(0, 2) : (user.fullName ? user.fullName.substring(0, 2) : "JD")) : "JD"}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2.5 w-48 bg-[#16181f] border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50">
              <div className="px-4 py-2 border-b border-zinc-800/60">
                <p className="text-xs text-zinc-400">Signed in as</p>
                <p className="text-xs font-semibold text-white truncate">{user?.fullName || user?.name || user?.email}</p>
              </div>
              <button 
                onClick={() => navigate("/")}
                className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:bg-zinc-800/50 hover:text-white transition-colors"
              >
                Landing Page
              </button>
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-zinc-800/40"
              >
                Logout Account
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MoodDetectionHeader;
