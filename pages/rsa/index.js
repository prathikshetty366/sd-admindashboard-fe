import React from "react";
import TableTab from "@/components/Table/TableTab";
import { sampleRsaBookings } from "@/components/Table/data"; // Assuming the data is available

const RsaPage = () => {
  // Dynamically get the headers from the first object in the sampleRsaBookings array
  const headers =
    sampleRsaBookings.length > 0 ? Object.keys(sampleRsaBookings[0]) : [];

  // Extract the 'status' values
  const statusList = sampleRsaBookings.map((booking) => booking.status);

  // Get unique status values using Set
  const uniqueStatuses = ["All", ...new Set(statusList)];

  console.log(uniqueStatuses);

  return (
    <>
      <div>
        {/* TableTab Section */}
        <div className="mb-5">
          <TableTab
            title="Rsa"
            headers={headers} // Passing the dynamically generated headers
            data={sampleRsaBookings}
            daterange={true}
            tabs={uniqueStatuses}
            dateField="bookingDate"
          />
        </div>
      </div>
    </>
  );
};

export default RsaPage;
