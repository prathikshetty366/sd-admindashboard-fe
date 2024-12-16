import React from "react";
import TableTab from "@/components/Table/TableTab";
import { sampleMotorbikeBookings } from "@/components/Table/data"; // Assuming the data is available

const Orders = () => {
  // Dynamically get the headers from the first object in the sampleMotorbikeBookings array
  const headers =
    sampleMotorbikeBookings.length > 0
      ? Object.keys(sampleMotorbikeBookings[0])
      : [];

  // Extract the 'status' values
  const statusList = sampleMotorbikeBookings.map((booking) => booking.status);

  // Get unique status values using Set
  const uniqueStatuses = ["All", ...new Set(statusList)];

  console.log(uniqueStatuses);

  return (
    <>
      <div>
        {/* TableTab Section */}
        <div className="mb-5">
          <TableTab
            title="Orders"
            headers={headers} // Passing the dynamically generated headers
            data={sampleMotorbikeBookings}
            daterange={true}
            tabs={uniqueStatuses}
            dateField="bookingDate"
          />
        </div>
      </div>
    </>
  );
};

export default Orders;
