import React, { useState } from "react";
import clsx from "clsx";
import { DialogTitle, DialogDescription, DialogButtons } from "./DialogItem"; // Import DialogItem components

const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
};

export function Dialog({
  size = "lg",
  type = "simple", // Default type is simple
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  deleteText = "Delete",
  acceptText = "Accept",
  onConfirm,
  onDelete,
  onAccept,
  children,
  buttonName, // Default button text
  buttonColor, // Default button color
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false); // Managing open/close state inside Dialog.js

  // Function to toggle the dialog open/close
  const toggleDialog = () => setIsOpen(!isOpen);

  // Handle the actions (confirm, delete, accept)
  const handleAction = (action) => {
    if (action === "confirm" && onConfirm) onConfirm();
    if (action === "delete" && onDelete) onDelete();
    if (action === "accept" && onAccept) onAccept();
    setIsOpen(false); // Close dialog after action
  };

  return (
    <div>
      {/* Button to trigger dialog */}
      <button
        onClick={toggleDialog}
        className={`px-3 py-2 text-white rounded-md ${buttonColor}`} // Added border for debugging
        style={{ zIndex: 100 }} // Ensure the button is clickable (in case of layering issues)
      >
        {buttonName}
      </button>

      {/* Dialog Body */}
      <div
        className={`fixed inset-0 flex justify-center items-center bg-zinc-950/25 z-10 transition duration-200 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={clsx(
            sizes[size],
            "w-full min-w-0 rounded-t-3xl bg-white p-4 shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10"
          )}
        >
          {/* Dialog Content */}
          <DialogTitle title={title} />
          <DialogDescription description={description} />

          {/* Customizable Dialog Body */}
          <div className="mt-4">{children}</div>

          {/* Dialog Actions (footer with buttons) */}
          <DialogButtons
            type={type}
            cancelText={cancelText}
            confirmText={confirmText}
            deleteText={deleteText}
            acceptText={acceptText}
            onCancel={toggleDialog}
            onConfirm={() => handleAction("confirm")}
            onDelete={() => handleAction("delete")}
            onAccept={() => handleAction("accept")}
            buttonName={buttonName} // Pass buttonName prop
            buttonColor={buttonColor} // Pass buttonColor prop
          />
        </div>
      </div>
    </div>
  );
}
