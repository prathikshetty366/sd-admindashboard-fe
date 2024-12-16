// components/PageHeader/PageHeader.js
import React from "react";

// PageHeader component
const PageHeader = ({ title, subtitle, buttons = [] }) => {
  return (
    <div>
      <div className="flex justify-between border-b pb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="mt-3 flex space-x-4">
          {/* Render buttons */}
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500"
            >
              {button.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
