import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isValid } from "date-fns";

const CustomDatePicker = ({
  selectedDate,
  onChange,
  startDate,
  endDate,
  selectsRange,
  minDate,
  isStartDate,
  isEndDate,
  placeholderText,
  dateFormat = "yyyy-MM-dd",
  showMonthYearPicker = false,
  selectsStart,
  selectsEnd,
}) => {
  // Function to check if the date is valid
  const isValidDate = (date) => {
    return date && isValid(date);
  };

  return (
    <div>
      {/* Ensure the parent div is full width */}
      <DatePicker
        selected={isValidDate(selectedDate) ? selectedDate : null} // Ensure valid date
        onChange={onChange}
        startDate={isValidDate(startDate) ? startDate : null} // Validate start date
        endDate={isValidDate(endDate) ? endDate : null} // Validate end date
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        selectsRange={selectsRange}
        minDate={isValidDate(minDate) ? minDate : null} // Validate minDate
        dateFormat={dateFormat}
        className="border p-2 rounded w-[200px]" // Ensure input takes full width
        placeholderText={placeholderText}
        showMonthYearPicker={showMonthYearPicker}
      />
    </div>
  );
};

export default CustomDatePicker;
