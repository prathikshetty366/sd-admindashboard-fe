import React from "react";

export function DialogTitle({ title }) {
  return (
    <div className="text-lg font-semibold text-gray-800 dark:text-white">
      {title}
    </div>
  );
}

export function DialogDescription({ description }) {
  return (
    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
      {description}
    </div>
  );
}

export function DialogButtons({
  cancelText,
  confirmText,
  deleteText,
  type,
  buttonName,
  buttonColor,
  onCancel,
  onConfirm,
  onDelete,
}) {
  return (
    <div className="mt-4 flex justify-end gap-4">
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
      >
        {cancelText}
      </button>

      {/* Conditional buttons based on dialog type */}
      {type === "confirm" && (
        <button
          onClick={onConfirm}
          className={`px-4 py-2 ${buttonColor} text-white rounded-md`} // Apply dynamic color
        >
          {buttonName} {/* Dynamic button text */}
        </button>
      )}
      {type === "delete" && (
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          {deleteText}
        </button>
      )}
      {type === "accept" && (
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {buttonName} {/* Dynamic button text */}
        </button>
      )}
    </div>
  );
}
