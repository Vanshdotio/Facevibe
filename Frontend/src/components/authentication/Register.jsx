import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMusic } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { refreshUser } = useContext(AuthContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  // Real-time password requirement helper
  const getPasswordValidationMessage = (pwd) => {
    if (!pwd) return "";
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one capital letter (A-Z).";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter (a-z).";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one digit.";
    }
    if (!/[!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]/.test(pwd)) {
      return "Password must contain at least one special character.";
    }
    return "✓ Strong password";
  };

  // Run validation checks on form data
  const validateForm = () => {
    const newErrors = {};

    // Name Check
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    // Email Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Check
    const pwdMessage = getPasswordValidationMessage(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (pwdMessage && pwdMessage !== "✓ Strong password") {
      newErrors.password = pwdMessage;
    }

    // Confirm Password Check
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Run validation whenever input changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const isValid = validateForm();
    if (!isValid) return;

    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      await refreshUser();
      navigate("/moodDetection");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const pwdValidationMessage = getPasswordValidationMessage(formData.password);

  return (
    <div className="select-none min-h-screen flex flex-col justify-between items-center bg-[#070708] text-white p-6 font-sans pt-24">
      {/* Centered Card */}
      <div className="flex-grow flex items-center justify-center w-full my-6">
        <div className="bg-[#121214] border border-zinc-800/40 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md flex flex-col gap-5">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-3 text-center">
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Create your account</h2>
            <p className="text-zinc-500 text-xs max-w-xs">
              Start your AI-powered music journey today.
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
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm
                  ${touched.fullName && errors.fullName ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                placeholder="Jane Doe"
                value={formData.fullName}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
              {touched.fullName && errors.fullName && (
                <p className="text-[10px] text-red-400 font-semibold">{errors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm
                  ${touched.email && errors.email ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChanges}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <p className="text-[10px] text-red-400 font-semibold">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm pr-10
                    ${touched.password && errors.password ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChanges}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              
              {/* Single line real-time password helper */}
              {formData.password && (
                <div className="flex items-center gap-1.5 mt-1 select-none">
                  {pwdValidationMessage === "✓ Strong password" ? (
                    <span className="text-[10px] text-[#00C896] font-bold tracking-tight">
                      {pwdValidationMessage}
                    </span>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 flex-shrink-0" />
                      <span className="text-[10px] text-zinc-500 font-medium tracking-tight">
                        {pwdValidationMessage}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className={`w-full bg-[#1c1c1f] border rounded-xl px-4 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-all duration-200 text-sm pr-10
                    ${touched.confirmPassword && errors.confirmPassword ? "border-red-500/80 focus:ring-red-500" : "border-zinc-800"}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChanges}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-white transition-colors"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[10px] text-red-400 font-semibold">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Custom Terms Checkbox */}
            <div className="flex items-center gap-2.5 mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 rounded border-white/10 bg-[#1c1c1f] text-[#00C896] focus:ring-[#00C896] focus:ring-offset-[#0c0c0e]"
              />
              <label htmlFor="terms" className="text-xs text-zinc-500">
                I agree to the{" "}
                <a href="/terms-and-condition" className="text-[#00C896] hover:underline font-semibold">Terms</a>
                {" & "}
                <a href="/privacy-policy" className="text-[#00C896] hover:underline font-semibold">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button with loader */}
            <button
              type="submit"
              disabled={submitting || !isChecked}
              className={`w-full font-bold py-3 rounded-full transition-all duration-200 text-sm active:scale-95 cursor-pointer mt-3 shadow-lg flex items-center justify-center min-h-[44px]
                ${isChecked && !submitting
                  ? "bg-[#00C896] hover:bg-[#00b285] text-black hover:shadow-[#00C896]/10" 
                  : "bg-zinc-800/80 text-zinc-600 cursor-not-allowed shadow-none"
                }`}
            >
              {submitting ? (
                <img 
                  src="/assets/loader/Music Loader.gif" 
                  alt="Loading..." 
                  className="h-6 object-contain filter invert"
                />
              ) : (
                "Get Started"
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

          {/* Sign In Link */}
          <p className="text-center text-zinc-500 text-xs mt-1">
            Already have an account?{" "}
            <a href="/login" className="text-[#00C896] hover:underline font-semibold transition-colors">
              Sign In
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

export default Register;
