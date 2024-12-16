import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin for tables

// Function to generate PDF for Invoice/Quote
export const generatePDF = (orderId, invoiceData, isQuote = false) => {
  const doc = new jsPDF();

  // Title for the Invoice/Quote PDF
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`${isQuote ? "Quote" : "Invoice"} for Order ID: ${orderId}`, 14, 20);

  // Draw a line under the title for separation
  doc.setLineWidth(0.5);
  doc.line(10, 25, 200, 25);

  // Customer Information Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Customer Information", 14, 35);

  const customerInfo = [
    ["Name", "Anush"], // Example, replace with actual customer data
    ["Contact", "8975634567"], // Replace with dynamic contact info
    ["Email", "anush@example.com"], // Replace with dynamic email
  ];

  doc.autoTable({
    startY: 40,
    head: [["Field", "Details"]],
    body: customerInfo,
    margin: { left: 10, right: 10 },
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { halign: "left", fontStyle: "bold" },
      1: { halign: "left" },
    },
  });

  // Vehicle Information Section
  doc.setFontSize(12);
  doc.text("Vehicle Information", 14, doc.lastAutoTable.finalY + 10);

  const vehicleInfo = [
    ["Vehicle No", "KA20EC1189"], // Replace with dynamic vehicle number
    ["Brand", "Bajaj"], // Replace with dynamic brand
    ["Model", "Pulsar 220F"], // Replace with dynamic model
  ];

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 5,
    head: [["Field", "Details"]],
    body: vehicleInfo,
    margin: { left: 10, right: 10 },
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { halign: "left", fontStyle: "bold" },
      1: { halign: "left" },
    },
  });

  // Order Information Section
  doc.setFontSize(12);
  doc.text("Order Information", 14, doc.lastAutoTable.finalY + 10);

  const orderInfo = [
    ["Date", new Date().toLocaleDateString()], // Replace with dynamic date
    ["Time", "10:30 AM"], // Replace with dynamic time
    ["Payment Mode", "Credit Card"], // Replace with dynamic payment method
  ];

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 5,
    head: [["Field", "Details"]],
    body: orderInfo,
    margin: { left: 10, right: 10 },
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { halign: "left", fontStyle: "bold" },
      1: { halign: "left" },
    },
  });

  // Itemized Table for Quote/Invoice Items
  doc.setFontSize(14);
  doc.text("Itemized Details", 14, doc.lastAutoTable.finalY + 10);

  const headers = ["Item", "Description", "Price", "Qty", "Amount"];
  const tableData = invoiceData.map((item) => [
    item.name,
    "Product description", // Replace with actual descriptions if necessary
    `$${item.price.toFixed(2)}`,
    item.qty,
    `$${item.amount.toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 5,
    head: [headers],
    body: tableData,
    margin: { left: 10, right: 10 },
    theme: "striped",
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "left" },
      2: { halign: "right" },
      3: { halign: "center" },
      4: { halign: "right" },
    },
  });

  // Calculate and display total amount, taxes, etc.
  const subtotal = invoiceData
    .reduce((total, item) => total + item.amount, 0)
    .toFixed(2);
  const taxRate = 0.1; // Example tax rate
  const tax = (parseFloat(subtotal) * taxRate).toFixed(2);
  const totalAmount = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

  doc.setFontSize(12);
  doc.text(`Subtotal: $${subtotal}`, 140, doc.lastAutoTable.finalY + 10);
  doc.text(`Tax (10%): $${tax}`, 140, doc.lastAutoTable.finalY + 15);
  doc.text(`Total Amount: $${totalAmount}`, 140, doc.lastAutoTable.finalY + 20);

  // Authorized Sign Section
  doc.setFontSize(12);
  doc.text("Authorized Sign:", 14, doc.lastAutoTable.finalY + 30);
  doc.line(
    14,
    doc.lastAutoTable.finalY + 35,
    80,
    doc.lastAutoTable.finalY + 35
  ); // Sign line

  // Terms and Conditions
  doc.setFontSize(10);
  doc.text("Terms & Conditions:", 14, doc.lastAutoTable.finalY + 45);
  const terms = [
    "1. Payment is due upon receipt of the invoice.",
    "2. Late payment may incur a 2% fee per month.",
    "3. All sales are final after 30 days.",
  ];

  terms.forEach((term, index) => {
    doc.text(term, 14, doc.lastAutoTable.finalY + 55 + index * 10);
  });

  // Footer (Optional)
  doc.setFontSize(8);
  doc.text(
    "Thank you for your business!",
    14,
    doc.internal.pageSize.height - 10
  );

  // Download the PDF
  doc.save(`${isQuote ? "quote" : "invoice"}_${orderId}.pdf`);
};

// import { jsPDF } from "jspdf";

// // Function to generate PDF for Invoice/Quote using HTML
// export const generatePDF = (orderId, invoiceData, isQuote = false) => {
//   // Create a div that will contain the HTML content
//   const htmlContent = `
//     <div style="font-family: Arial, sans-serif; padding: 20px;">
//       <h1 style="text-align: center;">${
//         isQuote ? "Quote" : "Invoice"
//       } for Order ID: ${orderId}</h1>
//       <hr style="border: 1px solid #000;" />

//       <h2>Customer Information</h2>
//       <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
//         <tr><td><strong>Name</strong></td><td>Anush</td></tr>
//         <tr><td><strong>Contact</strong></td><td>8975634567</td></tr>
//         <tr><td><strong>Email</strong></td><td>anush@example.com</td></tr>
//       </table>

//       <h2>Vehicle Information</h2>
//       <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
//         <tr><td><strong>Vehicle No</strong></td><td>KA20EC1189</td></tr>
//         <tr><td><strong>Brand</strong></td><td>Bajaj</td></tr>
//         <tr><td><strong>Model</strong></td><td>Pulsar 220F</td></tr>
//       </table>

//       <h2>Order Information</h2>
//       <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
//         <tr><td><strong>Date</strong></td><td>${new Date().toLocaleDateString()}</td></tr>
//         <tr><td><strong>Time</strong></td><td>10:30 AM</td></tr>
//         <tr><td><strong>Payment Mode</strong></td><td>Credit Card</td></tr>
//       </table>

//       <h2>Itemized Details</h2>
//       <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
//         <thead>
//           <tr>
//             <th style="text-align: left;">Item</th>
//             <th style="text-align: left;">Description</th>
//             <th style="text-align: right;">Price</th>
//             <th style="text-align: center;">Qty</th>
//             <th style="text-align: right;">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${invoiceData
//             .map(
//               (item) => `
//             <tr>
//               <td>${item.name}</td>
//               <td>Product description</td>
//               <td style="text-align: right;">$${item.price.toFixed(2)}</td>
//               <td style="text-align: center;">${item.qty}</td>
//               <td style="text-align: right;">$${item.amount.toFixed(2)}</td>
//             </tr>
//           `
//             )
//             .join("")}
//         </tbody>
//       </table>

//       <div style="text-align: right; margin-top: 20px;">
//         <p><strong>Subtotal: </strong>$${invoiceData
//           .reduce((total, item) => total + item.amount, 0)
//           .toFixed(2)}</p>
//         <p><strong>Tax (10%): </strong>$${(
//           invoiceData.reduce((total, item) => total + item.amount, 0) * 0.1
//         ).toFixed(2)}</p>
//         <p><strong>Total Amount: </strong>$${(
//           invoiceData.reduce((total, item) => total + item.amount, 0) * 1.1
//         ).toFixed(2)}</p>
//       </div>

//       <h3>Authorized Sign:</h3>
//       <hr style="border-top: 1px solid #000;" />
//       <p>Terms & Conditions:</p>
//       <ul>
//         <li>1. Payment is due upon receipt of the invoice.</li>
//         <li>2. Late payment may incur a 2% fee per month.</li>
//         <li>3. All sales are final after 30 days.</li>
//       </ul>

//       <p style="text-align: center; font-size: 10px;">Thank you for your business!</p>
//     </div>
//   `;

//   // Create jsPDF instance
//   const doc = new jsPDF();

//   // Convert the HTML content to PDF
//   doc.html(htmlContent, {
//     callback: function (doc) {
//       // Save the PDF with a dynamic file name
//       doc.save(`${isQuote ? "quote" : "invoice"}_${orderId}.pdf`);
//     },
//     margin: [10, 10, 10, 10],
//     autoPaging: true,
//   });
// };
