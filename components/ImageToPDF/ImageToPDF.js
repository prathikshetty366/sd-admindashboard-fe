import React from "react";
import jsPDF from "jspdf";

const ImageToPDF = () => {
  // Dummy image URLs
  const images = [
    "https://via.placeholder.com/600x400?text=Image+1",
    "https://via.placeholder.com/600x400?text=Image+2",
    "https://via.placeholder.com/600x400?text=Image+3",
    "https://via.placeholder.com/600x400?text=Image+4",
  ];

  const generatePDF = async () => {
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      // Load image
      const imgElement = new Image();
      imgElement.src = img;

      await new Promise((resolve) => {
        imgElement.onload = () => {
          // Add image to PDF
          const imgWidth = 190; // Width of the image in the PDF
          const pageHeight = 297; // Height of the PDF page (A4 size)
          const imgHeight = (imgElement.height * imgWidth) / imgElement.width; // Maintain aspect ratio

          if (i > 0) {
            pdf.addPage();
          }
          pdf.addImage(img, "JPEG", 10, 10, imgWidth, imgHeight);
          resolve();
        };
      });
    }

    // Save the PDF
    pdf.save("DummyImages.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Dummy Images to PDF Generator</h2>

      {/* Image Preview */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Dummy ${index + 1}`}
              className="border border-gray-300 rounded shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Generate PDF Button */}
      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ImageToPDF;
