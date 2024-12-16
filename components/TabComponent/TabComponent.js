import { useState } from "react";

// Utility function to handle classNames conditionally
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TabComponent({ tabsData }) {
  // Set the initial active tab to the first tab from tabsData
  const [activeTab, setActiveTab] = useState(tabsData[0].name);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Find the content of the active tab
  const currentTabContent = tabsData.find(
    (tab) => tab.name === activeTab
  )?.component;

  return (
    <div className="w-full pb-5 sm:pb-0">
      {/* Dropdown for small screens */}
      <div className="grid grid-cols-1 sm:hidden">
        <select
          value={activeTab}
          onChange={(e) => handleTabChange(e.target.value)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
        >
          {tabsData.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for larger screens (Tablet, Desktop) */}
      <div className="hidden sm:block w-full">
        <div className="relative w-full">
          {/* Grey line for tab navigation */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gray-300"></div>
          <nav className="flex overflow-x-auto sm:space-x-8 justify-start">
            {tabsData.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={classNames(
                  activeTab === tab.name
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700",
                  "relative pb-4 text-sm font-medium"
                )}
              >
                {tab.name}
                {/* Active blue line */}
                {activeTab === tab.name && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-500"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4 w-full">{currentTabContent}</div>
    </div>
  );
}
