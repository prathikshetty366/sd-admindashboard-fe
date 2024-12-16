import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ExclamationTriangleIcon,
  FolderIcon,
  LifebuoyIcon,
  XMarkIcon, // Import close icon from Heroicons
} from "@heroicons/react/24/outline";
import { orders, customers, vehicles } from "./data"; // Import the sample data

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [rawQuery, setRawQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // To track the selected category for filtering
  const searchDialogRef = useRef(null); // Reference to the search dialog

  const query = rawQuery.toLowerCase();

  // Generic function to filter data based on query and category
  const filterData = (data, category) => {
    return (category === "all" || category === data.category) &&
      data.name.toLowerCase().includes(query)
      ? data
      : [];
  };

  const filteredOrders = orders.filter((order) => filterData(order, "orders"));
  const filteredCustomers = customers.filter((customer) =>
    filterData(customer, "customers")
  );
  const filteredVehicles = vehicles.filter((vehicle) =>
    filterData(vehicle, "vehicles")
  );

  // Close command palette if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDialogRef.current &&
        !searchDialogRef.current.contains(event.target) &&
        !event.target.closest("input")
      ) {
        setOpen(false);
      }
    };
    // Add event listener for clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle category selection for filtering
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="relative">
      {/* Trigger input that opens the Command Palette */}
      <div className="flex items-center space-x-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="border-b border-gray-300 focus:outline-none focus:border-indigo-600 p-2 w-full"
          onClick={() => setOpen(true)}
          onChange={(e) => setRawQuery(e.target.value)}
          value={rawQuery}
        />
      </div>

      {/* Command Palette */}
      {open && (
        <div
          className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20"
          ref={searchDialogRef}
        >
          <div className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all">
            {/* Close button at the top-right */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6 text-red-500" />
            </button>

            {/* Category Selector (Dropdown) */}
            <div className="flex mt-12 items-center justify-between p-2">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="all">All</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
                <option value="vehicles">Vehicles</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                autoFocus
                className="w-full p-4 pl-11 text-base text-gray-900 outline-none"
                placeholder="Search..."
                onChange={(e) => setRawQuery(e.target.value)}
                onBlur={() => setRawQuery("")}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Filtered items */}
            <div className="max-h-80 overflow-y-auto p-4 pb-2">
              {selectedCategory === "all" || selectedCategory === "orders"
                ? filteredOrders.length > 0 && (
                    <div>
                      <h2 className="text-xs font-semibold text-gray-900">
                        Orders
                      </h2>
                      <ul className="mt-2 text-sm text-gray-700">
                        {filteredOrders.map((order) => (
                          <li
                            key={order.id}
                            className="flex items-center space-x-2 py-2 cursor-pointer"
                          >
                            <FolderIcon className="w-5 h-5 text-gray-400" />
                            <span className="truncate">{order.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                : null}

              {selectedCategory === "all" || selectedCategory === "customers"
                ? filteredCustomers.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-xs font-semibold text-gray-900">
                        Customers
                      </h2>
                      <ul className="mt-2 text-sm text-gray-700">
                        {filteredCustomers.map((customer) => (
                          <li
                            key={customer.id}
                            className="flex items-center space-x-2 py-2 cursor-pointer"
                          >
                            <img
                              src={customer.imageUrl}
                              alt={customer.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="truncate">{customer.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                : null}

              {selectedCategory === "all" || selectedCategory === "vehicles"
                ? filteredVehicles.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-xs font-semibold text-gray-900">
                        Vehicles
                      </h2>
                      <ul className="mt-2 text-sm text-gray-700">
                        {filteredVehicles.map((vehicle) => (
                          <li
                            key={vehicle.id}
                            className="flex items-center space-x-2 py-2 cursor-pointer"
                          >
                            <FolderIcon className="w-5 h-5 text-gray-400" />
                            <span className="truncate">{vehicle.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                : null}
            </div>

            {/* Empty state */}
            {rawQuery === "?" && (
              <div className="px-6 py-14 text-center text-sm sm:px-14">
                <LifebuoyIcon className="mx-auto w-6 h-6 text-gray-400" />
                <p className="mt-4 font-semibold text-gray-900">
                  Help with searching
                </p>
                <p className="mt-2 text-gray-500">
                  Use this tool to quickly search for Orders, Customers, and
                  Vehicles across our entire platform.
                </p>
              </div>
            )}

            {/* No results */}
            {query !== "" &&
              filteredOrders.length === 0 &&
              filteredCustomers.length === 0 &&
              filteredVehicles.length === 0 && (
                <div className="px-6 py-14 text-center text-sm sm:px-14">
                  <ExclamationTriangleIcon className="mx-auto w-6 h-6 text-gray-400" />
                  <p className="mt-4 font-semibold text-gray-900">
                    No results found
                  </p>
                  <p className="mt-2 text-gray-500">
                    We couldn’t find anything with that term. Please try again.
                  </p>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
