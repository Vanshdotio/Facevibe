import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMusic } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({});

  // Real-time validation checks
  const validateForm = () => {
    const newErrors = {};

    // Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(loginData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Check
    if (!loginData.password) {
      newErrors.password = "Password is required.";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Run validation whenever inputs change
  useEffect(() => {
    validateForm();
  }, [loginData]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    setError("");

    // Mark all as touched
    setTouched({
      email: true,
      password: true,
    });

    const isValid = validateForm();
    if (!isValid) return;

    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email: loginData.email.trim(),
          password: loginData.password,
        },
        {
          withCredentials: true,
        }
      );
      await refreshUser();
      navigate("/moodDetection");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="select-none min-h-screen flex flex-col justify-between items-center bg-[#070708] text-white p-6 font-sans pt-24">
      {/* Centered Card */}
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="bg-[#121214] border border-zinc-800/40 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md flex flex-col gap-6">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-4 text-center">
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
            <h1 className="text-white font-bold text-sm tracking-wide uppercase text-zinc-400 mt-2">Facevibe</h1>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-2">Welcome back</h2>
            <p className="text-zinc-500 text-xs max-w-xs">
              Sign in to continue your mood-based music experience.
            </p>
          </div>

          {/* Form Error Banner */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm
                  ${touched.email && errors.email ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                placeholder="you@example.com"
                value={loginData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <p className="text-[10px] text-red-400 font-semibold">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-[#00C896] text-xs hover:underline font-semibold">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm pr-10
                    ${touched.password && errors.password ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute bg-transparent right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {touched.password && errors.password ? (
                <p className="text-[10px] text-red-400 font-semibold">{errors.password}</p>
              ) : (
                loginData.password && loginData.password.length >= 6 && (
                  <p className="text-[10px] text-[#00C896] font-semibold">✓ Password criteria met</p>
                )
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full font-bold py-3 rounded-full transition-all duration-200 text-sm active:scale-95 cursor-pointer mt-4 shadow-lg flex items-center justify-center min-h-[44px]
                ${submitting 
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed shadow-none" 
                  : "bg-[#00C896] hover:bg-[#00b285] text-black hover:shadow-[#00C896]/10"
                }`}
            >
              {submitting ? (
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="flex items-center justify-center gap-3 text-zinc-600 text-[10px] uppercase font-bold tracking-wider">
            <span className="h-px bg-white/5 flex-grow"></span>
            <span>or continue with</span>
            <span className="h-px bg-white/5 flex-grow"></span>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-grow flex items-center justify-center gap-2 bg-[#1c1c1f] border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95" type="button">
              <FaGoogle size={14} /> Google
            </button>
            <button className="flex-grow flex items-center justify-center gap-2 bg-[#1c1c1f] border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95" type="button">
              <FaGithub size={14} /> GitHub
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-zinc-500 text-xs mt-2">
            Don't have an account?{" "}
            <a href="/register" className="text-[#00C896] hover:underline font-semibold transition-colors">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-zinc-700 text-xs py-4 flex gap-4 mt-8">
        <span>© 2026 Facevibe</span>
        <span>·</span>
        <a href="/privacy-policy" className="hover:text-zinc-500 transition-colors">Privacy</a>
        <span>·</span>
        <a href="/terms-and-condition" className="hover:text-zinc-500 transition-colors">Terms</a>
      </footer>
    </div>
  );
};

export default Login;
