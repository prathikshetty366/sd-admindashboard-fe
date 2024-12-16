// components/AlertBox/AlertBox.js
import React from "react";

const AlertBox = ({
  isOpen,
  onClose,
  type = "info",
  title,
  message,
  actions = [],
}) => {
  if (!isOpen) return null;

  const typeIcons = {
    info: <span className="text-blue-600">&#8505;</span>, // Info icon
    warning: <span className="text-red-600">&#9888;</span>, // Warning icon
    success: <span className="text-green-600">&#10003;</span>, // Success icon
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500/75">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <div className="flex items-center">
          <div className="mr-4 text-2xl">{typeIcons[type]}</div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="mt-4 text-sm text-gray-600">{message}</div>
        <div className="mt-6 flex justify-end space-x-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-4 py-2 rounded-md font-semibold ${
                action.className || ""
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
