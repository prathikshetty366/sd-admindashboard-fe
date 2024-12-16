import React, { useState } from "react";
import AddSpares from "./addspares"; // Import the AddSpares component

const UpdateStock = ({ sparesData, setSparesData, setIsUpdateModalOpen }) => {
  const [selectedSpareId, setSelectedSpareId] = useState(""); // ID of selected spare part
  const [newStock, setNewStock] = useState(""); // New stock value
  const [searchQuery, setSearchQuery] = useState(""); // Search query for dropdown
  const [isAddSpareForm, setIsAddSpareForm] = useState(false); // Manage which form is shown

  // Handle stock input change
  const handleStockChange = (e) => {
    setNewStock(e.target.value);
  };

  // Handle spare part selection from dropdown
  const handleSpareSelect = (e) => {
    setSelectedSpareId(e.target.value);
  };

  // Handle search input change for dropdown
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle stock update
  const handleUpdateStock = () => {
    if (!selectedSpareId) {
      alert("Please select a spare part.");
      return;
    }
    if (isNaN(newStock) || newStock < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const updatedSpare = sparesData.find(
      (spare) => spare.id === parseInt(selectedSpareId)
    );
    if (updatedSpare) {
      updatedSpare.currentStock = parseInt(newStock, 10); // Update the stock

      // Update the spares data in the parent state
      setSparesData([...sparesData]);

      // Close the modal after updating
      setIsUpdateModalOpen(false);
    }
  };

  // Add Spare function
  const handleAddSpare = (newSpare) => {
    // Add the new spare part to the sparesData
    setSparesData([...sparesData, newSpare]);

    // Switch back to the update stock form
    setIsAddSpareForm(false);
  };

  // Filter spares based on search query
  const filteredSpares = sparesData.filter(
    (spare) =>
      spare.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spare.hsnCode.includes(searchQuery)
  );

  // Check if spare part is found
  const spareFound = filteredSpares.some(
    (spare) => spare.id === parseInt(selectedSpareId)
  );

  return (
    <div className="space-y-4">
      {!isAddSpareForm ? (
        // Update Stock Form
        <>
          {/* Search Input for Dropdown */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search spare parts..."
            className="w-full border border-gray-300 p-2 rounded-lg mb-4"
          />

          {/* Dropdown for Selecting Spare Part */}
          <div>
            <select
              value={selectedSpareId}
              onChange={handleSpareSelect}
              className="w-full border border-gray-300 p-2 rounded-lg"
            >
              <option value="">Select Spare Part</option>
              {filteredSpares.length > 0 ? (
                filteredSpares.map((spare) => (
                  <option key={spare.id} value={spare.id}>
                    {spare.name} (Current Stock: {spare.currentStock})
                  </option>
                ))
              ) : (
                <option value="">No spare parts found</option>
              )}
            </select>
          </div>

          {/* If no spare part is selected, show "Add Spares" button */}
          {!spareFound && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsAddSpareForm(true)} // Switch to Add Spares form
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Add Spares
              </button>
            </div>
          )}

          {/* New Stock Input */}
          <div>
            <input
              type="number"
              value={newStock}
              onChange={handleStockChange}
              placeholder="Enter new stock"
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>

          {/* Update Button */}
          <div className="mt-4">
            <button
              onClick={handleUpdateStock}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Update Stock
            </button>
          </div>
        </>
      ) : (
        // Add Spares Form
        <AddSpares
          sparePart={{
            spareId: "",
            name: "",
            hsnCode: "",
            tax: "",
            price: "",
            category: "",
            description: "",
          }}
          handleInputChange={() => {}}
          handleAddSpare={(newSpare) => handleAddSpare(newSpare)} // Pass the handleAddSpare function to AddSpares
        />
      )}
    </div>
  );
};

export default UpdateStock;
