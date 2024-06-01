import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ handleDateChange }) => {
  const [date, setDate] = useState(new Date());
  const handleSelection = (date) => {
    setDate(date)
    handleDateChange(date)
  }

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(date) => handleSelection(date)}
        dateFormat="yyyy/MM/dd"
      />
    </div>




  );
};

export default DatePickerComponent;
