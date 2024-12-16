import { useState } from "react";
import Modal from "@/components/Modal/Modal"; // Reusable Modal Component
import { useRouter } from "next/router";
import { customersData } from "@/components/Table/data"; // Assuming this file contains the customer data

const OfflineBooking = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(true); // First Modal: Contact & OTP
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Second Modal: Booking options
  const [contact, setContact] = useState(""); // Customer contact
  const [otp, setOtp] = useState(""); // OTP input
  const [isOtpValid, setIsOtpValid] = useState(true); // State to check OTP validity
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected existing customer
  const [searchResults, setSearchResults] = useState([]); // Search results based on contact number
  const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState(false); // Flag to check if new customer form should be shown
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    bikes: 1,
    contact: "",
    email: "",
    lastService: new Date().toISOString().split("T")[0], // Current date as default
  });

  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to check if OTP is sent
  const [errorSendingOtp, setErrorSendingOtp] = useState(false); // Flag to handle OTP sending error

  const router = useRouter();

  // Handle OTP validation
  const handleOtpSubmit = () => {
    if (otp === "1234") {
      setIsOtpValid(true);
      setIsContactModalOpen(false);
      setIsBookingModalOpen(true);
    } else {
      setIsOtpValid(false);
    }
  };

  // Handle sending OTP
  const handlesendOtp = () => {
    setErrorSendingOtp(false);
    if (contact) {
      alert("OTP: 1234"); // Mock OTP, you can integrate with actual OTP service
      setIsOtpSent(true); // Mark OTP as sent
    } else {
      setErrorSendingOtp(true); // Show error if OTP fails to send
    }
  };

  // Handle customer search by contact number
  const handleContactSearch = (e) => {
    const searchContact = e.target.value;
    setContact(searchContact);

    if (searchContact.length >= 3) {
      // Search for customers with contact matching the input after 3 characters
      const results = customersData.filter((customer) =>
        customer.contact.includes(searchContact)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle customer selection from the dropdown
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setIsCreatingNewCustomer(false); // Reset to not create a new customer
    setSearchResults([]); // Clear search results
  };

  // Handle form input changes for creating a new customer
  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle customer creation
  const handleCreateNewCustomer = () => {
    customersData.push(newCustomer); // Add new customer to the data array
    alert("New customer created!");
    setSelectedCustomer(newCustomer); // Set the newly created customer as selected
    setIsCreatingNewCustomer(false); // Close the new customer form
  };

  // Handle navigation for booking options
  const handleRedirect = (path) => {
    router.push(path);
    setIsBookingModalOpen(false);
  };

  // Handle modal close and redirect to orders page
  const handleModalClose = () => {
    router.push("/orders");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Contact & OTP Modal */}
      <Modal
        title="Verify the customer"
        isOpen={isContactModalOpen}
        onClose={handleModalClose} // Redirect to orders page when modal is closed
      >
        <div className="flex flex-col gap-4">
          {!isCreatingNewCustomer && (
            <>
              {/* Contact Number Input */}
              <div className="w-full mx-auto">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Enter Contact Number"
                    value={contact}
                    onChange={handleContactSearch} // Update search on contact input
                    className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Dropdown to select existing customer */}
              {searchResults.length > 0 && (
                <div className="mt-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {searchResults.map((customer) => (
                      <li
                        key={customer.contact}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCustomerSelect(customer)}
                      >
                        {customer.name} - {customer.contact}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* If a customer is selected automatically, show their info */}
              {selectedCustomer && (
                <div className="mt-4">
                  <p>
                    <strong>Name:</strong> {selectedCustomer.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedCustomer.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer.email}
                  </p>

                  {/* Send OTP and Continue Without OTP */}
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={handlesendOtp}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      Send OTP
                    </button>

                    <button
                      onClick={() => setIsBookingModalOpen(true)} // Continue without OTP
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Continue Without OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Error message if OTP fails to send */}
              {errorSendingOtp && (
                <p className="text-red-500 text-sm mt-2">
                  Error sending OTP. Please try again.
                </p>
              )}

              {/* Option to create new customer if no match */}
              <button
                onClick={() => setIsCreatingNewCustomer(true)}
                className="text-blue-600 mt-2"
              >
                Create New Customer
              </button>
            </>
          )}

          {/* New Customer Form (No search field, just a simple form) */}
          {isCreatingNewCustomer && (
            <div className="mt-4 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                value={newCustomer.name}
                onChange={handleNewCustomerChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={newCustomer.contact}
                onChange={handleNewCustomerChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={newCustomer.email}
                onChange={handleNewCustomerChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="text"
                name="bikes"
                placeholder="Number of Bikes"
                value={newCustomer.bikes}
                onChange={handleNewCustomerChange}
                className="border border-gray-300 p-2 rounded-lg"
              />
              <button
                onClick={handleCreateNewCustomer}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Create Customer
              </button>
            </div>
          )}

          {/* OTP input and verification */}
          {isOtpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 p-2 rounded mt-4"
              />
              {!isOtpValid && (
                <p className="text-red-500 text-sm">
                  Invalid OTP. Please try again.
                </p>
              )}
              <button
                onClick={handleOtpSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition mt-2"
              >
                Verify
              </button>
            </>
          )}
        </div>
      </Modal>

      {/* Offline Booking Modal */}
      <Modal
        title="Choose Your Option"
        isOpen={isBookingModalOpen}
        onClose={handleModalClose} // Redirect to orders page when modal is closed
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRedirect("/offlinebook/service")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Service
          </button>

          <button
            onClick={() => handleRedirect("/offlinebook/rsa")}
            className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            RSA
          </button>

          <button
            onClick={() => handleRedirect("/offlinebook/another")}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            Another Option
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OfflineBooking;
