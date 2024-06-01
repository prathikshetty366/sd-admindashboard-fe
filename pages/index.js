import Layout from "@/components/Layout/Layout";
import React from "react";
import styles from './root.module.scss'
import Card from "@/components/Card";
import Dashboard from "./bookings";
import Login from "./login/login";
// import Cards from "@/components/Cards";
// import { users } from "./../data/user.json";
// import TableComponent from "@/components/TableComponent";
// import FormComponent from "@/components/FormComponent";
// import Navbar from "@/components/Navbar";
// import Input from "@/components/Input";
// import Checkbox from "@/components/Checkbox";
// import Dropdown from "@/components/Dropdown";
// import RadioButton from "@/components/RadioButton";
// import Card from "@/components/Card";
// import Form from "@/components/Form";
// import BreadcrumbComponent from "@/components/BreadcrumbComponent";
// import SpinnerComponent from "@/components/SpinnerComponent";

// const data = [
//   { id: 1, name: "John Doe", age: 30, position: "Developer" },
//   { id: 2, name: "Jane Smith", age: 25, position: "Designer" },
//   { id: 3, name: "James Johnson", age: 35, position: "Manager" },
// ];

// const dropdownOptions = [
//   { value: "", label: "Select an option" },
//   { value: "option1", label: "Option 1" },
//   { value: "option2", label: "Option 2" },
// ];

const app = () => {
  return (
    <>
      <Login /> 
    </>
  );
};

export default app;
