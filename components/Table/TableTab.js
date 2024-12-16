import React, { useMemo } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import Button from "@/components/Button/Button";
import Link from "next/link"; // Use Next.js Link for routing

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
  filters = [],
  daterange = false,
  tabs = [],
  dateField = "bookingDate",
  additionalActions = null,
  csvFilename = "data.csv",
  tabFilterCol = "status",
}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortField, setSortField] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [selectedFilter, setSelectedFilter] = React.useState("All");
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(tabs[0] || "All");

  const handleSort = (field) => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
    toast.info(`Sorted by ${field} in ${sortOrder} order.`);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFilter("All");
    setStartDate(null);
    setEndDate(null);
    setSortField("");
    setSortOrder("asc");
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    if (activeTab !== "All") {
      result = result.filter((item) => item[tabFilterCol] === activeTab);
    }

    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "All") {
      result = result.filter((item) => item.status === selectedFilter);
    }

    if (daterange && (startDate || endDate)) {
      result = result.filter((item) => {
        const itemDate = item[dateField] ? parseISO(item[dateField]) : null;
        if (!itemDate) return false;

        const isAfterStart = startDate ? itemDate >= startDate : true;
        const isBeforeEnd = endDate ? itemDate <= endDate : true;

        return isAfterStart && isBeforeEnd;
      });
    }

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
    activeTab,
    daterange,
    dateField,
    tabFilterCol,
  ]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white px-10">
      <div className="flex flex-row justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        </div>
        <div className="flex justify-between items-center mb-4 space-x-3">
          {additionalActions && additionalActions}
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

      <div className="mb-4">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-transparent border border-blue-600 text-blue-600"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedFilter(tab === "All" ? "All" : tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="sm:flex sm:items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border w-[250px] px-3 py-2 rounded-md focus:outline-indigo-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filters.length > 0 && (
          <select
            className="ml-4 border px-3 py-2 rounded-md focus:outline-indigo-600"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        )}

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

        <button
          onClick={clearAllFilters}
          className="ml-4 text-blue-600 hover:text-blue-800 p-2"
        >
          <XMarkIcon className="w-8 h-8 m-2 text-white bg-red-500" />
        </button>
      </div>

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
              <tr key={index} className="cursor-pointer hover:bg-gray-100">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    {item[header] || "-"}
                  </td>
                ))}
                <td className="relative whitespace-nowrap py-4 px-3 text-right text-sm font-medium">
                  {/* Using Next.js Link for dynamic routing */}
                  <Link
                    href={`/${title.toLowerCase()}/${item.bookingId}`} // Dynamically creating the URL with lowercase title
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
    </div>
  );
}
