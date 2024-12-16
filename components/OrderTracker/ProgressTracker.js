import { useState } from "react";

// ProgressTracker component now receives `steps` as a prop
export default function ProgressTracker({ steps, data, orderId }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]); // Track completed steps
  const [draftSteps, setDraftSteps] = useState([]); // Track draft steps

  // Handle "Save & Next" button click
  const handleSaveAndNext = () => {
    if (!completedSteps.includes(currentStepIndex)) {
      setCompletedSteps((prev) => [...prev, currentStepIndex]); // Mark current step as completed
    }
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prevIndex) => prevIndex + 1); // Move to next step
    }
  };

  // Handle "Draft" button click
  const handleDraft = () => {
    if (completedSteps.includes(currentStepIndex)) {
      // If step is completed, allow switching back to draft
      setCompletedSteps((prev) =>
        prev.filter((step) => step !== currentStepIndex)
      ); // Remove from completed
      setDraftSteps((prev) => [...prev, currentStepIndex]); // Mark as draft
    } else if (draftSteps.includes(currentStepIndex)) {
      // If step is in draft, allow marking it as normal (not draft)
      setDraftSteps((prev) => prev.filter((step) => step !== currentStepIndex)); // Remove from draft
    } else {
      // If step is neither completed nor in draft, mark it as draft
      setDraftSteps((prev) => [...prev, currentStepIndex]);
    }
  };

  // Handle "Complete Service" button click
  const handleCompleteService = () => {
    setCompletedSteps((prev) => [...prev, currentStepIndex]); // Mark last step as completed
    alert("Service Completed!");
  };

  // Handle step click
  const handleStepClick = (stepIndex) => {
    setCurrentStepIndex(stepIndex);
  };

  // Check if all steps except the last one are completed
  const isServiceCompleteEnabled =
    completedSteps.length === steps.length - 1 || draftSteps.length > 0;

  // Check if a step is completed
  const isStepCompleted = (index) => completedSteps.includes(index);

  // Check if a step is in draft
  const isStepInDraft = (index) => draftSteps.includes(index);

  // Determine the button state for "Save & Next" or "Complete Service"
  const getStepButtonState = () => {
    if (currentStepIndex === steps.length - 1) {
      return {
        isCompleteServiceDisabled: !isServiceCompleteEnabled,
        buttonText: "Complete Service",
        buttonAction: handleCompleteService,
        buttonColor: !isServiceCompleteEnabled
          ? "opacity-50 cursor-not-allowed"
          : "bg-green-600 text-white",
      };
    }
    return {
      isCompleteServiceDisabled: false,
      buttonText: "Save & Next",
      buttonAction: handleSaveAndNext,
      buttonColor: "bg-blue-600 text-white",
    };
  };

  return (
    <div className="mt-5">
      {/* Progress Bar */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.id} className="md:flex-1">
              <a
                href={step.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleStepClick(index); // Set current step when clicked
                }}
                className={`flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                  isStepCompleted(index)
                    ? "border-green-600 text-green-600"
                    : isStepInDraft(index)
                    ? "border-yellow-500 text-yellow-500"
                    : index === currentStepIndex
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {/* Display the order status in place of step id */}
                <span className="text-sm font-medium">{step.orderstatus}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Render the content of the current step dynamically */}
      <div className="mt-8">
        {steps[currentStepIndex].tabcontent(orderId, data)}
      </div>

      {/* Conditional Buttons */}
      <div className="mt-6 flex justify-between">
        {/* Always show "Draft" button, no matter the state */}
        <button
          onClick={handleDraft}
          className={`px-4 py-2 bg-yellow-500 text-white rounded-md`}
        >
          Draft
        </button>

        <button
          onClick={getStepButtonState().buttonAction}
          className={`px-4 py-2 rounded-md ${getStepButtonState().buttonColor}`}
          disabled={getStepButtonState().isCompleteServiceDisabled}
        >
          {getStepButtonState().buttonText}
        </button>
      </div>
    </div>
  );
}
