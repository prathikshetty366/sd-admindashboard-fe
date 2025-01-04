"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./../Sidebar/Sidebar";
import CommandPalette from "./../CommandPalette/CommandPalette";
import NotificationIcon from "./../NotificationIcon/NotificationIcon";
import { navigation } from "./../Sidebar/data"; // Import navigation data
import { publicRoutes } from "../../utils/publicRoutes"; // Import public routes
import Dropdown from "./../Dropdown/Dropdown";
import { options } from "./../Dropdown/data";

function ApplicationLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(router.pathname);

  // If the route is public, do not show sidebar or top bar
  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all ${
          collapsed ? "w-16" : "w-64"
        } bg-gray-800`}
      >
        <Sidebar
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
          navigation={navigation}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all ease-in-out duration-300 ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          {/* <CommandPalette /> */}
          {/* <div className="flex items-center space-x-8 px-10">
            <div className="w-[100px]">
              <Dropdown options={options} />
            </div>
            <NotificationIcon />
          </div> */}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}

export default ApplicationLayout;
