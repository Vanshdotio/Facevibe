import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// AuthToggle.jsx
// Shows user's avatar + dropdown when logged in, otherwise shows Login / Signup buttons.
// Tailwind classes used so it fits nicely into most navbars.

export default function AuthToggle() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // helper: initials fallback when no avatar image
  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {user ? (
        // Logged-in view: avatar + small dropdown
        <div className="flex items-center">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:shadow-md focus:outline-none"
            aria-expanded={open}
            aria-label="Open user menu"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || "user avatar"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                {initials(user.name)}
              </div>
            )}
            <span className="hidden sm:inline-block text-sm font-medium">{user.name}</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </Link>
              <button
                onClick={() => {
                  setOpen(false);
                  logout && logout();
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        // Logged-out view: Login / Signup buttons
        <div className="flex items-center gap-2">
          <Link to="/signup" className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:brightness-95">
            Get Started
          </Link>
        </div>
      )}
    </div>
  );
}
