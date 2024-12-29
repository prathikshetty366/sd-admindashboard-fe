import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { quoteData } from "./DummyQuote";

const QuoteTemplate = ({}) => {
  //quoteData pass as props
  const downloadPDF = () => {
    const element = document.getElementById("quote-template");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`quote_${quoteData.orderId}.pdf`);
    });
  };

  return (
    <div>
      <div
        id="quote-template"
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          maxWidth: "800px",
          margin: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Quote</h1>
        <h3>Order ID: {quoteData.orderId}</h3>
        <h4>Customer Information</h4>
        <p>
          <strong>Name:</strong> {quoteData.customer.name}
        </p>
        <p>
          <strong>Contact:</strong> {quoteData.customer.contact}
        </p>
        <h3>Email: {quoteData.customer.email}</h3>

        <h4>Itemized Details</h4>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Item
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {quoteData.items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${item.price.toFixed(2)}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.quantity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 style={{ textAlign: "right", marginTop: "20px" }}>
          Total: $
          {quoteData.items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h4>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Quote as PDF
      </button>
    </div>
  );
};

export default QuoteTemplate;
