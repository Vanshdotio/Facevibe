import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="pt-20 pb-12 px-6 md:px-12 bg-[#070708] min-h-screen font-sans text-white max-w-4xl mx-auto flex flex-col gap-6 select-none">
      <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#00C896]/20 border-2 border-[#00C896] flex items-center justify-center text-[#00C896] font-bold text-3xl uppercase">
          {getInitials(user?.fullName)}
        </div>
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
            {user?.fullName || "User Profile"}
          </h1>
          <p className="text-neutral-400 text-sm">{user?.email}</p>
          <span className="inline-block mt-2 bg-[#00C896]/10 border border-[#00C896]/20 text-[#00C896] text-xs font-semibold px-3 py-1 rounded-full">
            Premium Member
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
          <h3 className="font-display font-bold text-lg mb-4 text-white">Account Details</h3>
          <div className="flex flex-col gap-3 text-sm text-neutral-400">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Full Name</span>
              <span className="text-white font-medium">{user?.fullName || "N/A"}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Email</span>
              <span className="text-white font-medium">{user?.email || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-[#00C896] font-medium">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
          <h3 className="font-display font-bold text-lg mb-4 text-white">Preferences</h3>
          <div className="flex flex-col gap-3 text-sm text-neutral-400">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Favorite Mood</span>
              <span className="text-white font-medium">Calm & Focused</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Streaming Account</span>
              <span className="text-white font-medium">Spotify Linked</span>
            </div>
            <div className="flex justify-between">
              <span>Theme</span>
              <span className="text-white font-medium">Dark Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
