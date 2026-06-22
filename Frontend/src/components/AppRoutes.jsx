import React from "react";
import Home from "./pages/Home";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import MoodDetection from "./pages/MoodDetection";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Footer from "./Footer";
import TermsAndCondition from "./pages/TermsAndCondition";
// AuthProvider is applied at a higher level (App.jsx)

const AppRoutes = () => {
  const location = useLocation();
  const noFooterRoutes = [
    "/terms-and-condition",
    "/about",
    "/privacy-policy",
    "/register",
    "/login",
    "/moodDetection",
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/moodDetection" element={<MoodDetection />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

export default AppRoutes;
