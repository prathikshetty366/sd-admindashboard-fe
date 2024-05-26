import TableComponent from "@/components/TableComponent";
import React from "react";

const data = [
  { id: 1, name: "John Doe", age: 30, position: "Developer" },
  { id: 2, name: "Jane Smith", age: 25, position: "Designer" },
  { id: 3, name: "James Johnson", age: 35, position: "Manager" },
];

const Orders = () => {
  return (
    <>
      <TableComponent data={data} />
    </>
  );
};

export default Orders;
