import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "./Sidebar.module.scss";
import Dashboard from "@/pages/dashboard";

const Sidebar = () => {
  const [activeComponent, setActiveComponent] = useState("bookings");

  const renderComponent = () => {
    switch (activeComponent) {
      case "bookings":
        return <Dashboard />;
      case "invoice":
        return <Invoice />;
      case "vehicle":
        return <Vehicle />;
      case "customer":
        return <Customer />;
      default:
        return <Bookings />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={2} className={styles.sidebar}>
          <Button
            onClick={() => setActiveComponent("bookings")}
            className="w-100 mb-2"
          >
            Bookings
          </Button>
          <Button
            onClick={() => setActiveComponent("invoice")}
            className="w-100 mb-2"
          >
            Invoice
          </Button>
          <Button
            onClick={() => setActiveComponent("vehicle")}
            className="w-100 mb-2"
          >
            Vehicle
          </Button>
          <Button
            onClick={() => setActiveComponent("customer")}
            className="w-100 mb-2"
          >
            Customer
          </Button>
          <Button
            onClick={() => setActiveComponent("logout")}
            className="w-100 mb-2"
          >
            Logout
          </Button>
        </Col>
        <Col sm={10} className={styles.content}>
          {renderComponent()}
        </Col>
      </Row>
    </Container>
  );
};

const Bookings = () => (
  <div>
    <h2>Bookings</h2>
    <p>Content for Bookings</p>
  </div>
);
const Invoice = () => (
  <div>
    <h2>Invoice</h2>
    <p>Content for Invoice</p>
  </div>
);
const Vehicle = () => (
  <div>
    <h2>Vehicle</h2>
    <p>Content for Vehicle</p>
  </div>
);
const Customer = () => (
  <div>
    <h2>Customer</h2>
    <p>Content for Customer</p>
  </div>
);

export default Sidebar;
