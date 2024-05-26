import React from "react";
import Card from "@/components/Card";
import styles from "./dashboard.module.scss";
import Input from "@/components/Input";
import { Button, Pagination } from "react-bootstrap";
import DatePickerComponent from "@/components/Datepicker";
import Dropdown from "@/components/Dropdown";
import TableComponent from "@/components/TableComponent";
import PaginationComponent from "@/components/PaginationComponent";
import Layout from "@/components/Layout/Layout";

const VehicleOptions = [
  { value: "", label: "Select Brand" },
  { value: "tvs", label: "TVS" },
  { value: "ktm", label: "KTM" },
];

const data = [
  {
    id: 1,
    name: "Anush G",
    regno: "KA20EC1108",
    bookstatus: "Booked",
    created: "12/01/2024",
  },
  {
    id: 2,
    name: "John Doe",
    regno: "KA01P7896",
    bookstatus: "Repairing",
    created: "01/03/2024",
  },
];

const Dashboard = () => {
  return (
    <>
      <Layout>
      <h1>Dashboard</h1>
      <div className={styles.container}>
        <div className={styles.allfilters}>
          <div className={styles.allcards}>
            <Card title="booked" subtitle="29" className={styles.cards} />
            <Card title="accepted" subtitle="29" />
            <Card title="picked" subtitle="12" />
            <Card title="repairing" subtitle="6" />
            <Card title="billing" subtitle="23" />
            <Card title="redyToDeliver" subtitle="10" />
            <Card title="delivered" subtitle="20" />
          </div>

          <div className={styles.filters}>
            <div className={styles.searchfilter}>
              <Input type="search" name="search" placeholder="search" />
            </div>

            <div className={styles.vehiclefilter}>
              <Dropdown options={VehicleOptions} name="options" />
            </div>

            <div className={styles.datefilter}>
              <div className={styles.fromdatefilter}>
                <DatePickerComponent />
              </div>

              <div className={styles.todatefilter}>
                <DatePickerComponent />
              </div>
            </div>

            <div className={styles.resetbtn}>
              <Button>Reset Button</Button>
            </div>
          </div>
        </div>
        <TableComponent data={data} />
        <div className={styles.pagination}>
          <PaginationComponent />
        </div>
        {/* <Pagination /> */}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
