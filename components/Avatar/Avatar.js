// components/Avatar/Avatar.js
import { forwardRef } from "react";

const Avatar = forwardRef(
  ({ src, initials, alt, square = false, className = "", ...props }, ref) => {
    const classes = `relative inline-grid ${square ? "rounded-[20%]" : "rounded-full"} 
      focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`;

    return (
      <div className={classes} {...props} ref={ref}>
        {src ? (
          <img src={src} alt={alt} className="object-cover w-full h-full" />
        ) : (
          <span className="flex items-center justify-center text-white bg-gray-400 w-full h-full">
            {initials}
          </span>
        )}
      </div>
    );
  }
);

export default Avatar;
