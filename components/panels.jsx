"use client";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DescriptionDetails, DescriptionTerm } from "./description-list";

const steps = [
  { id: "01", name: "Jobcard", description: "Details about the Jobcard" },
  { id: "02", name: "Quote", description: "Information regarding the Quote" },
  { id: "03", name: "Invoice", description: "Invoice details and summary" },
  {
    id: "04",
    name: "Next Service",
    description: "Details for the Next Service",
  },
  { id: "05", name: "Payment", description: "Process your payment here" },
];

export default function Panels() {
  const [currentStep, setCurrentStep] = useState(0); // Track current step

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <DescriptionTerm>Jobcard Details</DescriptionTerm>
            <DescriptionDetails>
              {/* Jobcard specific inputs */}
              <input
                type="text"
                placeholder="Enter job ID"
                value={"SDPRJB897790"}
                disabled
                className="mt-2 rounded border p-2"
              />
            </DescriptionDetails>

            {/* Paid and Under Warranty Checkbox */}
            <DescriptionDetails>
              <div className="flex justify-between items-center">
                {/* Service Type (Paid, Under Warranty) */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      defaultChecked
                      name="servicetype"
                      className="form-checkbox"
                    />
                    Paid
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="servicetype"
                      className="form-checkbox"
                    />
                    Under Warranty
                  </label>
                </div>

                {/* Emission and Insurance Checkboxes */}
                <div className="flex gap-4">
                  {/* Emission */}
                  <label className="font-medium">Emission</label>
                  <input type="checkbox" className="form-checkbox" />
                  {/* Insurance */}
                  <label className="font-medium">Insurance</label>
                  <input type="checkbox" className="form-checkbox" />
                </div>
              </div>
            </DescriptionDetails>

            {/* Odometer Reading (Only Numbers) */}
            <DescriptionDetails>
              <div className="flex justify-between items-center">
                <div>
                  <label className="font-medium">Odometer Reading</label>
                </div>
                <div className="w-[80%]">
                  <input
                    type="number"
                    placeholder="Enter odometer reading"
                    className="mt-3 rounded border p-2 w-full"
                    min="0"
                  />
                </div>
              </div>
            </DescriptionDetails>

            {/* Fuel Slider (Empty, 1/4, 1/2, 3/4, Full) */}
            <DescriptionDetails>
              <label className="font-medium">Fuel Level</label>
              <div className="flex flex-col items-center">
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="1"
                  defaultValue="0"
                  className="mt-2 w-full"
                  list="fuel-level"
                />
                <datalist id="fuel-level">
                  <option value="0" label="Empty" />
                  <option value="1" label="1/4" />
                  <option value="2" label="1/2" />
                  <option value="3" label="3/4" />
                  <option value="4" label="Full" />
                </datalist>

                <div className="flex justify-between w-full mt-2">
                  <span>Empty</span>
                  <span>1/4</span>
                  <span>1/2</span>
                  <span>3/4</span>
                  <span>Full</span>
                </div>
              </div>
            </DescriptionDetails>

            {/* Customer Voice Text Area */}
            <DescriptionDetails>
              <label className="font-medium">Customer Voice</label>
              <textarea
                placeholder="Enter customer feedback"
                className="mt-2 w-full rounded border p-2"
                rows="4"
              />
            </DescriptionDetails>
            <DescriptionDetails>
              <button>Save & Download</button>
            </DescriptionDetails>
          </>
        );
      case 1:
        return (
          <>
            <DescriptionTerm>Quote Information</DescriptionTerm>
            <DescriptionDetails>
              {/* Quote specific inputs */}
              <input
                type="number"
                placeholder="Enter quote amount"
                className="mt-2 rounded border p-2"
              />
            </DescriptionDetails>
          </>
        );
      case 2:
        return (
          <>
            <DescriptionTerm>Invoice Summary</DescriptionTerm>
            <DescriptionDetails>
              {/* Invoice specific inputs */}
              <textarea
                placeholder="Enter invoice details"
                className="mt-2 rounded border p-2"
              />
            </DescriptionDetails>
          </>
        );
      case 3:
        return (
          <>
            <DescriptionTerm>Next Service Details</DescriptionTerm>
            <DescriptionDetails>
              {/* Next service specific inputs */}
              <input type="date" className="mt-2 rounded border p-2" />
            </DescriptionDetails>
          </>
        );
      case 4:
        return (
          <>
            <DescriptionTerm>Payment Information</DescriptionTerm>
            <DescriptionDetails>
              {/* Payment specific inputs */}
              <input
                type="text"
                placeholder="Enter payment method"
                className="mt-2 rounded border p-2"
              />
            </DescriptionDetails>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {/* Stepper Navigation */}
      <nav aria-label="Progress">
        <ol
          role="list"
          className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              <a
                href="#"
                className={`group flex w-full items-center ${
                  index > currentStep ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentStep(index);
                }}
              >
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                      index < currentStep
                        ? "bg-blue-600"
                        : index === currentStep
                        ? "border-2 border-blue-600"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    ) : (
                      <span
                        className={`${
                          index === currentStep
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.id}
                      </span>
                    )}
                  </span>
                  <span
                    className={`ml-4 text-sm font-medium ${
                      index <= currentStep ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </span>
              </a>
              {index !== steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="h-full w-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Tab Content */}
      <div className="mt-6 rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold">{steps[currentStep].name}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {steps[currentStep].description}
        </p>
        {renderStepContent()}

        {/* Next Button or Complete Message */}
        {currentStep < steps.length - 1 ? (
          <button
            className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleNextClick}
          >
            Next
          </button>
        ) : (
          <button
            className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={handleNextClick}
          >
            Service Complete
          </button>
        )}
      </div>
    </div>
  );
}
