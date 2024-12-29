import React, { useState } from "react";
import { useRouter } from "next/router";
import { customersData } from "@/components/Table/data";

const CustomerSelectionPage = () => {
  const [contact, setContact] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const router = useRouter();

  const handleContactSearch = (e) => {
    const searchContact = e.target.value.trim();
    setContact(searchContact);

    if (searchContact.length >= 3) {
      const results = customersData.filter((customer) =>
        customer.contact.includes(searchContact)
      );
      setSearchResults(results);
      setShowOtpBox(false); // Reset OTP box if searching again
    } else {
      setSearchResults([]);
    }
  };

  const handleCustomerSelect = (customer) => {
    if (customer && customer.contact && customer.contact.trim() !== "") {
      router.push(`/offlinebook/vehicle-selection?contact=${customer.contact}`);
    } else {
      alert("Customer contact is missing!");
    }
  };

  const handleCreateNewCustomer = () => {
    if (contact.trim() !== "" && contact.length === 10) {
      setShowOtpBox(true); // Show the OTP input box
    } else {
      alert("Please enter a valid 10-digit contact number.");
    }
  };

  const handleOtpVerify = () => {
    if (otp === "1234") {
      setIsOtpValid(true);
      router.push(`/offlinebook/create-customer?contact=${contact}`);
    } else {
      setIsOtpValid(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Select Customer</h2>

      {/* Contact Input */}
      <input
        type="text"
        placeholder="Enter Contact Number"
        value={contact}
        onChange={handleContactSearch}
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <ul className="border border-gray-300 rounded-lg">
          {searchResults.map((customer) => (
            <li
              key={customer.id}
              onClick={() => handleCustomerSelect(customer)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {customer.name} - {customer.contact}
            </li>
          ))}
        </ul>
      ) : (
        contact.length >= 3 && (
          <p className="text-gray-500">
            No customers found for this contact number.
          </p>
        )
      )}

      {/* Create New Customer Button */}
      <button
        onClick={handleCreateNewCustomer}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Create New Customer
      </button>

      {/* OTP Verification */}
      {showOtpBox && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Enter OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 p-2 rounded-lg mt-2"
          />
          {!isOtpValid && (
            <p className="text-red-500 text-sm">
              Invalid OTP. Please try again.
            </p>
          )}
          <button
            onClick={handleOtpVerify}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerSelectionPage;
