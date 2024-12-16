import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Table({
  headers,
  data,
  filters = [],
  daterange = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle Sorting
  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
    toast.info(`Sorted by ${field} in ${sortOrder} order.`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFilter("All");
    setStartDate(null);
    setEndDate(null);
    setSortField("");
    setSortOrder("asc");
  };

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search term filtering
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    // Apply role-based filter
    if (selectedFilter !== "All") {
      result = result.filter((item) => item.role === selectedFilter);
    }

    // Apply date range filter
    if (daterange && (startDate || endDate)) {
      result = result.filter((item) => {
        const itemDate = item.date ? parseISO(item.date) : null;
        if (!itemDate) return false;

        const isAfterStart = startDate ? itemDate >= startDate : true;
        const isBeforeEnd = endDate ? itemDate <= endDate : true;

        return isAfterStart && isBeforeEnd;
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField.toLowerCase()];
        const bValue = b[sortField.toLowerCase()];
        return sortOrder === "asc"
          ? aValue > bValue
            ? 1
            : -1
          : aValue < bValue
          ? 1
          : -1;
      });
    }

    return result;
  }, [
    data,
    searchTerm,
    selectedFilter,
    sortField,
    sortOrder,
    startDate,
    endDate,
    daterange,
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white p-10">
      {/* Search & Filter Controls */}
      <div className="sm:flex sm:items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border w-[250px] px-3 py-2 rounded-md focus:outline-indigo-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <select
          className="ml-4 border px-3 py-2 rounded-md focus:outline-indigo-600"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select> */}

        {/* Date Range Filter (if enabled) */}
        {daterange && (
          <div className="flex ml-4 items-center">
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Start Date"
              className="border px-3 py-2 rounded-md focus:outline-indigo-600"
              dateFormat="yyyy-MM-dd"
            />
            <span className="mx-2">to</span>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              placeholderText="End Date"
              className="border px-3 py-2 rounded-md focus:outline-indigo-600"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        )}

        {/* Clear All Filters Button */}
        <button
          onClick={clearAllFilters}
          className="ml-4 text-blue-600 hover:text-blue-800 p-2"
        >
          <XMarkIcon className="w-8 h-8 m-2 text-white bg-red-500" />
        </button>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-3 px-3 text-left text-sm font-semibold text-gray-900 capitalize cursor-pointer"
                  onClick={() => handleSort(header)}
                >
                  {header}
                  {sortField === header && (
                    <span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
                  )}
                </th>
              ))}
              <th className="relative py-3 px-3 text-sm font-semibold text-gray-900">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {item[header.toLowerCase()]}
                  </td>
                ))}
                <td className="relative whitespace-nowrap py-4 px-3 text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
