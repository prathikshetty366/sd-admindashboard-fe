import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField/InputField";
import { EditableTable } from "@/components/Table/EditableTable";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin
import { generatePDF } from "@/utils/generatepdf";

// Function to get current date in Asia/Kolkata timezone
function getCurrentDate() {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date().toLocaleDateString("en-IN", options);
  return date;
}

export default function Invoice({ id, orderId }) {
  const [invoiceData, SetInvoiceData] = useState([]);

  const [customerName, setCustomerName] = useState("Anush");
  const [billingAddress, setBillingAddress] = useState(
    "Gurukrupa nilaya, Kempegowda layout, 88/89, 25th Cross Rd, Yelahanka, Bengaluru, Karnataka 560064"
  );
  const [gstNumber, setGstNumber] = useState("");
  const [gstEnabled, setGstEnabled] = useState(false); // Track if GST checkbox is enabled
  const [invoiceDate, setInvoiceDate] = useState(getCurrentDate()); // Today's date
  const [dueDate, setDueDate] = useState(getCurrentDate()); // Today's date
  const [amount, setAmount] = useState(2020); // Default amount
  const [payamount, setPayamount] = useState(amount); // Payable amount
  const [notes, setNotes] = useState("");

  // Table configurations for EditableTable

  const tableConfigs = [
    {
      title: "Invoice for Order",
      columns: [
        { header: "Name" },
        { header: "Price" },
        { header: "Qty" },
        { header: "Amount" },
      ],
      initialRows: [
        { cells: ["Brake Pads", 25.99, 2, 25.99 * 2] },
        { cells: ["Oil Filter", 15.49, 3, 15.49 * 3] },
      ],
      showCheckbox: true,
      showAddButton: true,
    },
  ];

  // Dummy quote data (replace with your actual data logic)
  useEffect(() => {
    // Example of fetching or assigning the quote data
    SetInvoiceData([
      { id: 1, name: "Brake Pads", price: 25.99, qty: 2, amount: 25.99 * 2 },
      { id: 2, name: "Oil Filter", price: 15.49, qty: 3, amount: 15.49 * 3 },
      {
        id: 3,
        name: "Chain Lubricant",
        price: 12.99,
        qty: 1,
        amount: 12.99 * 1,
      },
    ]);
  }, []);

  // Handle input change for invoice fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "customerName":
        setCustomerName(value);
        break;
      case "billingAddress":
        setBillingAddress(value);
        break;
      case "gstNumber":
        setGstNumber(value);
        break;
      case "invoiceDate":
        setInvoiceDate(value);
        break;
      case "dueDate":
        setDueDate(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "notes":
        setNotes(value);
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    const isQuote = false; // Set to true for quote, false for invoice
    const orderId = "12345";
    const invoiceData = [
      { name: "Item 1", price: 100, qty: 2, amount: 200 },
      { name: "Item 2", price: 50, qty: 1, amount: 50 },
      // Add more items as needed
    ];

    // Call the function to generate the PDF (Quote or Invoice)
    generatePDF(orderId, invoiceData, isQuote);
  };

  // Log GST status and GST Number whenever they change
  useEffect(() => {
    if (gstEnabled) {
      console.log("GST Enabled");
      if (gstNumber) {
        console.log("GST Number:", gstNumber);
      } else {
        console.log("GST Number is not provided.");
      }
    } else {
      console.log("GST Disabled");
    }
  }, [gstEnabled, gstNumber]);

  return (
    <div className="p-6">
      <div className="flex space-x-8">
        {/* Invoice ID Section */}
        <div className="w-1/2 mt-4">
          <InputField
            id="invoiceid"
            label="Invoice ID"
            value={id}
            type="text"
            disabled
          />
        </div>

        {/* Order ID Section */}
        <div className="w-1/2 mt-4">
          <InputField
            id="orderId"
            label="Order ID"
            value={orderId}
            type="text"
            disabled
          />
        </div>
      </div>

      <div className="flex space-x-8 mt-4">
        {/* Customer Name */}
        <div className="w-1/2 mt-4">
          <InputField
            id="customerName"
            label="Customer Name"
            value={customerName}
            type="text"
            onChange={handleInputChange}
            name="customerName"
            required
          />
        </div>
        <div className="w-1/2 mt-4">
          {/* GST Number */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={gstEnabled}
              onChange={() => setGstEnabled(!gstEnabled)}
              id="enableGst"
              className="mr-2"
            />
            <label htmlFor="enableGst">Enable GST</label>
          </div>
          {gstEnabled && (
            <InputField
              id="gstNumber"
              label="GST Number (optional)"
              value={gstNumber}
              type="text"
              onChange={handleInputChange}
              name="gstNumber"
            />
          )}
        </div>
      </div>

      <div className="mt-4">
        {/* Billing Address */}
        <InputField
          id="billingAddress"
          label="Billing Address"
          value={billingAddress}
          type="text"
          onChange={handleInputChange}
          name="billingAddress"
          required
        />
      </div>

      <div className="flex space-x-8 mt-4">
        <div className="w-1/2 mt-4">
          {/* Invoice Date */}
          <InputField
            id="invoiceDate"
            label="Invoice Date"
            value={invoiceDate}
            type="date"
            onChange={handleInputChange}
            name="invoiceDate"
            required
          />
        </div>
        <div className="w-1/2 mt-4">
          {/* Due Date */}
          <InputField
            id="dueDate"
            label="Due Date"
            value={dueDate}
            type="date"
            onChange={handleInputChange}
            name="dueDate"
            required
          />
        </div>
      </div>

      {/* Render the Invoice Table */}
      <div className="mt-6">
        <EditableTable tableConfigs={tableConfigs} />
      </div>

      {/* <div className="flex space-x-8 mt-4">
        {/* Amount */}
      {/* <div className="w-1/2 mt-4">
        <InputField
          id="amount"
          label="Amount"
          value={amount}
          type="number"
          onChange={handleInputChange}
          name="amount"
        /> */}
      {/* </div> */}
      {/* </div> */}

      <div className="mt-4">
        <label htmlFor="notes" className="block text-sm font-medium">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={handleInputChange}
          rows="4" // Adjust rows as needed
          className="border p-2 w-full rounded-md"
          required
        />
      </div>

      {/* Send Quote Button */}
      <button
        onClick={handleDownload}
        target="_blank"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Send Invoice
      </button>
    </div>
  );
}

// import React from "react";
// import { generatePDF } from "@/utils/generatepdf"; // Ensure the correct import path

// const Invoice = () => {
//   const orderId = "12345";
//   const invoiceData = [
//     { name: "Product 1", price: 50, qty: 2, amount: 100 },
//     { name: "Product 2", price: 30, qty: 3, amount: 90 },
//   ];
//   const isQuote = false; // Set this to true if you want to generate a quote

//   // Call generatePDF function
//   const handleGeneratePDF = () => {
//     generatePDF(orderId, invoiceData, isQuote);
//   };

//   return (
//     <div>
//       <h2>Invoice</h2>
//       <button onClick={handleGeneratePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default Invoice;
