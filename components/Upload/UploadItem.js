"use client";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/20/solid";

const UploadItem = ({
  index,
  uploadType,
  includeType = "all", // Default to "all" if no type is specified
  excludeType = "", // Default to empty if no exclusion is specified
  image,
  title,
  onImageChange,
  onRemoveImage,
  onTitleChange,
  onRemoveUpload,
  titleError, // Prop to track if title is missing
  errorMessage, // Prop to show error message for invalid file type
}) => {
  // Function to get title options based on uploadType
  const getTitleOptions = () => {
    if (uploadType === "service") {
      return [
        { value: "font", label: "Font" },
        { value: "back", label: "Back" },
        { value: "odometer", label: "Odometer" },
        { value: "dent", label: "Dent" },
        { value: "scratch", label: "Scratch" },
        { value: "major", label: "Major" },
        { value: "electrical", label: "Electrical" },
      ];
    } else if (uploadType === "addon") {
      return [
        { value: "emission", label: "Emission" },
        { value: "insurance", label: "Insurance" },
      ];
    }
    return [];
  };

  // Handle file type validation
  const validateFileType = (file) => {
    const fileType = file?.type.split("/")[1].toLowerCase(); // Get file extension

    // If "all" is selected, accept any file type
    if (includeType !== "all" && !includeType.split(",").includes(fileType)) {
      return false; // Reject file if it's not included
    }

    // If any excluded types are present, reject the file
    if (excludeType && excludeType.split(",").includes(fileType)) {
      return false;
    }

    return true;
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e?.target?.files[0]; // Safe access to event target

    if (!file) {
      return;
    }

    // Check if the file type is valid
    if (!validateFileType(file)) {
      onImageChange(
        index,
        null,
        "Invalid file type. Supported types: " + includeType
      );
      return;
    }

    // If the file is valid, continue with the image change
    onImageChange(index, e, ""); // Clear error if the file is valid
  };

  // Handle title change
  const handleTitleChange = (e) => {
    onTitleChange(index, e);
  };

  return (
    <div className="mt-4 border p-4 rounded-lg">
      <div className="flex justify-between items-center">
        {/* Title Dropdown */}
        <select
          className="mb-2 rounded-md border-gray-300"
          value={title}
          onChange={handleTitleChange}
        >
          <option value="">Select Title</option>
          {getTitleOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Always show "Remove" button */}
        <button
          type="button"
          onClick={() => onRemoveUpload(index)}
          className="text-red-500 text-xs ml-2"
        >
          Remove
        </button>
      </div>

      {/* Error message for title and image validation */}
      {titleError && !image && (
        <p className="text-red-500 text-xs mt-2">
          Please select a title before uploading an image.
        </p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
      )}

      {/* If image is uploaded, show the preview */}
      {image ? (
        <div className="relative mt-2">
          <img
            src={image}
            alt="Preview"
            className="h-48 w-full rounded-lg object-contain" // Use object-contain to fit image inside
          />
          <button
            type="button"
            onClick={() => onRemoveImage(index)}
            className="absolute right-2 top-2"
          >
            <XCircleIcon className="h-6 w-6 text-red-500" />
          </button>
        </div>
      ) : (
        // Upload area if no image uploaded
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
            <div className="mt-4 flex text-sm justify-center leading-6 text-gray-600">
              <label
                htmlFor={`file-upload-${index}`}
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file or drag and drop</span>
                <input
                  id={`file-upload-${index}`}
                  name="file-upload"
                  type="file"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              Supported file types: {includeType}. Excluded types: {excludeType}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadItem;
