import { useState } from "react";
import { useRouter } from "next/router";
import {_clearAuthCookies} from "@/utils/cookies"

export default function Sidebar({ navigation, collapsed, toggleCollapse }) {
  const [openAccordions, setOpenAccordions] = useState({});
  const router = useRouter();

  // Toggle the accordion (expand/collapse sublinks)
  const toggleAccordion = (name) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Close all submenus when collapsing
  const closeAllSubmenus = () => {
    setOpenAccordions({});
  };

  // Get the active link class
  const getActiveItemClass = (item) => {
    // Check if the current item is the active link (parent or sublink)
    const isActive =
      router.pathname === item.href ||
      (item.sublinks &&
        item.sublinks.some((sublink) =>
          router.pathname.startsWith(sublink.href)
        ));

    // If the current item has sublinks and is active, apply a light blue to the parent
    if (isActive) {
      return "bg-blue-100 text-blue-600"; // Active parent or active sublink
    }

    // If the parent has sublinks but is not active, return the default hover state
    if (item.sublinks) {
      return "text-gray-600 hover:bg-gray-200 hover:text-gray-900"; // Default styles for parent with sublinks
    }

    // Return default styles for links without sublinks
    return "text-gray-600 hover:bg-gray-200 hover:text-gray-900"; // Default styles for normal links
  };

  // Get active sublink class
  const getActiveSublinkClass = (sublink) => {
    return router.pathname.startsWith(sublink.href)
      ? "bg-blue-200 text-blue-600" // Lighter blue for active sublink
      : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"; // Default styles for sublinks
  };

  // Handle item click to expand or redirect
  const handleItemClick = (href, name, sublinks) => {
    console.log(href,">>>>>>>>")
    if (collapsed) {
      // If collapsed, first expand the sidebar and then either show sublinks or navigate
      toggleCollapse(); // Collapse or expand the sidebar
      if (sublinks) {
        toggleAccordion(name); // If the item has sublinks, toggle accordion
      }else if(href=="/login"){
        _clearAuthCookies("accessToken")
        window.localStorage.clear()
        router.push(href); // Navigate directly

      }
       else {
        // If no sublinks, navigate directly after the sidebar expands
        setTimeout(() => router.push(href), 300); // Delay navigation slightly to allow expansion
      }
    } else {
      // If sidebar is expanded, handle accordion for sublinks or redirect
      if (sublinks) {
        toggleAccordion(name); // Toggle sublink visibility
      } else if(href=="/login"){
        _clearAuthCookies("accessToken")
        window.localStorage.clear()
        router.push(href); // Navigate directly

      }
      else {
        router.push(href); // Navigate directly
      }
    }
  };

  // Modified toggleCollapse function to first close all submenus before collapsing
  const handleCollapseToggle = () => {
    if (!collapsed) {
      // Close submenus when collapsing the sidebar
      closeAllSubmenus();
    }
    toggleCollapse(); // Proceed with collapsing or expanding the sidebar
  };

  return (
    <div
      className={`flex flex-col p-4 h-full transition-all duration-300 bg-gray-100 shadow-lg border-r border-gray-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Logo */}
      <div className="flex justify-center">
        <img
          src="/teams/spannerdoor.png"
          alt="Logo"
          className="mb-4"
          style={{ width: "50px", height: "auto" }}
        />
      </div>

      {/* Collapse Button */}
      <button
        onClick={handleCollapseToggle} // Use the new collapse handler
        className="text-gray-600 focus:outline-none hover:text-gray-900 transition"
      >
        {collapsed ? (
          <img src="/icons/expand.png" alt="expand" style={{ width: "40px" }} />
        ) : (
          <img
            src="/icons/minimize.png"
            alt="minimize"
            style={{ width: "40px" }}
          />
        )}
      </button>

      {/* Navigation Menu */}
      <nav className="mt-5 space-y-4">
        {navigation.map((item) => (
          <div key={item.name}>
            <div
              className={`flex items-center justify-between p-2 rounded-lg text-sm font-medium cursor-pointer transition-all ${getActiveItemClass(
                item
              )}`}
              onClick={() =>
                handleItemClick(item.href, item.name, item.sublinks)
              } // Handle item click
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.name}</span>}
              </div>
              {item.sublinks && !collapsed && (
                <span>{openAccordions[item.name] ? "-" : "+"}</span>
              )}
            </div>

            {/* Render Sub-links */}
            {item.sublinks && openAccordions[item.name] && (
              <div className="mt-2 pl-6 space-y-2">
                {item.sublinks.map((sublink) => (
                  <div
                    key={sublink.name}
                    className={`text-sm font-medium p-2 rounded-lg cursor-pointer transition-all ${getActiveSublinkClass(
                      sublink
                    )}`}
                    onClick={() => router.push(sublink.href)} // Navigate to sublink
                  >
                    {sublink.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
