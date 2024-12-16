import React, { useState, useEffect } from "react";

const GetGoogleReview = ({
  googleReviewCode: initialGoogleReviewCode,
  customerNumber: initialCustomerNumber,
}) => {
  // Internal state to manage googleReviewCode and customerNumber
  const [googleReviewCode, setGoogleReviewCode] = useState(
    initialGoogleReviewCode || "CeOlLmnRDVOuEBM"
  );
  const [customerNumber, setCustomerNumber] = useState(
    initialCustomerNumber || ""
  );

  // Outlet Review IDs
  const outletReviewIds = {
    "Bagalur Cross": "CeOlLmnRDVOuEBM",
    "Attur Layout": "CbhOBa4Q4dO_EAE",
  };

  // Update the internal state when props change
  useEffect(() => {
    setGoogleReviewCode(initialGoogleReviewCode);
    setCustomerNumber(initialCustomerNumber);
  }, [initialGoogleReviewCode, initialCustomerNumber]);

  // Generate the WhatsApp review link dynamically
  const generateReviewLink = (reviewId, number) =>
    `https://api.whatsapp.com/send?phone=${number}&text=Spannerdoor%20Private%20Limited%20would%20love%20your%20feedback.%20Post%20a%20review%20to%20our%20profile.%0Ahttps%3A%2F%2Fg.page%2Fr%2F${reviewId}%2Freview`;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-md shadow-md">
      {/* Outlet Selection */}
      <div className="mb-4 w-full">
        <label
          htmlFor="outlet-select"
          className="block text-sm text-gray-700 mb-2"
        >
          Select Outlet
        </label>
        <select
          id="outlet-select"
          value={googleReviewCode}
          onChange={(e) => setGoogleReviewCode(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {Object.entries(outletReviewIds).map(([name, id]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Customer Number Input */}
      <div className="mb-4 w-full">
        <label
          htmlFor="customer-number"
          className="block text-sm text-gray-700 mb-2"
        >
          Customer WhatsApp Number
        </label>
        <input
          id="customer-number"
          type="text"
          placeholder="Enter customer number"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Get Review Button */}
      <a
        href={
          customerNumber
            ? generateReviewLink(googleReviewCode, customerNumber)
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2 ${
          customerNumber ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
        } text-white rounded-md`}
      >
        Get Review from the Customer
      </a>
    </div>
  );
};

export default GetGoogleReview;
