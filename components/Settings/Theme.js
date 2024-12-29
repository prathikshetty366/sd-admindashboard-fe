import React from "react";
import { useTheme } from "@/context/ThemeContext"; // Import the theme context

const Theme = () => {
  const { theme, setTheme, fontSize, setFontSize, color, setColor } =
    useTheme(); // Use context values

  // Define font size classes mapping
  const fontSizeClass = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Define color options mapping
  const colorOptions = {
    primary: "#1E90FF", // Blue
    secondary: "#FF4500", // Orange
    accent: "#32CD32", // Green
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-bold mb-3">Theme Settings</h2>

      {/* Theme Toggle */}
      <div className="flex flex-row justify-between mb-4">
        <h3 className={`text-lg ${fontSizeClass[fontSize]}`}>Theme</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setTheme("light")}
            className={`py-2 px-6 rounded-full ${
              theme === "light"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`py-2 px-6 rounded-full ${
              theme === "dark"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {/* Font Size Selection */}
      <div className="flex flex-row justify-between mb-4">
        <h3 className={`text-lg ${fontSizeClass[fontSize]}`}>Font Size</h3>
        <div className="flex space-x-2">
          {["sm", "base", "lg", "xl"].map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`w-[80px] h-[50px] text-center border rounded-md ${
                fontSize === size
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <span className={`${fontSizeClass[size]}`}>{size}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color Selection */}
      <div className="flex flex-row justify-between mb-4">
        <h3 className={`text-lg ${fontSizeClass[fontSize]}`}>Primary Color</h3>
        <div className="flex space-x-4">
          {Object.keys(colorOptions).map((colorOption) => (
            <button
              key={colorOption}
              onClick={() => setColor(colorOption)}
              className={`w-8 h-8 rounded-full border-2 ${
                color === colorOption ? "border-blue-500" : "border-gray-300"
              }`}
              style={{
                backgroundColor: colorOptions[colorOption],
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Display Selected Primary Color */}
      <div>
        <h3 className={`text-lg ${fontSizeClass[fontSize]}`}>
          Selected Primary Color:
        </h3>
        <div
          className="w-full h-4 rounded-md mt-2"
          style={{ backgroundColor: colorOptions[color] }}
        ></div>
      </div>
    </div>
  );
};

export default Theme;
