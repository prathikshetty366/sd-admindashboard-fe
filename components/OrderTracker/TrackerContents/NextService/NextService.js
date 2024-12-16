import React, { useState } from "react";
import CustomDatePicker from "./../../../Datepicker/Datepicker"; // Import your datepicker component
import { format } from "date-fns"; // For formatting the date

const NextService = () => {
  const [nextServiceDate, setNextServiceDate] = useState(null); // Single date for next service
  const [warrantyStartDate, setWarrantyStartDate] = useState(null); // Start date for warranty
  const [warrantyEndDate, setWarrantyEndDate] = useState(null); // End date for warranty
  const [error, setError] = useState(""); // For validation error messages

  // Checkboxes state for the delivery checks
  const [checklist, setChecklist] = useState({
    wash: true,
    greasing: true,
    polish: true,
    serviceSticker: true,
    forkSticker: true,
  });

  const [reason, setReason] = useState(""); // Reason for missing checkbox task
  const [isReasonVisible, setIsReasonVisible] = useState(false); // Flag for showing reason input

  // Handle change for the warranty date range
  const handleWarrantyDateChange = (dates) => {
    const [start, end] = dates;
    setWarrantyStartDate(start);
    setWarrantyEndDate(end);

    if (start && !end) {
      setError("Please select an end date for the warranty period.");
    } else {
      setError(""); // Clear error when both dates are selected
    }
  };

  // Handle change for the next service date (single date)
  const handleNextServiceDateChange = (date) => {
    setNextServiceDate(date);
    setError(""); // Clear error if any
  };

  // Handle change for checklist tasks (checkboxes)
  const handleChecklistChange = (e) => {
    const { name, checked } = e.target;
    setChecklist((prevChecklist) => {
      const updatedChecklist = { ...prevChecklist, [name]: checked };
      // Check if any checkbox is unchecked, then show the reason field
      const anyUnchecked = Object.values(updatedChecklist).includes(false);
      setIsReasonVisible(anyUnchecked);
      return updatedChecklist;
    });
  };

  // Handle change for reason input
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // If next service date is not selected, show error
    if (!nextServiceDate) {
      setError("Next Service Date is required.");
      return;
    }

    // If any checkbox is unchecked, reason is required
    if (isReasonVisible && !reason) {
      setError("Please provide a reason for missing a task.");
      return;
    }

    const formattedNextServiceDate = nextServiceDate
      ? format(nextServiceDate, "yyyy-MM-dd")
      : "";
    const formattedWarrantyStartDate = warrantyStartDate
      ? format(warrantyStartDate, "yyyy-MM-dd")
      : "";
    const formattedWarrantyEndDate = warrantyEndDate
      ? format(warrantyEndDate, "yyyy-MM-dd")
      : "";

    alert(`
      Next Service Date: ${formattedNextServiceDate}
      Warranty Start Date: ${formattedWarrantyStartDate}
      Warranty End Date: ${formattedWarrantyEndDate}
      Reason: ${reason}
      Checklist: ${JSON.stringify(checklist)}
    `);

    console.log({
      nextServiceDate: formattedNextServiceDate,
      warrantyStartDate: formattedWarrantyStartDate,
      warrantyEndDate: formattedWarrantyEndDate,
      reason,
      checklist,
    });
  };

  // Clear the next service date
  const clearNextServiceDate = () => {
    setNextServiceDate(null);
  };

  // Clear the warranty date range
  const clearWarrantyDateRange = () => {
    setWarrantyStartDate(null);
    setWarrantyEndDate(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="space-y-4">
          {/* Next Service Date and Warranty Date Range (side-by-side) */}
          <div className="flex space-x-8">
            {/* Next Service Date (Single Date Picker) */}
            <div className="w-1/2">
              <label
                htmlFor="nextServiceDate"
                className="block text-sm font-medium text-gray-700"
              >
                Next Service Date <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <CustomDatePicker
                  selectedDate={nextServiceDate}
                  onChange={handleNextServiceDateChange} // For single date change
                  placeholderText="Next service date"
                  dateFormat="yyyy-MM-dd"
                />
                {nextServiceDate && (
                  <button
                    type="button"
                    onClick={clearNextServiceDate}
                    className="text-blue-500 text-sm"
                  >
                    Clear Date
                  </button>
                )}
              </div>
              {/* Error for next service date */}
              {!nextServiceDate && (
                <div className="text-red-500 text-sm">
                  This field is required
                </div>
              )}
            </div>

            {/* Warranty Period (Date Range Picker) */}
            <div className="w-1/2">
              <label
                htmlFor="warrantyPeriod"
                className="block text-sm font-medium text-gray-700"
              >
                Warranty Period (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <CustomDatePicker
                  selectedDate={[warrantyStartDate, warrantyEndDate]} // Pass range as an array
                  onChange={handleWarrantyDateChange} // For date range change
                  selectsRange
                  startDate={warrantyStartDate}
                  endDate={warrantyEndDate}
                  placeholderText="Warranty start and end date"
                  dateFormat="yyyy-MM-dd"
                />
                {(warrantyStartDate || warrantyEndDate) && (
                  <button
                    type="button"
                    onClick={clearWarrantyDateRange}
                    className="text-blue-500 text-sm"
                  >
                    Clear Date Range
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Checklist (Checkboxes for Tasks) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Checklist (Delivery Tasks)
            </label>
            <div className="flex space-x-4">
              {[
                "wash",
                "greasing",
                "polish",
                "serviceSticker",
                "forkSticker",
              ].map((task) => (
                <div key={task} className="flex items-center">
                  <input
                    type="checkbox"
                    name={task}
                    checked={checklist[task]}
                    onChange={handleChecklistChange}
                    className="mr-2"
                  />
                  <label htmlFor={task} className="text-sm">
                    {task.charAt(0).toUpperCase() +
                      task.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Reason for missing task (if any checkbox is unchecked) */}
          {isReasonVisible && (
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-red-500"
              >
                Please provide a reason for missing a task
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={handleReasonChange}
                placeholder="Enter reason"
                className="border p-2 w-full rounded-md"
              />
            </div>
          )}
        </div>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default NextService;
