import React from "react";

// Sample data
const customer = {
  name: "Anush",
  contact: "7899878798",
  email: "Anush@spannerdoor.com",
};

const vehicle = {
  regno: "KA20EC1108",
  brand: "Yamaha",
  model: "Pulsar 150",
  engine: "yugduwghjd",
  chasis: "fudhjkcf89yy9",
  fueltype: "petrol",
};

const activestatus = {
  service: "EXPIRED",
  insurance: "ACTIVE",
  emission: "ACTIVE",
};

const servicehistory = [
  {
    orderid: "83728",
    technician: "Abhishek",
    jobsheet: "http://jobsheet.com/83728",
    invoice: "http://invoice.com/83728",
    servicedate: "19/12/2024",
    amount: "1298",
    nextservice: "12/06/2025",
    payment: "Complete",
  },
  {
    orderid: "83727",
    technician: "Ravi",
    jobsheet: "http://jobsheet.com/83727",
    invoice: "http://invoice.com/83727",
    servicedate: "12/12/2024",
    amount: "1500",
    nextservice: "12/06/2025",
    payment: "Complete",
  },
  {
    orderid: "83726",
    technician: "Karan",
    jobsheet: "http://jobsheet.com/83726",
    invoice: "http://invoice.com/83726",
    servicedate: "10/12/2024",
    amount: "1000",
    nextservice: "10/06/2025",
    payment: "Complete",
  },
];

const VehicleDataDisplay = () => {
  // Function to convert key to a human-readable format (Camel case to readable)
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };

  // Extract latest service (assuming the last item in the array is the latest)
  const latestService = servicehistory[0];

  return (
    <div className="container mx-auto p-4">
      {/* Customer and Vehicle Information */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 mb-8">
        <thead>
          <tr>
            <th
              colSpan="2"
              className="text-left text-lg font-bold p-4 bg-gray-200"
            >
              Vehicle Details
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Row for Customer and Vehicle Data */}
          <tr>
            <td className="w-1/2 p-4 border-r border-gray-300">
              <div className="font-semibold text-gray-700 mb-2">
                Customer Information
              </div>
              {Object.entries(customer).map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              ))}
            </td>

            <td className="w-1/2 p-4">
              <div className="font-semibold text-gray-700 mb-2">
                Vehicle Information
              </div>
              {Object.entries(vehicle).map(([key, value], index) => (
                <div key={index} className="border-b py-2 flex justify-between">
                  <div className="text-gray-600">{formatKey(key)}</div>
                  <div className="text-gray-600">{value}</div>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Active Status */}
      <div className="mb-8">
        <div className="font-semibold text-gray-700 mb-2">Active Status</div>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(activestatus).map(([key, value], index) => (
            <div
              key={index}
              className={`p-2 text-center rounded ${
                value === "ACTIVE"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {formatKey(key)}: {value}
            </div>
          ))}
        </div>
      </div>

      {/* Latest Service Details */}
      <div className="mb-8">
        <div className="font-semibold text-gray-700 mb-2">
          Latest Service Details
        </div>
        <div className="border border-gray-300 p-4 rounded">
          {Object.entries(latestService).map(([key, value], index) => (
            <div
              key={index}
              className="border-b py-2 flex justify-between items-center"
            >
              <div className="text-gray-600">{formatKey(key)}</div>
              {key === "jobsheet" || key === "invoice" ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View {formatKey(key)}
                </a>
              ) : (
                <div className="text-gray-600">{value}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Service History */}
      <div>
        <div className="font-semibold text-gray-700 mb-2">Service History</div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {Object.keys(servicehistory[0]).map((key, index) => (
                <th key={index} className="text-left p-2 border">
                  {formatKey(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servicehistory.map((service, index) => (
              <tr key={index} className="border-b">
                {Object.entries(service).map(([key, value], index) => (
                  <td key={index} className="p-2 border">
                    {key === "jobsheet" || key === "invoice" ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleDataDisplay;
