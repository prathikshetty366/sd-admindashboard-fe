import { createContext, useContext, useEffect, useState } from "react";

// Default settings
const defaultSettings = {
  theme: "light",
  fontSize: "base",
  color: "primary",
};

// Create a context to manage theme, fontSize, and color
const ThemeContext = createContext();

// Custom hook to access theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // State for theme, font size, and primary color
  const [theme, setTheme] = useState(defaultSettings.theme);
  const [fontSize, setFontSize] = useState(defaultSettings.fontSize);
  const [color, setColor] = useState(defaultSettings.color);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedFontSize = localStorage.getItem("fontSize");
    const savedColor = localStorage.getItem("color");

    // Set the state to saved values or default settings
    if (savedTheme) setTheme(savedTheme);
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedColor) setColor(savedColor);
  }, []);

  // Update settings in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("color", color);

    // Apply the theme to the document (dark mode or light mode)
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, fontSize, color]); // Only run when theme, fontSize, or color changes

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, fontSize, setFontSize, color, setColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
