import React, { useMemo } from "react";
import TableTab from "@/components/Table/TableTab";
import { remindersdata } from "@/components/Table/data"; // Assuming the data is available

const Reminders = () => {
  // Dynamically get the headers from the first object in the remindersdata
  const headers = remindersdata.length > 0 ? Object.keys(remindersdata[0]) : [];

  // Process data to categorize by tabs: service, insurance, emission
  const processedTabs = [
    { name: "All", condition: "all" },
    { name: "Active", condition: "active" },
    { name: "Expired", condition: "expired" },
  ];

  const getStatus = (item) => {
    // Check if any of service, insurance, or emission is expired
    if (item.service === 0 || item.insurance === 0 || item.emission === 0) {
      return "Expired"; // Any one of them is 0 means expired
    }
    return "Active"; // If none are 0, the status is Active
  };

  // Add status (Active/Expired) to each item in remindersdata
  const remindersWithStatus = useMemo(() => {
    return remindersdata.map((item) => ({
      ...item,
      status: getStatus(item),
    }));
  }, [remindersdata]);

  return (
    <>
      <div>
        {/* TableTab Section */}
        <div className="mb-5">
          <TableTab
            title="Reminders"
            headers={headers} // Passing the dynamically generated headers
            data={remindersWithStatus} // Passing the data with status
            daterange={false}
            tabs={processedTabs.map((tab) => tab.name)} // Pass the tab names for filtering
          />
        </div>
      </div>
    </>
  );
};

export default Reminders;
