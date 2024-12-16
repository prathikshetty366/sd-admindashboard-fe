import React, { useState } from "react";

const AddSpares = ({ sparePart, handleInputChange, handleAddSpare }) => {
  const [newSpare, setNewSpare] = useState(sparePart);

  // Handle input changes for the new spare
  const handleInputChangeForAdd = (e) => {
    const { name, value } = e.target;
    setNewSpare({ ...newSpare, [name]: value });
  };

  const handleAddNewSpare = () => {
    // Create new spare part data
    const newSpareData = {
      ...newSpare,
      id: Math.floor(Math.random() * 1000), // Generate a random ID or follow your logic
      createdAt: new Date().toISOString(), // Timestamp for creation
      currentStock: 0, // Initial stock is set to 0
    };

    // Call the passed handleAddSpare function
    handleAddSpare(newSpareData);

    // Log the new spare part data to the console
    console.log("New spare part added:", newSpareData);

    // Show an alert to notify the user
    alert("New spare part added successfully!");

    // Optionally, you can reset the form or leave it as it is
    setNewSpare(sparePart); // Reset the form
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <input
          type="text"
          name="spareId"
          placeholder="Spare ID"
          value={newSpare.spareId}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
        <input
          type="text"
          name="name"
          placeholder="Spare Part Name"
          value={newSpare.name}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          name="hsnCode"
          placeholder="HSN Code"
          value={newSpare.hsnCode}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
        <input
          type="text"
          name="tax"
          placeholder="Tax"
          value={newSpare.tax}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div className="flex space-x-4">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newSpare.price}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newSpare.category}
          onChange={handleInputChangeForAdd}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div className="w-full">
        <textarea
          name="description"
          placeholder="Description"
          value={newSpare.description}
          onChange={handleInputChangeForAdd}
          className="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleAddNewSpare}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Add Spare
      </button>
    </div>
  );
};

export default AddSpares;
