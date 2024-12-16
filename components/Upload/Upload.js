"use client";
import { useState } from "react";
import UploadItem from "./UploadItem";

const Upload = ({
  uploadCount = 3,
  uploadType = "service",
  includeType = "all",
  excludeType = "",
  onChange = () => {}, // Custom onChange handler
}) => {
  const [uploads, setUploads] = useState([{ title: "", image: null }]); // Start with one upload card

  const handleImageChange = (index, event) => {
    const file = event?.target?.files?.[0] || null;

    // Check if no file was selected
    if (!file) {
      alert("No file selected");
      return;
    }

    // Validate file type
    if (!validateFileType(file)) {
      alert("Invalid file format uploaded. Please upload a valid file.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUploads = [...uploads];
        newUploads[index].image = reader.result;
        setUploads(newUploads);
        onChange(newUploads); // Trigger custom onChange handler
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFileType = (file) => {
    if (!file) return false;

    const fileType = file.type.split("/")[1].toLowerCase();

    // Check if the file type is excluded
    if (excludeType && excludeType.split(",").includes(fileType)) {
      return false;
    }

    // Check if the file type is included (if 'all' is not selected)
    if (includeType !== "all" && !includeType.split(",").includes(fileType)) {
      return false;
    }

    return true;
  };

  const handleRemoveImage = (index) => {
    const newUploads = [...uploads];
    newUploads[index].image = null;
    setUploads(newUploads);
    onChange(newUploads); // Trigger custom onChange handler
  };

  const handleRemoveUpload = (index) => {
    const newUploads = uploads.filter((_, i) => i !== index);
    setUploads(newUploads);
    onChange(newUploads); // Trigger custom onChange handler
  };

  const handleAddUpload = () => {
    if (uploads.length < uploadCount) {
      setUploads([...uploads, { title: "", image: null }]);
    }
  };

  const handleTitleChange = (index, event) => {
    const newUploads = [...uploads];
    newUploads[index].title = event.target.value;
    setUploads(newUploads);
    onChange(newUploads); // Trigger custom onChange handler
  };

  // const handleUploadAll = () => {
  //   const allValidUploads = uploads.filter(
  //     (upload) => upload.title || upload.image
  //   );

  //   if (uploads.length > allValidUploads.length) {
  //     setUploads(allValidUploads);
  //     onChange(allValidUploads); // Trigger custom onChange handler
  //   }

  //   const allTitlesSelected = uploads.every(
  //     (upload) => upload.title || upload.image
  //   );

  //   if (!allTitlesSelected) {
  //     alert("Please select a title or upload an image for each item.");
  //     return;
  //   }

  //   const filePaths = uploads.map((upload) => ({
  //     title: upload.title,
  //     image: upload.image ? upload.image : "No image uploaded",
  //   }));

  //   console.log(filePaths);
  //   alert(JSON.stringify(filePaths, null, 2));
  // };

  const handleUploadAll = () => {
    // Filter out invalid uploads (those without either a title or an image)
    const validUploads = uploads.filter(
      (upload) => upload.title || upload.image
    );

    // If there are invalid uploads, update the state to remove them
    if (uploads.length !== validUploads.length) {
      setUploads(validUploads);
      onChange(validUploads); // Trigger custom onChange handler
    }

    // Check if there are any uploads with missing data (both title and image)
    const allValid = validUploads.every(
      (upload) => upload.title || upload.image
    );

    if (!allValid) {
      alert("Please check that each upload has either a title or an image.");
      return;
    }

    // Proceed with the "upload" process (e.g., send valid uploads to the server)
    const filePaths = validUploads.map((upload) => ({
      title: upload.title,
      image: upload.image ? upload.image : "No image uploaded",
    }));

    console.log(filePaths); // Output for debugging
    alert(JSON.stringify(filePaths, null, 2)); // Show the uploaded data
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {/* Render the uploads */}
        {uploads.map((upload, index) => (
          <UploadItem
            key={index}
            index={index}
            uploadType={uploadType}
            includeType={includeType}
            excludeType={excludeType}
            image={upload.image}
            title={upload.title}
            onImageChange={handleImageChange}
            onRemoveImage={handleRemoveImage}
            onTitleChange={handleTitleChange}
            onRemoveUpload={handleRemoveUpload}
            titleError={upload.title === "" && upload.image === null}
            errorMessage={
              upload.title === "" && !upload.image
                ? "" //Please select a title or upload an image.
                : ""
            }
          />
        ))}

        <div>
          {/* Add another upload button */}
          {uploads.length < uploadCount && (
            <button
              type="button"
              onClick={handleAddUpload}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              +
            </button>
          )}
        </div>
      </div>

      {/* Upload all button */}
      <button
        type="button"
        onClick={handleUploadAll}
        className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Upload All Images
      </button>
    </div>
  );
};

export default Upload;

// Key Props to Pass:

// uploadCount: This controls how many uploads should appear in a single row. If the count exceeds this number, the next upload will be placed on a new row.
// uploadType: Defines the type of upload (either "service" or "addon"). This will determine the available options for the upload titles.
// includeType: Specifies which file types are allowed (e.g., "png,jpg"). If set to "all", all file types are allowed.
// excludeType: Specifies file types that are explicitly blocked (e.g., "pdf").
// error: Optional, but can be passed as a state to display validation errors.
// handleUploadAll: Function to collect and log all uploaded data.
