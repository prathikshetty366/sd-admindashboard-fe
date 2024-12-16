import React, { useState } from "react";

// Reusable Modal Component
const Modal = ({ children, title, isOpen: propIsOpen, onClose }) => {
  // If no `isOpen` prop is passed, manage the modal's open/close state internally
  const [isModalOpen, setIsModalOpen] = useState(propIsOpen || false);

  // Handle closing the modal
  const handleClose = () => {
    setIsModalOpen(false);
    if (onClose) onClose(); // Call onClose prop (if passed)
  };

  // Use the `propIsOpen` if it exists, otherwise use the internal state.
  const isOpen = propIsOpen !== undefined ? propIsOpen : isModalOpen;

  if (!isOpen) return null; // Don't render modal if isOpen is false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="bg-white rounded-lg shadow-lg w-[60%] p-6 relative">
        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 text-lg font-bold"
        >
          &times;
        </button>

        {/* Modal Title */}
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
