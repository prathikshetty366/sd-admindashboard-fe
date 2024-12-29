import React, { useState } from "react";

const ReschedulePage = ({ onClose }) => {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Rescheduled to: ${newDate} at ${newTime}`);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Reschedule Appointment</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">New Date</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Time</label>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Reschedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReschedulePage;
