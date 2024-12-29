// import React from "react";
// import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

// // Utility function for conditionally applying classNames
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function Stats({ miniStats }) {
//   return (
//     <div>
//       <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
//         {miniStats.map((item) => (
//           <div key={item.name} className="px-4 py-5 sm:p-6">
//             <dt className="text-base font-normal text-gray-900">{item.name}</dt>
//             <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
//               <div className="flex items-baseline text-2xl font-semibold text-blue-600">
//                 {item.stat}
//                 {item.previousStat && (
//                   <span className="ml-2 text-sm font-medium text-gray-500">
//                     from {item.previousStat}
//                   </span>
//                 )}
//               </div>

//               {item.changeType && (
//                 <div
//                   className={classNames(
//                     item.changeType === "increase"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800",
//                     "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
//                   )}
//                 >
//                   {item.changeType === "increase" ? (
//                     <ArrowUpIcon
//                       aria-hidden="true"
//                       className="-ml-1 mr-0.5 w-5 h-5 text-green-500"
//                     />
//                   ) : (
//                     <ArrowDownIcon
//                       aria-hidden="true"
//                       className="-ml-1 mr-0.5 w-5 h-5 text-red-500"
//                     />
//                   )}

//                   <span className="sr-only">
//                     {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
//                     by
//                   </span>
//                   {item.change}
//                 </div>
//               )}
//             </dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// }

// export default Stats;
import React, { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import CustomDatePicker from "./../Datepicker/Datepicker"; // Update this path as per your structure
import {
  isSameDay,
  isThisWeek,
  isThisMonth,
  isThisYear,
  parseISO,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Stats({ miniStats = [], sampleStats = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterByDate = (item) => {
    if (!item.createdDate) return true; // If no date, include the item
    const createdDate = parseISO(item.createdDate);
    switch (dateFilter) {
      case "Today":
        return isSameDay(createdDate, new Date());
      case "This Week":
        return isThisWeek(createdDate);
      case "This Month":
        return isThisMonth(createdDate);
      case "This Year":
        return isThisYear(createdDate);
      case "All":
      default:
        return true;
    }
  };

  const filterByCustomRange = (item) => {
    if (!startDate || !endDate) return true;
    if (!item.createdDate) return false;
    const createdDate = parseISO(item.createdDate);
    return createdDate >= startDate && createdDate <= endDate;
  };

  const filteredStats = sampleStats
    ?.filter((item) =>
      selectedCategory === "All" ? true : item.name === selectedCategory
    )
    .filter(filterByDate)
    .filter(filterByCustomRange);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        {/* Dropdown for category */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border p-2 rounded"
        >
          <option value="All">All Categories</option>
          {sampleStats?.map((stat) => (
            <option key={stat.name} value={stat.name}>
              {stat.name}
            </option>
          ))}
        </select>

        {/* Date Filter Dropdown */}
        <select
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>

        {/* Date Range Picker */}
        <CustomDatePicker
          selectedDate={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText="Custom Date Range"
        />
      </div>

      {/* Stats */}
      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        {filteredStats?.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <a href={item.path} target="_blank">
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                  {item.stat}
                  {item.previousStat && (
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      from {item.previousStat}
                    </span>
                  )}
                </div>
                {item.changeType && item.change && (
                  <div
                    className={classNames(
                      item.changeType === "increase"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                    )}
                  >
                    {item.changeType === "increase" ? (
                      <ArrowUpIcon
                        aria-hidden="true"
                        className="-ml-1 mr-0.5 w-5 h-5 text-green-500"
                      />
                    ) : (
                      <ArrowDownIcon
                        aria-hidden="true"
                        className="-ml-1 mr-0.5 w-5 h-5 text-red-500"
                      />
                    )}
                    <span className="sr-only">
                      {item.changeType === "increase"
                        ? "Increased"
                        : "Decreased"}{" "}
                      by
                    </span>
                    {item.change}
                  </div>
                )}
              </dd>
            </a>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Stats;
