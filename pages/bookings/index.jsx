import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import styles from "./booking.module.scss";
import Input from "@/components/Input";
import { Button } from "react-bootstrap";
import DatePickerComponent from "@/components/Datepicker";
import Dropdown from "@/components/Dropdown";
import ServiceListTable from "@/components/serviceTable/serviceTable";
import Layout from "@/components/Layout/Layout";
import { fetchAllGarages, fetchAllServices } from "@/app/services/service";
import ReactPaginate from "react-paginate";
import Modal from 'react-modal';
import NewService from "@/components/newService/NewService";

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
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [statistics, setStatistics] = useState({});
  const [garages, setGarages] = useState([]);
  const [resetTriggered, setResetTriggered] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false)




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
        search,
        status
      );
      setBookings(services?.data?.bookings);
      setStatistics(services?.data?.statistics)
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: services.data.pagination.totalPages,
      }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchGarages = async () => {
    try {
      const response = await fetchAllGarages()
      const filteredOptions = response.data.map((garage) => ({
        garageId: garage.id,
        name: garage.name
      }))
      setGarages(filteredOptions)
    } catch (error) {
      console.error('Error:', error);

    }

  }

  useEffect(() => {
    fetchServices();
  }, [pagination.page, pagination.limit, startDate, endDate, garageId]);

  useEffect(() => {
    fetchGarages()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchServices();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search, startDate, endDate, status]);

  const handlePageChange = (selectedPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      page: selectedPage + 1,
    }));
  };

  function handleResetFilter() {
    setPagination({ ...pagination, page: 1 })
    setStartDate(null);
    setSearch('')
    setEndDate(null)
    setStatus('');
    setGarageId('')
    setResetTriggered(!resetTriggered)
  }


  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.allfilters}>
            <div className={styles.allcards}>
              <Card title="booked" subtitle={statistics?.booked ? statistics?.booked : 0} className={styles.cards} handleStatusSelection={() => setStatus('booked')} active={status === 'booked' ? true : false} />
              <Card title="accepted" subtitle={statistics?.accepted ? statistics?.accepted : 0} handleStatusSelection={() => setStatus('accepted')} active={status === 'accepted' ? true : false} />
              <Card title="picked" subtitle={statistics?.picked ? statistics?.picked : 0} handleStatusSelection={() => setStatus('picked')} active={status === 'picked' ? true : false} />
              <Card title="repairing" subtitle={statistics?.repairing ? statistics?.repairing : 0} handleStatusSelection={() => setStatus('repairing')} active={status === 'repairing' ? true : false} />
              <Card title="billing" subtitle={statistics?.billing ? statistics?.billing : 0} handleStatusSelection={() => setStatus('billing')} active={status === 'billing' ? true : false} />
              <Card title="readyToDeliver" subtitle={statistics?.readyToDeliver ? statistics?.readyToDeliver : 0} handleStatusSelection={() => setStatus('readyToDeliver')} active={status === 'readyToDeliver' ? true : false} />
              <Card title="delivered" subtitle={statistics?.delivered ? statistics?.delivered : 0} handleStatusSelection={() => setStatus('delivered')} active={status === 'delivered' ? true : false} />
            </div>

            <div className={styles.filters}>
              <div className={styles.searchfilter}>
                <Input type="search" name="search" placeholder="search" handleChange={(e) => setSearch(e.target.value)} />
              </div>

              <div className={styles.vehiclefilter}>
                <Dropdown options={garages} name="name" onSelect={(id) => setGarageId(id)} reset={resetTriggered} />
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
              <div className={styles.resetbtn} onClick={() => { setModalIsOpen(true) }}>
                <Button className={styles.btn}>Create</Button>
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
      {modalIsOpen && <NewService modalIsOpen={modalIsOpen} garages={garages} completion={() => { setModalIsOpen(false); fetchServices() }} />}
    </>
  );
};

export default Dashboard;
