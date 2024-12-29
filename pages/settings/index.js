import React, { useState } from "react";
import Technicians from "@/components/Settings/Technicians";
import Accounts from "@/components/Settings/Accounts";
import Theme from "@/components/Settings/Theme";
import OutletInfo from "@/components/Settings/Outletinfo";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("outletInfo");

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-5">
        {["outletInfo", "technicianInfo", "accounts", "theme"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-6 border-b-2 ${
              activeTab === tab
                ? "border-blue-500 text-blue-500 font-bold"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "outletInfo" && <OutletInfo />}
        {activeTab === "technicianInfo" && <Technicians />}
        {activeTab === "accounts" && <Accounts />}
        {activeTab === "theme" && <Theme />}
      </div>
    </div>
  );
};

export default Settings;
