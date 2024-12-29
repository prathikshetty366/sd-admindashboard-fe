import React, { useState } from "react";

const OutletInfo = () => {
  const outletInfo = {
    name: "Spannerdoor Pvt Ltd",
    address: "Attur Layout, Bangalore, Karnataka",
    contact: "+91 787987879",
    email: "support@spannerdoor.com",
    googleBusinessLink: "https://g.co/kgs/2Pn3Aku",
    googleBusinessName: "Spannerdoor Private Limited (YNT - Attur Layout)",
    bio: "We provide comprehensive vehicle repair and maintenance services.",
    gst: "29ABKS2999Q1Z1",
    currency: "₹ - Rupee",
    timings: [
      { day: "Sunday", start: "10:00", end: "18:00", isOpen: true },
      { day: "Monday", start: "09:00", end: "21:00", isOpen: true },
      { day: "Tuesday", start: "09:00", end: "21:00", isOpen: true },
      { day: "Wednesday", start: "09:00", end: "21:00", isOpen: true },
      { day: "Thursday", start: "09:00", end: "21:00", isOpen: true },
      { day: "Friday", start: "09:00", end: "21:00", isOpen: true },
      { day: "Saturday", start: "10:00", end: "20:00", isOpen: true },
    ],
  };

  const [formData, setFormData] = useState({ ...outletInfo });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTimingChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      timings: prev.timings.map((t) =>
        t.day === day ? { ...t, [field]: value } : t
      ),
    }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      console.log("Saved Data:", formData);
      alert(`Saved Outlet Information: ${JSON.stringify(formData, null, 2)}`);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="mx-auto w-full p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Outlet Information</h2>
        <button
          onClick={toggleEditMode}
          className={`px-4 py-2 rounded-md ${
            isEditing
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <hr className="mb-6" />

      {/* Google Business Section */}
      <section className="grid gap-y-4 sm:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Google Business</h2>
        </div>
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={formData.googleBusinessName}
                onChange={(e) =>
                  handleInputChange("googleBusinessName", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
              />
              <input
                type="url"
                value={formData.googleBusinessLink}
                onChange={(e) =>
                  handleInputChange("googleBusinessLink", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md p-2 mb-2"
              />
            </>
          ) : (
            <a
              href={formData.googleBusinessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {formData.googleBusinessName}
            </a>
          )}
        </div>
      </section>

      {/* Name Section */}
      <section className="grid gap-y-4 sm:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Name</h2>
        </div>
        <div>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </div>
      </section>

      {/* Address Section */}
      <section className="grid gap-y-4 sm:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Address</h2>
        </div>
        <div>
          {isEditing ? (
            <textarea
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows="2"
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          ) : (
            <p>{formData.address}</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="grid gap-y-4 sm:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Contact</h2>
        </div>
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-3"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </>
          ) : (
            <>
              <p>{formData.contact}</p>
              <p>{formData.email}</p>
            </>
          )}
        </div>
      </section>

      {/* Timings Section */}
      <section className="grid gap-y-4 sm:grid-cols-2 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Outlet Timings</h2>
        </div>
        <div>
          {formData.timings.map((timing) => (
            <div
              key={timing.day}
              className="flex items-center justify-between mb-3"
            >
              <label>
                <input
                  type="checkbox"
                  checked={timing.isOpen}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleTimingChange(timing.day, "isOpen", e.target.checked)
                  }
                  className="mr-2"
                />
                {timing.day}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  value={timing.start}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleTimingChange(timing.day, "start", e.target.value)
                  }
                  className="w-24 border border-gray-300 rounded-md p-1"
                />
                <span>&rarr;</span>
                <input
                  type="time"
                  value={timing.end}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleTimingChange(timing.day, "end", e.target.value)
                  }
                  className="w-24 border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OutletInfo;
