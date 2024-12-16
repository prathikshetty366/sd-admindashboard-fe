import React from "react";
import TableTab from "@/components/Table/TableTab"; // Assuming TableTab is a reusable table component
import { customersData } from "@/components/Table/data"; // Importing the dummy customers data

const Customers = () => {
  // Dynamically generate table headers from the first object in the data array
  const headers = customersData.length > 0 ? Object.keys(customersData[0]) : [];

  return (
    <>
      <div>
        {/* TableTab Section for displaying customers */}
        <div className="mb-5">
          <TableTab
            title="All Customers" // Updated title for customers
            headers={headers} // Dynamically generated headers
            data={customersData} // Data for customers
            daterange={true} // Enable date range filtering
            // You can add tabs or other props here in the future if needed
            dateField="lastService"
          />
        </div>
      </div>
    </>
  );
};

export default Customers;
