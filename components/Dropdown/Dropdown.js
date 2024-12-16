import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { _clearAuthCookies } from "../../utils/cookies"; // Import the function to clear the cookie

export default function Dropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const buttonRef = useRef(null); // Reference to the button
  const router = useRouter();

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent the event from propagating to the parent form
    setIsOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault(); // Prevent the default link behavior for sign-out
    _clearAuthCookies("authToken"); // Clear the authentication cookie (assumes the cookie name is 'authToken')
    router.push("/login"); // Redirect to the login page
  };

  const handleItemClick = (item, e) => {
    e.preventDefault();
    setIsOpen(false); // Close the dropdown after selection

    if (item.href) {
      if (item.href === "/signout") {
        handleSignOut(e);
      } else {
        router.push(item.href); // Navigate to the URL specified in href
      }
    } else {
      onChange(item.name); // If no href, select the item and pass its name to the onChange handler
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown} // Add stopPropagation to prevent form submission
        className="flex items-center space-x-2 text-gray-500"
      >
        {value ? value : options?.[0]?.title || "Select Option"}
        {/* Display value or a default text */}
        <ChevronDownIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2  bg-white shadow-lg rounded-md z-10">
          {options.map((section, index) => (
            <div key={index}>
              {/* Render section title */}
              {/* {section.title && (
                <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">
                  {section.title}
                </div>
              )} */}

              {/* Render the items within each section */}
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={item.href || "#"} // Set href to # if no href is provided
                  onClick={(e) => handleItemClick(item, e)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
