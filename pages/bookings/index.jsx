import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import styles from "./booking.module.scss";
import Input from "@/components/Input";
import { Button } from "react-bootstrap";
import DatePickerComponent from "@/components/Datepicker";
import Dropdown from "@/components/Dropdown";
import ServiceListTable from "@/components/serviceTable/serviceTable";
import Layout from "@/components/Layout/Layout";
import { fetchAllServices } from "@/app/services/service";
import ReactPaginate from "react-paginate";
import { setDate } from "date-fns";

const VehicleOptions = [
  { value: "", label: "Select Brand" },
  { value: "tvs", label: "TVS" },
  { value: "ktm", label: "KTM" },
];

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [garageId, setGarageId] = useState(null);
  const [search, setSearch] = useState(null);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const padZero = (num) => (num < 10 ? `0${num}` : num);

    const year = d.getFullYear();
    const month = padZero(d.getMonth() + 1);
    const day = padZero(d.getDate());
    const hours = padZero(d.getHours());
    const minutes = padZero(d.getMinutes());
    const seconds = padZero(d.getSeconds());
    const milliseconds = d.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const fetchServices = async () => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      const services = await fetchAllServices(
        pagination.page,
        pagination.limit,
        garageId,
        formattedStartDate,
        formattedEndDate,
        search
      );
      setBookings(services?.data?.bookings);
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: services.data.pagination.totalPages,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [pagination.page, pagination.limit, startDate, endDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search, startDate, endDate]);

  const handlePageChange = (selectedPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: selectedPage + 1,
    }));
  };

  function handleResetFilter() {
    setStartDate(null);
    setSearch(null)
    setEndDate(null)

  }

  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.allfilters}>
            <div className={styles.allcards}>
              <Card title="booked" subtitle="29" className={styles.cards} />
              <Card title="accepted" subtitle="29" />
              <Card title="picked" subtitle="12" />
              <Card title="repairing" subtitle="6" />
              <Card title="billing" subtitle="23" />
              <Card title="readyToDeliver" subtitle="10" />
              <Card title="delivered" subtitle="20" />
            </div>

            <div className={styles.filters}>
              <div className={styles.searchfilter}>
                <Input type="search" name="search" placeholder="search" handleChange={(e) => setSearch(e.target.value)} />
              </div>

              <div className={styles.vehiclefilter}>
                <Dropdown options={VehicleOptions} name="options" />
              </div>

              <div className={styles.datefilter}>
                <div className={styles.fromdatefilter}>
                  <DatePickerComponent handleDateChange={(date) => setStartDate(date)} />
                </div>

                <div className={styles.todatefilter}>
                  <DatePickerComponent handleDateChange={(date) => setEndDate(date)} />
                </div>
              </div>

              <div className={styles.resetbtn} onClick={handleResetFilter}>
                <Button className={styles.btn}>Reset Button</Button>
              </div>
            </div>
          </div>
          <ServiceListTable data={bookings} />
          <div className={styles.pagination}>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel={<span className="paginationBreak">...</span>}
              pageCount={pagination.totalPages}
              onPageChange={({ selected }) => handlePageChange(selected)}
              pageRangeDisplayed={5}
              containerClassName="pagination"
              pageClassName="pageItem"
              pageLinkClassName="pageLink"
              forcePage={pagination.page - 1}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
