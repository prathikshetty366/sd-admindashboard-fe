import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
// import jobsheetData from "./Dummyjobsheet";

const jobsheetData = {
  customerName: "Krishna Bhandari",
  serviceConsultant: "Rajkumar Prajapati",
  address: "Kalyan, Gandhari, KALYAN",
  modelCode: "VCDZ605E",
  registrationNumber: "MH05FG7936",
  jobCardNumber: "RJ004509DE0930",
  modelName: "CLASSIC 350 EFI SIGNALS STORMRIDER SAND",
  jobCardDate: "23-10-2021 10:05",
  odometerReading: "1,230",
  invoiceDate: "23-10-2021",
  recipientGSTIN: "U355F1MC766367",
  serviceCentre: "S R Motors - Service",
  engineNumber: "U355F1MC766367",
  supplierGSTIN: "27AAECR0005P1ZD",
  chassisNumber: "ME3U355F2MC014841",
  customerVoice: "Customer voice goes here",
};

const JobsheetTemplate = () => {
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
      pdf.save(`invoice_${jobsheetData.invoiceId}.pdf`);
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
            <h1 className="text-xl font-bold">Service Jobsheet</h1>
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
                    <strong>Customer Name:</strong> {jobsheetData.customerName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Service Consultant:</strong>{" "}
                    {jobsheetData.serviceConsultant}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Address:</strong> {jobsheetData.address}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Model Code:</strong> {jobsheetData.modelCode}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Registration Number:</strong>{" "}
                    {jobsheetData.registrationNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Job Card Number:</strong>{" "}
                    {jobsheetData.jobCardNumber}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Model Name:</strong> {jobsheetData.modelName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Job Card Date:</strong> {jobsheetData.jobCardDate}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Odometer Reading:</strong>{" "}
                    {jobsheetData.odometerReading}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Chassis Number:</strong>{" "}
                    {jobsheetData.chassisNumber}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Recipient GSTIN:</strong>{" "}
                    {jobsheetData.recipientGSTIN}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Service Centre:</strong>{" "}
                    {jobsheetData.serviceCentre}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <strong>Engine Number:</strong> {jobsheetData.engineNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <strong>Company GSTIN:</strong> {jobsheetData.supplierGSTIN}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="border border-gray-300 p-2">
                    <strong>Customer Voice:</strong>
                    {jobsheetData.customerVoice}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

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
          Download Jobsheet
        </button>
      </div>
    </div>
  );
};

export default JobsheetTemplate;
