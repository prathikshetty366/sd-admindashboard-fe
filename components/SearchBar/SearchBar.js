// src/components/SearchBar.js

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { orders, customers, vehicles } from "./data"; // Import the data

// CommandPalette Component
function CommandPalette({ query }) {
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="absolute mt-2 p-4 bg-white border rounded-md shadow-md w-full z-10">
      <div>
        <h3 className="text-sm font-semibold">Orders</h3>
        {filteredOrders.map((order) => (
          <div key={order.id} className="py-1">
            {order.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Customers</h3>
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="py-1">
            {customer.name}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Vehicles</h3>
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="py-1">
            {vehicle.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState(""); // State to store the search query
  const [open, setOpen] = useState(false); // State to control the visibility of the CommandPalette

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center space-x-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="border-b border-gray-300 focus:outline-none focus:border-indigo-600 p-2 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query value
          onFocus={() => setOpen(true)} // Open CommandPalette when focused
          onBlur={() => setTimeout(() => setOpen(false), 100)} // Close CommandPalette after some delay
        />
      </div>

      {/* Show CommandPalette if open */}
      {open && query && <CommandPalette query={query} />}
    </div>
  );
}
