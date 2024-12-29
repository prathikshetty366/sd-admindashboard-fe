import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// import quoteData from "./DummyQuote";

const quoteData = {
  customerName: "Krishna Bhandari",
  serviceConsultant: "Rajkumar Prajapati",
  address: "Kalyan, Gandhari, KALYAN",
  modelCode: "VCDZ605E",
  registrationNumber: "MH05FG7936",
  jobCardNumber: "RJ004509DE0930",
  modelName: "CLASSIC 350 EFI SIGNALS STORMRIDER SAND",
  jobCardDate: "23-10-2021 10:05",
  odometerReading: "1,230",
  quoteDate: "23-10-2021",
  recipientGSTIN: "U355F1MC766367",
  serviceCentre: "S R Motors - Service",
  engineNumber: "U355F1MC766367",
  supplierGSTIN: "27AAECR0005P1ZD",
  chassisNumber: "ME3U355F2MC014841",
  customerVoice: "Customer voice goes here",
  parts: [
    {
      code: "300002",
      description: "Liquid Gun Semi Synthetic",
      qty: 2,
      price: 350.15,
      amount: 700.3,
    },
    {
      code: "BB844A",
      description: "Oil Filter with O Ring",
      qty: 1,
      price: 62.71,
      amount: 62.71,
    },
  ],
  labour: [
    {
      code: "GL440A",
      description: "Chain Lubrication",
      hrs: 0.4,
      price: 425.0,
      amount: 170.0,
    },
    {
      code: "GL440B",
      description: "Consumable Charges",
      hrs: 2.2,
      price: 200.0,
      amount: 440.0,
    },
  ],
  totalAmount: 1183.01,
};

const QuoteTemplate = () => {
  const downloadPDF = () => {
    const element = document.getElementById("invoice-template");
    html2canvas(element, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      // Define page width and height
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Define the margin (e.g., 3mm on all sides)
      const margin = 4; // in mm

      // Calculate dimensions of the image inside the PDF, considering the margin
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Add the image to the PDF with margins
      pdf.addImage(imgData, "PNG", margin, margin, contentWidth, contentHeight);

      // Save the PDF
      pdf.save(`invoice_${quoteData.invoiceId}.pdf`);
    });
  };

  return (
    <div className="p-4">
      <div
        id="invoice-template"
        className="font-sans p-5 h-auto max-w-4xl mx-auto border-2"
      >
        <div className="border-[2px] border-black p-5 h-auto relative">
          <header className="flex justify-between items-end mb-5">
            <h1 className="text-xl font-bold">Service Quote</h1>
            <img
              src="/teams/fulllogo.png"
              alt="Company Logo"
              className="w-[40%]"
            />
          </header>
          <hr className="mb-5" />

          <section>
            <table className="w-full mb-5 text-sm border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 ">
                    <strong>Customer Name:</strong> {quoteData.customerName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Service Consultant:</strong>{" "}
                    {quoteData.serviceConsultant}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Address:</strong> {quoteData.address}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Model Code:</strong> {quoteData.modelCode}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Registration Number:</strong>{" "}
                    {quoteData.registrationNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Job Card Number:</strong> {quoteData.jobCardNumber}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Model Name:</strong> {quoteData.modelName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Job Card Date:</strong> {quoteData.jobCardDate}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Odometer Reading:</strong>{" "}
                    {quoteData.odometerReading}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Quote Date:</strong> {quoteData.quoteDate}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Recipient GSTIN:</strong> {quoteData.recipientGSTIN}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Service Centre:</strong> {quoteData.serviceCentre}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Engine Number:</strong> {quoteData.engineNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Company GSTIN:</strong> {quoteData.supplierGSTIN}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Chassis Number:</strong> {quoteData.chassisNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Customer Voice:</strong> {quoteData.customerVoice}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <h3 className="text-lg font-bold mb-2">Parts Description</h3>
          <table className="w-full text-sm border-collapse border border-gray-300 mb-5">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Code</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Qty</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quoteData.parts.map((part, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{part.code}</td>
                  <td className="border border-gray-300 p-2">
                    {part.description}
                  </td>
                  <td className="border border-gray-300 p-2">{part.qty}</td>
                  <td className="border border-gray-300 p-2">{part.price}</td>
                  <td className="border border-gray-300 p-2">{part.amount}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} />
                <td colSpan={1}>Total</td>
                <td>2,398</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-bold mb-2">Labour Description</h3>
          <table className="w-full text-sm border-collapse border border-gray-300 mb-5">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Code</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Hrs</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quoteData.labour.map((labour, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{labour.code}</td>
                  <td className="border border-gray-300 p-2">
                    {labour.description}
                  </td>
                  <td className="border border-gray-300 p-2">{labour.hrs}</td>
                  <td className="border border-gray-300 p-2">{labour.price}</td>
                  <td className="border border-gray-300 p-2">
                    {labour.amount}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} />
                <td colSpan={1}>Total</td>
                <td>2,398</td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row justify-between mb-5 mt-5">
            <div className="w-[1/2] flex">
              <table>
                <tr>
                  <td className="border border-gray-300 p-2">Grand Total</td>
                  <td className="border border-gray-300 p-2">2,3090</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2"> Paid</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              </table>
            </div>
            <div>
              <p>Authorised signature</p>
              <hr />
            </div>
            <div>
              <p>Customer signature</p>
              <hr />
            </div>
          </div>

          <footer className="text-sm  inset-x-0 p-4 border-t border-gray-300 bg-white">
            <div className="mb-2">
              <p>
                <strong>Address:</strong> Attur Layout - Spannerdoor Pvt Ltd
              </p>
            </div>
            <hr />
            <table className="w-full mt-2">
              <tbody>
                <tr>
                  <td className="p-1">
                    <strong>Contact:</strong> +91 787987879
                  </td>
                  <td className="p-1">
                    <strong>Mobile:</strong> +91 787987879
                  </td>
                </tr>
                <tr>
                  <td className="p-1">
                    <strong>Email:</strong> care@SPANNERDOOR.COM
                  </td>
                  <td className="p-1">
                    <strong>Website:</strong> www.spannerdoor.com
                  </td>
                </tr>
              </tbody>
            </table>
          </footer>
        </div>

        <button
          onClick={downloadPDF}
          className="mt-10 px-5 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Download Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteTemplate;
