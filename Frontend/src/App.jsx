import React, { useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import Nav from "./components/Nav";
import { ThemeProvider } from "./components/context/ThemeContext";
import { AuthProvider } from "./components/context/AuthContext";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  const noNavbarRoutes = [
    "/terms-and-condition",
    "/privacy-policy",
    "/register",
    "/login",
    "/moodDetection",
  ];

  // Initialize Lenis inside useEffect to manage lifecycle and prevent memory leaks
  useEffect(() => {
    const lenis = new Lenis();
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            {!noNavbarRoutes.includes(location.pathname) && <Nav />}
            {/* Main Content */}
            <main className="flex-grow">
              <AppRoutes />
            </main>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;

