import React from "react";

const Loader = ({ isLoading, imageUrl }) => {
  // Use default image if imageUrl is not passed
  const loaderImage = imageUrl || "loader.gif"; // Replace with your default image URL

  return (
    isLoading && (
      <div className="loader-overlay">
        <div className="loader">
          <img
            src={loaderImage}
            alt="Loading"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    )
  );
};

export default Loader;
