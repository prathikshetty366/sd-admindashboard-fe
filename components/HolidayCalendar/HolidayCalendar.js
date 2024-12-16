import { useState } from "react";
import FlexibleTableData from "@/components/Table/FlexibleTable";

const HolidayCalendar = () => {
  const columns = [
    { name: "Holiday", type: "text" },
    { name: "Holiday Date", type: "date" },
    { name: "Holiday Reason", type: "text" },
    { name: "Holiday Type", type: "select" },
  ];

  // Initial data
  const initialData = [
    {
      Holiday: "New Year's Day",
      "Holiday Date": "2024-01-01",
      "Holiday Reason": "Celebration of the New Year",
      "Holiday Type": "Govt",
    },
    {
      Holiday: "Independence Day",
      "Holiday Date": "2024-07-04",
      "Holiday Reason": "National Independence Day",
      "Holiday Type": "Govt",
    },
    {
      Holiday: "Christmas",
      "Holiday Date": "2024-12-25",
      "Holiday Reason": "Celebration of Christmas",
      "Holiday Type": "Govt",
    },
  ];

  // Handle save event (update your data)
  const handleSave = (updatedData) => {
    console.log("Data saved:", updatedData);
    // You can save the updated data to a database or API here
  };

  // Handle remove row event
  const handleRemoveRow = (updatedData) => {
    console.log("Updated data after row removal:", updatedData);
  };

  // Handle add row event
  const handleAddRow = (newRow) => {
    console.log("New row added:", newRow);
  };

  return (
    <div>
      <h1>Holiday Calendar 2024</h1>
      <FlexibleTableData
        columns={columns}
        data={initialData}
        onSave={handleSave}
        onRemoveRow={handleRemoveRow}
        onAddRow={handleAddRow}
      />
    </div>
  );
};

export default HolidayCalendar;
