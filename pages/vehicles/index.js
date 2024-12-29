import React, { useMemo } from "react";
import TableTab from "@/components/Table/TableTab";
import { vehiclesData } from "@/components/Table/data"; // Assuming the data is available

const VehiclePage = () => {
  // Dynamically get the headers from the first object in the vehiclesData
  const headers = vehiclesData.length > 0 ? Object.keys(vehiclesData[0]) : [];

  // Tabs for filtering
  const processedTabs = [
    { name: "All", condition: "all" },
    { name: "Recent Services", condition: "recent" }, // Filter for vehicles serviced in the last month
  ];

  const getStatus = (item) => {
    const lastServiceDate = new Date(item.lastService);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return lastServiceDate >= oneMonthAgo
      ? "Recent Services"
      : "Older Services";
  };

  // Add status to each vehicle
  const vehiclesWithStatus = useMemo(() => {
    return vehiclesData.map((item) => ({
      ...item,
      status: getStatus(item),
    }));
  }, [vehiclesData]);

  return (
    <>
      <div>
        {/* TableTab Section */}
        <div className="mb-5">
          <TableTab
            title="Vehicles"
            headers={headers} // Passing the dynamically generated headers
            data={vehiclesWithStatus} // Passing the data with status
            daterange={false}
            tabs={processedTabs.map((tab) => tab.name)} // Pass the tab names for filtering
          />
        </div>
      </div>
    </>
  );
};

export default VehiclePage;
