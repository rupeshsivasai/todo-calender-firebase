import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  }

  const initials = currentUser?.email?.slice(0, 2).toUpperCase() || "?";

  return (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-bold">✓</span>
        </div>
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">
          Todo <span className="text-indigo-600">Calendar</span>
        </h1>
      </div>

      {currentUser && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 text-xs font-bold">{initials}</span>
            </div>
            <span className="text-sm text-gray-500 max-w-[160px] truncate">
              {currentUser.email}
            </span>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sm font-medium text-gray-600 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {loggingOut ? "..." : "Logout"}
          </button>
        </div>
      )}
    </nav>
  );
}
