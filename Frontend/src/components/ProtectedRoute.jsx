import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, sessionExpired, clearSessionExpired } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Prevent flash of protected content using a clean spinner matching the UI theme
    return (
      <div className="fixed inset-0 bg-[#070708] flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-[#00C896]/20 border-t-[#00C896] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    const message = sessionExpired ? "Your session has expired. Please login again." : null;
    if (sessionExpired && clearSessionExpired) {
      clearSessionExpired();
    }
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname + location.search,
          message: message,
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
