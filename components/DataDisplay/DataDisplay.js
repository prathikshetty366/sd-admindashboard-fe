import React from "react";

// Sample data (this can be any data with key-value pairs)
const customer = {
  name: "Anush",
  contact: "7899878798",
  email: "Anush@spannerdoor.com",
};

const vehicle = {
  regno: "KA20EC1108",
  brand: "Yamaha",
  model: "Pulsar 150",
  insurance: "12/03/2024",
};

const order = {
  time: "12:00 PM",
  address: "78 99jhjkhk878798",
};

const DataDisplay = () => {
  // Function to convert key to a human-readable format (Camel case)
  const formatKey = (key) => {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
    ); // Capitalize and add space before uppercase letters
  };

  // Convert data objects into an array of key-value pairs
  const customerEntries = Object.entries(customer);
  const vehicleEntries = Object.entries(vehicle);
  const orderEntries = Object.entries(order);

  return (
    <div className="container mx-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead></thead>
        <tbody>
          {/* Row for Customer and Vehicle Data */}
          <tr>
            {/* Customer Data Column */}
            <td className="w-1/2 p-4 items-start">
              <div className="font-semibold text-gray-700 mb-2">
                Customer Information
              </div>
              {customerEntries.map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              ))}
            </td>

            {/* Vehicle Data Column */}
            <td className="w-1/2 p-4">
              <div className="font-semibold text-gray-700 mb-2">
                Vehicle Information
              </div>
              {vehicleEntries.map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              ))}
            </td>
          </tr>

          {/* Row for Order Data (spanning both columns) */}
          <tr>
            <td colSpan="2" className="w-full p-4">
              <div className="font-semibold text-gray-700 mb-2">
                Order Information
              </div>
              {orderEntries.map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
