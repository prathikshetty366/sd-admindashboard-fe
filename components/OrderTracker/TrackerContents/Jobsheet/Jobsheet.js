// import React, { useState } from "react";
// import InputField from "./../../../InputField/InputField"; // Assuming it's in the same directory
// import Dropdown from "./../../../Dropdown/Dropdown"; // Assuming it's in the same directory
// import Button from "./../../../Button/Button"; // Assuming it's in the same directory
// import Slider from "./../../../Slider/Slider"; // The Slider component we created earlier
// import TextArea from "./../../../TextArea/TextArea"; // The TextArea component we created earlier

// import { technician } from "./../../../Dropdown/data"; // Assuming 'technician' data is imported

// const Jobsheet = ({ id, orderId }) => {
//   const [odometerReading, setOdometerReading] = useState("");
//   const [assignTechnician, setAssignTechnician] = useState(""); // Technician will be stored here
//   const [fuelPercent, setFuelPercent] = useState(0);
//   const [customerVoice, setCustomerVoice] = useState("");
//   const [isPaid, setIsPaid] = useState(false);
//   const [isWarranty, setIsWarranty] = useState(false);
//   const [isInsurance, setIsInsurance] = useState(false);
//   const [isEmission, setIsEmission] = useState(false);

//   // Handlers for form inputs
//   const handleOdometerChange = (e) => setOdometerReading(e.target.value);
//   const handleTechnicianChange = (value) => setAssignTechnician(value); // Update technician state
//   const handleFuelChange = (e) => setFuelPercent(e.target.value);
//   const handleCustomerVoiceChange = (e) => setCustomerVoice(e.target.value);

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const formData = {
//       orderId,
//       jobSheetId: id,
//       odometerReading,
//       assignTechnician,
//       fuelPercent,
//       customerVoice,
//       isPaid,
//       isWarranty,
//       isInsurance,
//       isEmission,
//     };

//     // Show the alert with the collected data
//     alert(`Job Sheet Submitted:\n
//       Order ID: ${formData.orderId}\n
//       Job Sheet ID: ${formData.jobSheetId}\n
//       Odometer Reading: ${formData.odometerReading}\n
//       Technician Assigned: ${formData.assignTechnician}\n
//       Fuel Percentage: ${formData.fuelPercent}%\n
//       Customer Voice: ${formData.customerVoice}\n
//       Service Type: ${
//         formData.isPaid ? "Paid" : formData.isWarranty ? "Warranty" : "None"
//       }\n
//       Addons: ${formData.isInsurance ? "Insurance " : ""}${
//       formData.isEmission ? "Emission" : ""
//     }`);

//     // Logging the form data to the console
//     console.log(formData);
//   };

//   return (
//     <div>
//       <div className="flex space-x-8">
//         {/* <div className="w-1/2 mt-4">
//           <InputField
//             id="orderid"
//             label="Order ID"
//             value={orderId}
//             type="text"
//             disabled
//           />
//         </div> */}
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
//       <form onSubmit={handleSubmit}>
//         <div className="flex mt-5 space-x-4">
//           {/* Radio Buttons for Paid/Warranty */}
//           <div className="w-1/2 mt-4">
//             <label
//               htmlFor="fuelPercent"
//               className="block text-sm mb-4 font-medium text-gray-700"
//             >
//               Service Type
//             </label>
//             <div className="flex mb-4 space-x-5">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="paid"
//                   name="status" // Group name ensures only one option can be selected
//                   checked={isPaid}
//                   onChange={() => setIsPaid(true)} // Set 'isPaid' to true, and 'isWarranty' to false
//                   className="h-4 w-4 text-green-500 focus:ring-green-400"
//                 />
//                 <label htmlFor="paid" className="ml-2 text-sm text-gray-700">
//                   Paid
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="warranty"
//                   name="status" // Same group name ensures only one option can be selected
//                   checked={isWarranty}
//                   onChange={() => setIsWarranty(true)} // Set 'isWarranty' to true, and 'isPaid' to false
//                   className="h-4 w-4 text-blue-500 focus:ring-blue-400"
//                 />
//                 <label
//                   htmlFor="warranty"
//                   className="ml-2 text-sm text-gray-700"
//                 >
//                   Warranty
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Odometer Reading */}
//           <div className="w-1/2">
//             <InputField
//               id="odometerReading"
//               label="Odometer Reading"
//               value={odometerReading}
//               onChange={handleOdometerChange}
//               type="number"
//               placeholder="Enter Odometer Reading"
//               required={true}
//             />
//           </div>
//         </div>

//         <div className="flex space-x-8">
//           {/* Assign Technician Dropdown */}
//           <div className="w-1/2 mt-4">
//             <label
//               htmlFor="assignTechnician"
//               className="block text-sm  mb-4 font-medium text-gray-700"
//             >
//               Assign Technician
//             </label>
//             <Dropdown
//               value={assignTechnician}
//               onChange={handleTechnicianChange} // Pass the technician handler
//               options={technician} // Use technician data for dropdown options
//             />
//           </div>
//           {/* Fuel Percentage Slider */}
//           <div className="w-1/2 mt-4">
//             <label
//               htmlFor="fuelPercent"
//               className="block text-sm  mb-4  font-medium text-gray-700"
//             >
//               Fuel Percentage
//             </label>
//             <Slider value={fuelPercent} onChange={handleFuelChange} />
//           </div>
//         </div>

//         {/* Customer Voice */}
//         <div className="mt-5">
//           <label
//             htmlFor="customerVoice"
//             className="block text-sm  mb-4  font-medium text-gray-700"
//           >
//             Customer Voice
//           </label>
//           <TextArea
//             value={customerVoice}
//             onChange={handleCustomerVoiceChange}
//             placeholder="Enter customer's feedback"
//           />
//         </div>

//         <div className="mt-5">
//           <label
//             htmlFor="assignTechnician"
//             className="block text-sm  mb-4 font-medium text-gray-700"
//           >
//             Addons
//           </label>

//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="insurance"
//               checked={isInsurance} // State for Insurance
//               onChange={() => setIsInsurance(!isInsurance)} // Toggle the state when clicked
//               className="h-4 w-4 text-green-500 focus:ring-green-400"
//             />
//             <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
//               Insurance
//             </label>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="emission"
//               checked={isEmission} // State for Emission
//               onChange={() => setIsEmission(!isEmission)} // Toggle the state when clicked
//               className="h-4 w-4 text-blue-500 focus:ring-blue-400"
//             />
//             <label htmlFor="emission" className="ml-2 text-sm text-gray-700">
//               Emission
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <Button type="submit" color="green">
//             Submit Job Sheet
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Jobsheet;

import React, { useState } from "react";
import InputField from "./../../../InputField/InputField"; // Assuming it's in the same directory
import Dropdown from "./../../../Dropdown/Dropdown"; // Assuming it's in the same directory
import Button from "./../../../Button/Button"; // Assuming it's in the same directory
import Slider from "./../../../Slider/Slider"; // The Slider component we created earlier
import TextArea from "./../../../TextArea/TextArea"; // The TextArea component we created earlier
import { technician } from "./../../../Dropdown/data"; // Assuming 'technician' data is imported

const Jobsheet = ({ id, orderId }) => {
  const [odometerReading, setOdometerReading] = useState("");
  const [assignTechnician, setAssignTechnician] = useState(""); // Technician will be stored here
  const [fuelPercent, setFuelPercent] = useState(0);
  const [customerVoice, setCustomerVoice] = useState("");
  const [isPaid, setIsPaid] = useState(true); // Default 'Paid' selected
  const [isWarranty, setIsWarranty] = useState(false);
  const [isInsurance, setIsInsurance] = useState(false);
  const [isEmission, setIsEmission] = useState(false);
  const [oilBrand, SetOilBrand] = useState("");
  const [oilEnabled, setOilEnabled] = useState(false); // Track if GST checkbox is enabled
  const [showButtons, SetShowButton] = useState(false);
  const engineoil = ["Motul", "Shell", "Waxpol"];
  const [number, setNumber] = useState("9876543210"); // Example phone number

  // Handlers for form inputs
  const handleOdometerChange = (e) => setOdometerReading(e.target.value);
  const handleTechnicianChange = (value) => setAssignTechnician(value); // Update technician state
  const handleFuelChange = (e) => setFuelPercent(e.target.value);
  const handleCustomerVoiceChange = (e) => setCustomerVoice(e.target.value);
  const handleOilChange = (e) => SetOilBrand(e.target.value);

  // Submit handler to collect and display form data
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      orderId,
      jobSheetId: id,
      odometerReading,
      assignTechnician,
      fuelPercent,
      customerVoice,
      isPaid,
      oilEnabled,
      oilBrand,
      isWarranty,
      isInsurance,
      isEmission,
    };

    // Show the alert with the collected data
    alert(`Job Sheet Submitted:\n
      Order ID: ${formData.orderId}\n
      Job Sheet ID: ${formData.jobSheetId}\n
      Odometer Reading: ${formData.odometerReading}\n
      Technician Assigned: ${formData.assignTechnician}\n
      Fuel Percentage: ${formData.fuelPercent}%\n
      Customer Voice: ${formData.customerVoice}\n
      Service Type: ${
        formData.isPaid ? "Paid" : formData.isWarranty ? "Warranty" : "None"
      }\n
      Addons: ${formData.isInsurance ? "Insurance " : ""}${
      formData.isEmission ? "Emission" : ""
    }`);

    // Logging the form data to the console
    console.log(formData);
  };

  const handlerdownloadjobsheet = (e) => {
    SetShowButton(true);
  };

  return (
    <div>
      <div className="flex space-x-8">
        <div className="w-1/2 mt-4">
          <InputField
            id="orderid"
            label="Order ID"
            value={orderId}
            type="text"
            disabled
          />
        </div>
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
      <form onSubmit={handleSubmit}>
        <div className="flex mt-5 space-x-4">
          {/* Radio Buttons for Paid/Warranty */}
          <div className="w-1/2 mt-4">
            <label
              htmlFor="fuelPercent"
              className="block text-sm mb-4 font-medium text-gray-700"
            >
              Service Type
            </label>
            <div className="flex mb-4 space-x-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paid"
                  name="status" // Group name ensures only one option can be selected
                  checked={isPaid}
                  onChange={() => {
                    setIsPaid(true);
                    setIsWarranty(false); // Ensure the other is deselected
                  }}
                  className="h-4 w-4 text-green-500 focus:ring-green-400"
                />
                <label htmlFor="paid" className="ml-2 text-sm text-gray-700">
                  Paid
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="warranty"
                  name="status" // Same group name ensures only one option can be selected
                  checked={isWarranty}
                  onChange={() => {
                    setIsWarranty(true);
                    setIsPaid(false); // Ensure the other is deselected
                  }}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                />
                <label
                  htmlFor="warranty"
                  className="ml-2 text-sm text-gray-700"
                >
                  Warranty
                </label>
              </div>
            </div>
          </div>

          {/* Odometer Reading */}
          <div className="w-1/2">
            <InputField
              id="odometerReading"
              label="Odometer Reading"
              value={odometerReading}
              onChange={handleOdometerChange}
              type="number"
              placeholder="Enter Odometer Reading"
              required={true}
            />
          </div>
        </div>

        <div className="flex space-x-8">
          {/* Assign Technician Dropdown */}
          <div className="w-1/2 mt-4">
            <label
              htmlFor="assignTechnician"
              className="block text-sm  mb-4 font-medium text-gray-700"
            >
              Assign Technician
            </label>
            <Dropdown
              value={assignTechnician}
              onChange={handleTechnicianChange} // Pass the technician handler
              options={technician} // Use technician data for dropdown options
            />
          </div>
          {/* Fuel Percentage Slider */}
          <div className="w-1/2 mt-4">
            <label
              htmlFor="fuelPercent"
              className="block text-sm  mb-4  font-medium text-gray-700"
            >
              Fuel Percentage
            </label>
            <Slider value={fuelPercent} onChange={handleFuelChange} />
          </div>
        </div>

        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={oilEnabled}
              onChange={() => setOilEnabled(!oilEnabled)}
              id="enableGst"
              className="mr-2"
            />
            <label htmlFor="enableGst">Need Engine Oil</label>
          </div>
          {oilEnabled && (
            <div>
              <select
                id="oilBrand"
                name="oilBrand"
                value={oilBrand}
                onChange={handleOilChange}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Oil Brand
                </option>
                {engineoil.map((oil, index) => (
                  <option key={index} value={oil}>
                    {oil}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Customer Voice */}
        <div className="mt-5">
          <label
            htmlFor="customerVoice"
            className="block text-sm  mb-4  font-medium text-gray-700"
          >
            Customer Voice
          </label>
          <TextArea
            value={customerVoice}
            onChange={handleCustomerVoiceChange}
            placeholder="Enter customer's feedback"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="assignTechnician"
            className="block text-sm  mb-4 font-medium text-gray-700"
          >
            Addons
          </label>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="insurance"
              checked={isInsurance} // State for Insurance
              onChange={() => setIsInsurance(!isInsurance)} // Toggle the state when clicked
              className="h-4 w-4 text-green-500 focus:ring-green-400"
            />
            <label htmlFor="insurance" className="ml-2 text-sm text-gray-700">
              Insurance
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emission"
              checked={isEmission} // State for Emission
              onChange={() => setIsEmission(!isEmission)} // Toggle the state when clicked
              className="h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label htmlFor="emission" className="ml-2 text-sm text-gray-700">
              Emission
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button type="submit" color="green" onClick={handlerdownloadjobsheet}>
            Submit Job Sheet
          </Button>
          {/* Download & Share Buttons */}
          {showButtons && (
            <div className="mt-6 flex space-x-4">
              <Button
                color="blue"
                variant="outlined"
                href={`/jobsheet/${orderId}`} // Use orderId directly from props
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </Button>

              <Button
                color="yellow"
                variant="outlined"
                onClick={() => {
                  const shareText = `Hi Anush G,Thanks for choosing Spannerdoor!  Your Vehicle Reg No KA20EC1108 Jobsheet has been updated. Please download it from the link below: http://localhost:3001/jobsheet/BK001  Feel free to call us if you have any queries. Thank you!`;
                  const shareUrl = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(
                    shareText
                  )}`;
                  window.open(shareUrl, "_blank");
                }}
              >
                Share
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Jobsheet;
