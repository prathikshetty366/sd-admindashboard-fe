import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin

// Dummy quote data
const dummyQuoteData = [
  { id: 1, name: "Brake Pads", price: 25.99, qty: 2, amount: 25.99 * 2 },
  { id: 2, name: "Oil Filter", price: 15.49, qty: 3, amount: 15.49 * 3 },
  { id: 3, name: "Chain Lubricant", price: 12.99, qty: 1, amount: 12.99 * 1 },
];

const QuotePreviewPage = () => {
  const router = useRouter();
  const { orderId } = router.query; // Get the orderId from the URL
  const [quoteData, setQuoteData] = useState(null);

  // Load quote data based on the orderId
  useEffect(() => {
    if (orderId) {
      // In a real app, fetch quote data from an API based on the orderId
      setQuoteData(dummyQuoteData); // Using dummy data for now
    }
  }, [orderId]);

  // // Generate PDF preview
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(18);
  //   doc.text(`Quote for Order ID: ${orderId}`, 14, 20);

  //   // Table Header
  //   const headers = ["Name", "Price", "Qty", "Amount"];
  //   const tableData = quoteData.map((item) => [
  //     item.name,
  //     `$${item.price.toFixed(2)}`,
  //     item.qty,
  //     `$${item.amount.toFixed(2)}`,
  //   ]);

  //   // Table Design
  //   doc.setFontSize(12);
  //   doc.autoTable({
  //     startY: 30,
  //     head: [headers],
  //     body: tableData,
  //     margin: { top: 20, bottom: 20, left: 10, right: 10 },
  //     theme: "striped",
  //     styles: { fontSize: 10, cellPadding: 5 },
  //     columnStyles: {
  //       0: { halign: "left" },
  //       1: { halign: "right" },
  //       2: { halign: "center" },
  //       3: { halign: "right" },
  //     },
  //   });

  //   // Calculate and display total
  //   const totalAmount = quoteData
  //     .reduce((total, item) => total + item.amount, 0)
  //     .toFixed(2);
  //   doc.text(`Total: $${totalAmount}`, 140, doc.lastAutoTable.finalY + 10);

  //   // Preview the generated PDF in a new window
  //   doc.output("datauri");
  // };

  // Handle PDF download
  const handleDownload = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(`Quote for Order ID: ${orderId}`, 14, 20);

    // Table Header
    const headers = ["Name", "Price", "Qty", "Amount"];
    const tableData = quoteData.map((item) => [
      item.name,
      `$${item.price.toFixed(2)}`,
      item.qty,
      `$${item.amount.toFixed(2)}`,
    ]);

    // Table Design
    doc.setFontSize(12);
    doc.autoTable({
      startY: 30,
      head: [headers],
      body: tableData,
      margin: { top: 20, bottom: 20, left: 10, right: 10 },
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "right" },
        2: { halign: "center" },
        3: { halign: "right" },
      },
    });

    // Calculate and display total
    const totalAmount = quoteData
      .reduce((total, item) => total + item.amount, 0)
      .toFixed(2);
    doc.text(`Total: $${totalAmount}`, 140, doc.lastAutoTable.finalY + 10);

    // Download the PDF
    doc.save(`quote_${orderId}.pdf`);
  };

  if (!quoteData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Quote for Order ID: {orderId}</h1>

      {/* Table displaying quote data */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {quoteData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {/* Preview and download buttons */}
        {/* <button onClick={generatePDF} style={{ margin: "10px" }}>
          Preview PDF
        </button> */}
        <button onClick={handleDownload} style={{ margin: "10px" }}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default QuotePreviewPage;
