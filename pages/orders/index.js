import React, { useEffect, useState } from "react";
import TableTab from "@/components/Table/TableTab";
import { fetchAllGarages, fetchAllServices } from "@/app/services/service";
import { format } from "date-fns"; // Import date-fns for formatting


const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [statistics, setStatistics] = useState({}); // Storing the statistics data
  const [garageId, setGarageId] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch services including statistics
  const fetchServices = async () => {
    try {
      const services = await fetchAllServices(
        pagination.page,
        pagination.limit,
        garageId,
        startDate,
        endDate,
        search,
        status
      );

      const mappedBookings = services?.data?.bookings.map((booking) => {
        let finalStatus = booking.serviceHistory?.[booking.serviceHistory.length - 1]?.serviceStatus || "";
        const formattedDate = booking.serviceScheduledDate
        ? format(new Date(booking.serviceScheduledDate), "yyyy-MMM-dd")
        : "N/A";
        return {
          bookingId: booking.id,
          "Customer Name": booking.contactName,
          "License Plate": booking.vehicle?.licensePlate,
          "Scheduled Date": formattedDate,
          "Contact": booking.contact,
          "Garage Name": booking.garage?.name,
          status: finalStatus, 
        };
      }) || [];

      setBookings(mappedBookings);
      setStatistics(services?.data?.statistics || {}); // Set statistics from API response
      setPagination((prev) => ({
        ...prev,
        totalPages: services.data.pagination?.totalPages || 0,
      }));

      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  const fetchGarages = async () => {
    try {
      const response = await fetchAllGarages();
      const filteredOptions = response.data.map((garage) => ({
        garageId: garage.id,
        name: garage.name,
      }));
      setGarages(filteredOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };
useEffect(()=>{
 fetchGarages() 
},[])
  useEffect(() => {
    fetchServices();
  }, [pagination.page, pagination.limit, garageId, startDate, endDate, search, status]);

  const headers = [
    "Customer Name",
    "License Plate",
    "Scheduled Date",
    "Contact",
    "Garage Name",
  ];

  const statusList = [
    "booked",
    "accepted",
    "picked",
    "repairing",
    "billing",
    "readyToDeliver",
    "delivered",
    "cancelled",
  ];
  const uniqueStatuses = ["All", ...new Set(statusList)];

  const totalCount = Object.values(statistics).reduce((sum, count) => sum + count, 0);

  const onClearAllFilters = () => {
    setStatus("");
    setGarageId(null); // Reset garage filter
    setSearch("");
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <div>
      <div className="mb-5">
        <TableTab
          title="Orders"
          headers={headers}
          data={bookings}
          daterange={true}
          dateField="Scheduled Date"
          tabs={uniqueStatuses}
          tabFilterCol="status"
          searchValue={search}
          onSearchChange={setSearch}
          activeTab={status === "" ? "All" : status}
          onTabChange={setStatus}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={(page) => setPagination({ ...pagination, page })}
          statistics={{ ...statistics, all: totalCount }}  
          onClearAllFilters={onClearAllFilters}
          garages={garages}   // Pass garages to the child component
          onGarageChange={setGarageId} // Callback for garage selection
          />
      </div>
    </div>
  );
};

export default Orders;
