import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(null);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => {
      const newTheme = !prevState;
      localStorage.setItem("isDarkMode", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme !== null) {
      setIsDarkMode(JSON.parse(savedTheme));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem("isDarkMode", JSON.stringify(prefersDark));
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  useEffect(() => {
    if (isDarkMode !== null) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [isDarkMode, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
