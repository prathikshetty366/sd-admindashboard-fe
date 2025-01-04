import React from "react";

// Component to display service information using API response
const DataDisplay = ({ serviceInfo }) => {
  // Function to convert camelCase keys to a more readable format
  const formatKey = (key) => {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  // Safely handle nested data with fallback values
  const customer = serviceInfo?.user || {};
  const vehicle = serviceInfo?.vehicle || {};

  // Only important vehicle fields
  const importantVehicleFields = {
    licensePlate: vehicle.licensePlate,
    brandName: vehicle.brandName,
    brandModel: vehicle.brandModel,
    fuelType: vehicle.fuelType,
    insuranceCompany: vehicle.insuranceCompany,
    insuranceExpiry: vehicle.insuranceExpiry,
    registrationDate: vehicle.registrationDate,
  };

  const order = {
    ordertype: "Online",
    datetime: serviceInfo?.serviceScheduledDate || "N/A",
    address: serviceInfo?.garage?.address || "N/A",
  };
  const subscription = {
    ServiceType: serviceInfo?.serviceType || "Service",
    subscriptiontype: serviceInfo?.subscriptionType || "None",
    Free: serviceInfo?.freeServicesCount || "0",
  };

  // Convert data objects into arrays for mapping
  const customerEntries = Object.entries(customer);
  const vehicleEntries = Object.entries(importantVehicleFields);
  const orderEntries = Object.entries(order);
  const subscriptionEntries = Object.entries(subscription);

  return (
    <div className="container mx-auto p-5">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <tbody>
          {/* Row for Customer and Vehicle Data with top alignment */}
          <tr className="align-top">
            {/* Customer Data Column */}
            <td className="w-1/2 p-4 border-r border-gray-300 align-top">
              <div className="font-semibold text-gray-700 mb-2">
                Customer Information
              </div>
              {customerEntries.map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value || "N/A"}</div>
                </div>
              ))}
            </td>

            {/* Vehicle Data Column */}
            <td className="w-1/2 p-4 align-top">
              <div className="font-semibold text-gray-700 mb-2">
                Vehicle Information
              </div>
              {vehicleEntries.map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value || "N/A"}</div>
                </div>
              ))}
            </td>
          </tr>

          {/* Row for Order Data */}
          <tr>
            <td colSpan="2" className="w-full p-4 bg-gray-100">
              <div className="font-semibold text-gray-700 mb-2">
                Order Information
              </div>
            </td>
          </tr>
          <tr>
            <td className="w-1/2 p-4">
              {orderEntries.map(([key, value], index) => (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between"
                >
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value || "N/A"}</div>
                </div>
              ))}
            </td>
            <td className="w-1/2 p-4">
              {subscriptionEntries.map(([key, value], index) => (
                <div
                  key={index}
                  className="border-b py-2 flex justify-between"
                >
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value || "N/A"}</div>
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
