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
