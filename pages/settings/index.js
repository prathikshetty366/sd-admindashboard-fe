import { useTheme } from "@/context/ThemeContext"; // Import the theme context

const Settings = () => {
  const { theme, setTheme, fontSize, setFontSize, color, setColor } =
    useTheme(); // Use context values

  // Define color options for primary, secondary, and accent
  const colorOptions = {
    primary: "#3490dc", // Blue
    secondary: "#ffed4a", // Yellow
    accent: "#6c757d", // Gray
  };

  // Define font size classes
  const fontSizeClass = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className={`text-2xl font-semibold mb-4 ${fontSizeClass[fontSize]}`}>
        Settings
      </h1>

      <div className="border mb-5 mt-3"></div>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex flex-row justify-between">
          <div>
            <h2 className={`text-lg mb-2 ${fontSizeClass[fontSize]}`}>Theme</h2>
          </div>
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

        <div className="border mb-5 mt-3"></div>

        {/* Font Size Selection */}
        <div className="flex flex-row justify-between">
          <div>
            <h2 className={`text-lg mb-2 ${fontSizeClass[fontSize]}`}>
              Font Size
            </h2>
          </div>
          <div className="flex flex-row space-x-2">
            {["sm", "base", "lg", "xl"].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`block w-[80px] h-[50px] text-center border rounded-md ${
                  fontSize === size ? "bg-blue-500 text-white" : "bg-white-200"
                }`}
              >
                <span className={`${fontSizeClass[size]}`}>{size}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border mb-5 mt-3"></div>

        {/* Primary Color Selection */}
        <div className="flex flex-row justify-between">
          <div>
            <h2 className={`text-lg mb-2 ${fontSizeClass[fontSize]}`}>
              Primary Color
            </h2>
          </div>
          <div className="flex space-x-4">
            {["primary", "secondary", "accent"].map((colorOption) => (
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

        <div className="border mb-5 mt-3"></div>

        {/* Display Selected Primary Color as a Line */}
        <div>
          <h2 className={`text-lg mb-2 ${fontSizeClass[fontSize]}`}>
            Selected Primary Color:
          </h2>
          <div
            className="w-full h-4 rounded-md"
            style={{ backgroundColor: colorOptions[color] }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
