import React from "react";
import { classNames } from "./../../utils/classnamesutil"; // Utility function to merge classes

function Button({
  type,
  disabled,
  loading,
  children,
  onClick,
  href,
  width,
  color = "blue", // Default to blue
  variant = "filled", // Can be 'filled' or 'outline'
  icon: Icon, // Icon component to be passed if needed
  iconPosition = "left", // Controls whether icon is on the left or right of text
}) {
  // Handle dynamic width classes
  const widthClass =
    width === "full" ? "w-full" : width ? `w-[${width}]` : "w-auto"; // Apply custom width if passed

  // Define color and style variants
  const colorClasses = {
    blue: {
      filled: "bg-blue-600 hover:bg-blue-500 text-white",
      outline:
        "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    },
    red: {
      filled: "bg-red-600 hover:bg-red-500 text-white",
      outline:
        "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-50",
    },
    green: {
      filled: "bg-green-600 hover:bg-green-500 text-white",
      outline:
        "bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-50",
    },
    gray: {
      filled: "bg-gray-600 hover:bg-gray-500 text-white",
      outline:
        "bg-transparent border-2 border-gray-600 text-gray-600 hover:bg-gray-50",
    },
  };

  // Select the appropriate color and variant classes
  const buttonColor =
    colorClasses[color]?.[variant] || colorClasses.blue.filled;

  // Flexbox container class to align icon and text in the same line
  const buttonContentClass = "flex items-center justify-center space-x-2";

  // If 'href' is provided, render an anchor tag (<a>), otherwise render a button.
  if (href) {
    return (
      <a
        href={href}
        className={classNames(
          `p-2 text-sm font-medium flex justify-center items-center ${widthClass}  ${buttonColor} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
          loading && "cursor-not-allowed"
        )}
      >
        {loading ? (
          "Processing..."
        ) : (
          <div className={buttonContentClass}>
            {iconPosition === "left" && Icon && <Icon className="h-5 w-5" />}
            <span>{children}</span>
            {iconPosition === "right" && Icon && <Icon className="h-5 w-5" />}
          </div>
        )}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(
        `p-2 rounded-md text-sm font-medium flex justify-center items-center ${widthClass} ${buttonColor} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`,
        loading && "cursor-not-allowed"
      )}
    >
      {loading ? (
        "Processing..."
      ) : (
        <div className={buttonContentClass}>
          {iconPosition === "left" && Icon && <Icon className="h-5 w-5" />}
          <span>{children}</span>
          {iconPosition === "right" && Icon && <Icon className="h-5 w-5" />}
        </div>
      )}
    </button>
  );
}

export default Button;

// How to use

// import { ArrowRightIcon } from "@heroicons/react/solid";

// // Full width button
// <Button
//   href="/home"
//   color="blue"
//   variant="filled"
//   icon={ArrowRightIcon}
//   iconPosition="left"
//   width="full"
// >
//   Go to Home
// </Button>

// // Custom width button (100px width)
// <Button
//   href="/home"
//   color="blue"
//   variant="filled"
//   icon={ArrowRightIcon}
//   iconPosition="left"
//   width="100px"
// >
//   Go to Home
// </Button>

// // Custom width button (200px width)
// <Button
//   href="/home"
//   color="red"
//   variant="outline"
//   icon={ArrowRightIcon}
//   iconPosition="left"
//   width="200px"
// >
//   Go to Home
// </Button>

// // Default width button (auto width based on content)
// <Button
//   href="/home"
//   color="green"
//   variant="filled"
//   icon={ArrowRightIcon}
//   iconPosition="left"
// >
//   Go to Home
// </Button>
