import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CreateCustomerPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const router = useRouter();
  const { contact } = router.query;

  // Prefill contact field when the component mounts
  useEffect(() => {
    if (contact) {
      setCustomer((prev) => ({ ...prev, contact }));
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCustomer = () => {
    // Add logic to save the new customer
    alert(`Customer Created Successfully! Name: ${customer.name}`);
    router.push(`/offlinebook/vehicle-selection?contact=${customer.contact}`);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Customer</h2>
      <input
        type="text"
        name="name"
        value={customer.name}
        onChange={handleInputChange}
        placeholder="Customer Name"
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />
      <input
        type="text"
        name="contact"
        value={customer.contact}
        onChange={handleInputChange}
        placeholder="Contact Number"
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />
      <input
        type="email"
        name="email"
        value={customer.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      />
      <textarea
        name="address"
        value={customer.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="w-full border border-gray-300 p-2 rounded-lg mb-4"
      ></textarea>
      <button
        onClick={handleCreateCustomer}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
      >
        Create Customer
      </button>
    </div>
  );
};

export default CreateCustomerPage;
