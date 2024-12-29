import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Dummy data for vehicles
const vehiclesData = [
  {
    contact: "7829487050",
    vehicles: [
      { regNo: "KA01AB1234", model: "Swift", brand: "Maruti Suzuki" },
      { regNo: "KA05XY5678", model: "i20", brand: "Hyundai" },
    ],
  },
];

const brands = ["KTM", "BAJAJ"];

const VehicleSelectionPage = () => {
  const [vehicles, setVehicles] = useState([]); // Vehicles linked to the contact
  const [selectedVehicle, setSelectedVehicle] = useState(""); // Selected vehicle registration number
  const [vehicle, setVehicle] = useState({
    regNo: "",
    model: "",
    brand: "",
  });

  const router = useRouter();
  const { contact } = router.query;

  // Load vehicles based on contact
  useEffect(() => {
    if (contact) {
      const customerData = vehiclesData.find(
        (data) => data.contact === contact
      );
      setVehicles(customerData ? customerData.vehicles : []);
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVehicle = () => {
    if (vehicle.regNo && vehicle.model && vehicle.brand) {
      setVehicles((prev) => [...prev, vehicle]);
      setVehicle({ regNo: "", model: "", brand: "" }); // Reset the form
      alert("Vehicle added successfully!");
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleNext = () => {
    if (selectedVehicle) {
      alert(`Selected Vehicle: ${selectedVehicle}`);
      router.push(`/offlinebook/service-selection`);
    } else {
      alert("Please select or add a vehicle.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Vehicle Selection</h2>
      <p className="mb-4">Customer Contact: {contact || "N/A"}</p>

      {/* Select existing vehicle dropdown */}
      {vehicles.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Select Existing Vehicle</h3>
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="" disabled>
              Select a vehicle
            </option>
            {vehicles.map((v, index) => (
              <option key={index} value={v.regNo}>
                {v.regNo} - {v.model} ({v.brand})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Add new vehicle form */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Vehicle</h3>
        <input
          type="text"
          name="regNo"
          value={vehicle.regNo}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              [e.target.name]: e.target.value.toUpperCase(),
            }))
          }
          placeholder="Registration No."
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        />
        <select
          name="brand"
          value={vehicle.brand}
          onChange={(e) =>
            setVehicle((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }))
          }
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        >
          <option value="" disabled>
            Select Brand
          </option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="model"
          value={vehicle.model}
          onChange={handleInputChange}
          placeholder="Model"
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        />
        <button
          onClick={handleAddVehicle}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Add Vehicle
        </button>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default VehicleSelectionPage;
