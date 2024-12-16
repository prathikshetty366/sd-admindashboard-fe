// pages/Spares/index.js

import React, { useState } from "react";
import { sparesdata } from "@/components/Table/data"; // Import the spares data
import TableTab from "@/components/Table/TableTab"; // Import your table component
import Modal from "@/components/Modal/Modal"; // Importing the Modal component
import AddSpares from "./addspares"; // Correct the import path for AddSpares component
import UpdateStock from "./updatestock"; // Correct the import path for UpdateStock component

const AllSpares = () => {
  const [sparePart, setSparePart] = useState({
    spareId: "",
    name: "",
    hsnCode: "",
    tax: "",
    price: "",
    category: "",
    description: "",
  });

  const [sparesData, setSparesData] = useState(sparesdata);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage modal visibility for Add
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to manage modal visibility for Update

  // Dynamically get the headers from the first object in the sparesdata array
  const headers = sparesdata.length > 0 ? Object.keys(sparesdata[0]) : [];

  // Extract unique categories from sparesdata for the tabs
  const categories = [
    "All",
    ...new Set(sparesdata.map((item) => item.category)),
  ];

  // Handle change for the spare part input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSparePart({ ...sparePart, [name]: value });
  };

  // Handle adding a new spare part
  const handleAddSpare = () => {
    const newSpare = {
      ...sparePart,
      id: sparesData.length + 1,
      createdAt: new Date().toISOString(),
    };
    setSparesData([...sparesData, newSpare]);
    setIsAddModalOpen(false); // Close the modal after adding spare

    // Clear the input fields
    setSparePart({
      spareId: "",
      name: "",
      hsnCode: "",
      tax: "",
      price: "",
      category: "",
      description: "",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex space-x-3">
          <button
            onClick={() => setIsAddModalOpen(true)} // Open the modal when clicked
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Add Spares
          </button>

          <button
            onClick={() => setIsUpdateModalOpen(true)} // Open the modal for update stock
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            Update Stock
          </button>
        </div>

        {/* Display List of Added Spares as Table */}
        <div className="mt-8">
          <TableTab
            title="Spares"
            headers={headers}
            data={sparesData}
            daterange={true}
            tabs={categories}
            dateField="createdAt"
          />
        </div>
      </div>

      {/* Modal for Adding Spare Parts */}
      <Modal
        title="Add New Spare Part"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Close the modal on close button
      >
        <AddSpares
          sparePart={sparePart}
          handleInputChange={handleInputChange}
          handleAddSpare={handleAddSpare}
        />
      </Modal>

      {/* Modal for Updating Stock */}
      <Modal
        title="Update Stock"
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)} // Close the modal on close button
      >
        <UpdateStock
          sparesData={sparesData}
          setSparesData={setSparesData}
          setIsUpdateModalOpen={setIsUpdateModalOpen}
        />
      </Modal>
    </>
  );
};

export default AllSpares;
