'use client'
import { PhotoIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const Upload = ({ title }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result) // Set image preview as base64 URL
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="col-span-full">
        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
          {title}
        </label>

        {/* If image is selected, show the preview */}
        {selectedImage ? (
          <div className="relative mt-2">
            <img src={selectedImage} alt="Preview" className="h-48 w-full rounded-lg object-cover" />
            {/* Close icon to remove the image */}
            <button type="button" onClick={handleRemoveImage} className="absolute right-2 top-2">
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </button>

            {/* Reupload button */}
            <div className="mt-2">
              <label
                htmlFor="file-reupload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Reupload</span>
                <input
                  id="file-reupload"
                  name="file-reupload"
                  type="file"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Upload
