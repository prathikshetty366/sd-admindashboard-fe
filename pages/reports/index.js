import React from "react";
import TableTab from "@/components/Table/TableTab"; // Assuming TableTab is a reusable table component
import { reportData } from "@/components/Table/data"; // Importing the sample report data
import CustomBarChart from "@/components/Charts/Barchart"; // Import the BarChart component

const Reports = () => {
  // Dynamically generate table headers from the first object in the data array
  const headers = reportData.length > 0 ? Object.keys(reportData[0]) : [];

  // Extract the values of the 'month' column
  const columnValues = reportData.map((item) => item["month"]); // Explicitly using 'month'

  // Get unique values using Set
  const uniqueColumnValues = ["All", ...new Set(columnValues)];

  console.log(uniqueColumnValues);

  return (
    <>
      <div>
        {/* Combined Bar Chart for Services, Revenue, and Expenses */}
        <CustomBarChart
          data={reportData}
          xDataKey="month"
          datasets={[
            { yDataKey: "serviced", label: "Serviced" },
            { yDataKey: "revenue", label: "Revenue" },
            { yDataKey: "expense", label: "Expense" },
            { yDataKey: "profit", label: "Profit" },
          ]}
          chartTitle="Monthly Service, Revenue, and Expense"
          xAxisLabel="Month"
          yAxisLabel="Amount"
          colors={["#000080", "#ff9800", "#f44336", "#4caf50"]} // Different colors for each dataset
        />

        <div className="mb-5">
          <TableTab
            title="Monthly Report"
            headers={headers}
            data={reportData}
            tabs={uniqueColumnValues}
            tabFilterCol="month" // Using "month" column for tab filtering
          />
        </div>
      </div>
    </>
  );
};

export default Reports;
