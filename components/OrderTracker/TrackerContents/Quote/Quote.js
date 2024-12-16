// import InputField from "@/components/InputField/InputField";
// import { EditableTable } from "@/components/Table/EditableTable";

// export default function Quote({ id, orderId }) {
//   // const tableConfigs = [
//   //   {
//   //     title: "Quotes for Order",
//   //     columns: [
//   //       { header: "Name" },
//   //       { header: "Position" },
//   //       { header: "Salary" },
//   //     ],
//   //     initialRows: [
//   //       { cells: ["John Doe", "Software Engineer", "$100,000"] },
//   //       { cells: ["Jane Smith", "Product Manager", "$120,000"] },
//   //     ],
//   //     showCheckbox: false,
//   //     showAddButton: true,
//   //   },
//   // ];

//   const tableConfigs = [
//     {
//       title: "Quote for Motorbike Service",
//       columns: [
//         { header: "Name" },
//         { header: "Price" },
//         { header: "Qty" },
//         { header: "Amount" },
//       ],
//       initialRows: [
//         { cells: ["Brake Pads", 25.99, 2, 25.99 * 2] },
//         { cells: ["Oil Filter", 15.49, 3, 15.49 * 3] },
//       ],
//       showCheckbox: false,
//       showAddButton: true,
//     },
//   ];

//   return (
//     <div>
//       <div className="flex space-x-8">
//         <div className="w-1/2 mt-4">
//           <InputField
//             id="jobsheetid"
//             label="Jobsheet ID"
//             value={id}
//             type="text"
//             disabled
//           />
//         </div>
//       </div>
//       <EditableTable tableConfigs={tableConfigs} />

//       {/* Render the specific content for Quote here */}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin
import InputField from "@/components/InputField/InputField";
import { EditableTable } from "@/components/Table/EditableTable";
import { generatePDF } from "@/utils/generatepdf";

export default function Quote({ id, orderId }) {
  const [quoteData, setQuoteData] = useState([]);

  // Dummy quote data (replace with your actual data logic)
  useEffect(() => {
    // Example of fetching or assigning the quote data
    setQuoteData([
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

  // Handle PDF download
  const handleDownload = () => {
    const isQuote = true; // Set to true for quote, false for invoice
    const orderId = "12345";
    const invoiceData = [
      { name: "Item 1", price: 100, qty: 2, amount: 200 },
      { name: "Item 2", price: 50, qty: 1, amount: 50 },
      // Add more items as needed
    ];

    // Call the function to generate the PDF (Quote or Invoice)
    generatePDF(orderId, invoiceData, isQuote);
  };

  // Table Configurations for EditableTable
  const tableConfigs = [
    {
      title: "Quote for Motorbike Service",
      columns: [
        { header: "Name" },
        { header: "Price" },
        { header: "Qty" },
        { header: "Amount" },
      ],
      initialRows: quoteData.map((item) => [
        item.name,
        `$${item.price.toFixed(2)}`,
        item.qty,
        `$${item.amount.toFixed(2)}`,
      ]),
      showCheckbox: false,
      showAddButton: true,
    },
  ];

  return (
    <div>
      <div className="flex space-x-8">
        <div className="w-1/2 mt-4">
          <InputField
            id="jobsheetid"
            label="Jobsheet ID"
            value={id}
            type="text"
            disabled
          />
        </div>
      </div>

      {/* Editable table rendering */}
      <EditableTable tableConfigs={tableConfigs} />

      {/* Send Quote Button */}
      <button
        onClick={handleDownload}
        target="_blank"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Send Quote
      </button>

      {/* Render the specific content for Quote here */}
    </div>
  );
}
