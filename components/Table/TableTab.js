import React, { useMemo } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import Button from "@/components/Button/Button";
import Link from "next/link";

// CSV helpers
const convertToCSV = (data, headers) => {
  const rows = data.map((item) =>
    headers.map((header) => item[header] || "-").join(",")
  );
  return [headers.join(","), ...rows].join("\n");
};

const downloadCSV = (data, headers, filename = "data.csv") => {
  const csvData = convertToCSV(data, headers);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.target = "_blank";
  link.download = filename;
  link.click();
};

export default function TableTab({
  title,
  headers,
  data,
  daterange = false,
  dateField = "bookingDate",
  tabs = [],
  tabFilterCol = "status",
  csvFilename = "data.csv",

  // Parent-driven props
  searchValue,
  onSearchChange,
  activeTab,
  onTabChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClearAllFilters,
  garages = [], // Added for garage selection
  onGarageChange, 

  // Pagination props
  currentPage,    // e.g. 1
  totalPages,     // e.g. 5
  onPageChange,   // callback

  statistics = {}, // Receive statistics prop from parent

}) {
  // We only keep local state for sorting
  const [sortField, setSortField] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");

  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
    toast.info(`Sorted by ${field} in ${sortOrder} order.`);
  };

  const handleClearFiltersClick = () => {
    onClearAllFilters && onClearAllFilters();
  };

  // =========== FILTERING + SORTING ==============
  const filteredData = useMemo(() => {
    let result = [...data];

    // Tab-based filtering
    if (activeTab !== "All") {
      result = result.filter((item) => {
        const itemStatus = (item[tabFilterCol] || "").toLowerCase();
        return itemStatus === activeTab.toLowerCase();
      });
    }

    // Text search
    if (searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(lowerSearch)
      );
    }

    // Date range
    if (daterange && (startDate || endDate)) {
      result = result.filter((item) => {
        const rawDate = item[dateField];
        if (!rawDate) return false;
        const itemDate = parseISO(rawDate);
        if (isNaN(itemDate)) return false;

        const isAfterStart = startDate ? itemDate >= startDate : true;
        const isBeforeEnd = endDate ? itemDate <= endDate : true;
        return isAfterStart && isBeforeEnd;
      });
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField] || "";
        const bVal = b[sortField] || "";
        if (sortOrder === "asc") {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    return result;
  }, [
    data,
    activeTab,
    searchValue,
    daterange,
    startDate,
    endDate,
    sortField,
    sortOrder,
    tabFilterCol,
    dateField,
  ]);

  // =========== RENDERING UI ==============
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white px-10">
      {/* Header Row */}
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => downloadCSV(filteredData, headers, csvFilename)}
            color="green"
            variant="filled"
          >
            Download CSV
          </Button>
        </div>
      </div>

      <div className="border mb-5 mt-3"></div>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-600 text-blue-600"
            }`}
            onClick={() => onTabChange(tab=="All"?"":tab)}
          >
        {tab} ({statistics[tab.toLowerCase()] || 0}) {/* Now includes the sum for "All" */}
        </button>
        ))}
      </div>

      {/* Search + Date Range */}
      <div className="sm:flex sm:items-center mb-4">
        {/* Search field */}
        <input
          type="text"
          placeholder="Search..."
          className="border w-[250px] px-3 py-2 rounded-md focus:outline-indigo-600"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {daterange && (
          <div className="flex ml-4 items-center">
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              placeholderText="Start Date"
              className="border px-3 py-2 rounded-md focus:outline-indigo-600"
              dateFormat="yyyy-MM-dd"
            />
            <span className="mx-2">to</span>
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              placeholderText="End Date"
              className="border px-3 py-2 rounded-md focus:outline-indigo-600"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        )}

        {/* Clear Button */}
      
         <select
          className="border px-3 py-2 rounded-md focus:outline-indigo-600"
          onChange={(e) => onGarageChange(e.target.value)}
        >
          <option value="">All Garages</option>
          {garages.map((garage) => (
            <option key={garage.garageId} value={garage.garageId}>
              {garage.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearFiltersClick}
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
              {/* Optional extra column for "Edit"/"View" */}
              <th className="relative py-3 px-3 text-sm font-semibold text-gray-900">
                Edit
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="cursor-pointer hover:bg-gray-100">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {item[header] ?? "-"}
                  </td>
                ))}
                <td className="relative whitespace-nowrap py-4 px-3 text-right text-sm font-medium">
                  <Link
                    href={`/${title.toLowerCase()}/${item.bookingId}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
     <div className="flex justify-end items-center mt-4 space-x-1 pr-4">
    {/* Previous Button */}
    <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-2 py-1 text-xs rounded border ${
            currentPage <= 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
    >
        Prev
    </button>

    {/* Page Info */}
    <span className="text-xs font-medium px-2">
        Page {currentPage} of {totalPages}
    </span>

    {/* Next Button */}
    <button
        disabled={currentPage >= totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-2 py-1 text-xs rounded border ${
            currentPage >= totalPages || totalPages === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        }`}
    >
        Next
    </button>
</div>

    </div>
  );
}
