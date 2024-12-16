import React, { useState } from "react";
import { useRouter } from "next/router";

const ServicePage = () => {
  // State to store customer, vehicle, and order details
  const [customer, setCustomer] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [vehicle, setVehicle] = useState({
    regNo: "",
    model: "",
    brand: "",
  });

  const [order, setOrder] = useState({
    date: "",
    time: "",
  });

  const router = useRouter();

  // Handle customer input changes
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle vehicle input changes
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order input changes
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  // Generate a dummy Order ID (you can customize this logic as needed)
  const generateOrderId = () => {
    return "ORD" + Math.floor(Math.random() * 1000000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate the order ID
    const orderId = generateOrderId();

    // Here, you can send the data to an API or log it to the console
    console.log("Customer:", customer);
    console.log("Vehicle:", vehicle);
    console.log("Order:", order);
    console.log("Generated Order ID:", orderId);

    // Show a success message
    alert("Service details submitted successfully!");

    // Redirect to the order page with the generated Order ID
    router.push(`/orders/${orderId}`);

    // Optionally, reset the form
    setCustomer({
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    });
    setVehicle({
      regNo: "",
      model: "",
      brand: "",
    });
    setOrder({
      date: "",
      time: "",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Service Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Customer Information</h3>
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
              placeholder="Customer Name"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleCustomerChange}
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleCustomerChange}
              placeholder="Email Address"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <textarea
              name="address"
              value={customer.address}
              onChange={handleCustomerChange}
              placeholder="Address"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Vehicle Information</h3>
          <div className="flex gap-4">
            <input
              type="text"
              name="regNo"
              value={vehicle.regNo}
              onChange={handleVehicleChange}
              placeholder="Registration No."
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="text"
              name="model"
              value={vehicle.model}
              onChange={handleVehicleChange}
              placeholder="Model"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <input
              type="text"
              name="brand"
              value={vehicle.brand}
              onChange={handleVehicleChange}
              placeholder="Brand"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Order Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Order Information</h3>
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={order.date}
              onChange={handleOrderChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="time"
              name="time"
              value={order.time}
              onChange={handleOrderChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create a Service Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicePage;
