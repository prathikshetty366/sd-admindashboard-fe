"use client";

import { useState } from "react";

const secondaryNavigation = [
  { name: "Account", href: "#", current: true },
  { name: "Notifications", href: "#", current: false },
  { name: "Billing", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Integrations", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SecondaryNavbar({ activeTab, setActiveTab }) {
  return (
    <div>
      <main>
        <h1 className="sr-only">Account Settings</h1>

        <header className="border-b border-white/5">
          {/* Secondary navigation */}
          <nav className="flex overflow-x-auto py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={classNames(
                      item.name === activeTab
                        ? "text-indigo-400"
                        : "text-gray-400",
                      "hover:text-indigo-500"
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </main>
    </div>
  );
}
