import React, { useState } from "react";
import { useRouter } from "next/router";

const ServiceSelectionPage = () => {
  const [service, setService] = useState({
    type: "",
    date: "",
    time: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Service details submitted!");
    router.push(`/orders`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Service Information</h2>
      <select
        name="type"
        value={service.type}
        onChange={handleInputChange}
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      >
        <option value="" disabled>
          Select Service Type
        </option>
        <option value="General">General Service</option>
        <option value="RSA">Roadside Assistance</option>
        <option value="Repair">Repair</option>
      </select>
      <input
        type="date"
        name="date"
        value={service.date}
        onChange={handleInputChange}
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />
      <input
        type="time"
        name="time"
        value={service.time}
        onChange={handleInputChange}
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default ServiceSelectionPage;
