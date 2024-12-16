import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField/InputField"; // Assuming the InputField component is properly imported
import Button from "@/components/Button/Button"; // Assuming the Button component is imported correctly
import "react-datepicker/dist/react-datepicker.css";
import Coupons from "@/components/Coupons/Coupons";

export default function Payment({ id, orderId }) {
  const [payamount, setPayAmount] = useState(2200); // Store payamount as numeric for calculations
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState({
    upi: { selected: true, details: 2200 },
    cash: { selected: false, details: "" },
    creditCard: { selected: false, details: "" },
    debitCard: { selected: false, details: "" },
    netbanking: { selected: false, details: "" },
  });
  const [url, setUrl] = useState("https://phonepe.com");
  const [paymentChecked, setPaymentChecked] = useState(true); // Default to true
  const [currentTime, setCurrentTime] = useState("");
  const [reason, setReason] = useState(""); // Reason for collecting more payment
  //   const [isReasonVisible, setIsReasonVisible] = useState(false); // Flag to control reason textarea visibility

  // Set current time when the component mounts
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleString()); // Format as per locale
  }, []);

  // Handle payment method checkbox changes
  const handlePaymentMethodChange = (e) => {
    const { name, checked } = e.target;
    setSelectedPaymentMethods((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], selected: checked },
    }));
  };

  // Handle payment method input change
  const handlePaymentMethodInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPaymentMethods((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], details: value },
    }));
  };

  // Handle payamount change
  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    if (!isNaN(newAmount) && newAmount >= 0) {
      setPayAmount(newAmount);
    }
  };

  // Handle the payment checkbox
  const handlePaymentCheckboxChange = () => {
    setPaymentChecked((prev) => !prev);
  };

  // Handle URL share action
  const handleShareUrl = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    } else {
      alert("Please enter a valid URL.");
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Ensure the user has agreed before submitting
    if (!paymentChecked) {
      alert("Please check the 'I agree to make a payment' checkbox.");
      return;
    }

    // Calculate the breakdown of payment methods
    const breakdown = getPaymentBreakdown();

    // Calculate the total payamount
    const totalAmount = breakdown.reduce(
      (acc, { payamount }) => acc + payamount,
      0
    );

    // Check if the payamount entered is greater than the sum of selected payment methods
    const isAmountGreaterOrLess = totalAmount !== payamount;

    if (isAmountGreaterOrLess && !reason) {
      alert("Please provide a reason for the discrepancy in the payamount.");
      return;
    }

    // Log the breakdown and total to the console
    console.log("Payment Breakdown:", breakdown);
    console.log("Total Amount:", totalAmount);

    // Show the breakdown in the alert
    let breakdownMessage = "Payment Breakdown:\n";
    breakdown.forEach(({ method, payamount }) => {
      breakdownMessage += `${
        method.charAt(0).toUpperCase() + method.slice(1)
      }: ${payamount}\n`;
    });
    breakdownMessage += `\nTotal Amount: ${totalAmount}\nPayment Received At: ${currentTime}`;

    alert(breakdownMessage);

    // Submit the form data
    const formData = {
      paymentID: id,
      orderID: orderId,
      payamount,
      paymentReceivedAt: currentTime,
      url,
      paymentMethods: breakdown,
      reason: isAmountGreaterOrLess ? reason : "",
    };

    console.log("Form Data to Submit:", formData);
    alert(`Payment Received Successfully!\nTotal Amount: ${totalAmount}`);
  };

  // Get the breakdown of selected payment methods
  const getPaymentBreakdown = () => {
    return Object.keys(selectedPaymentMethods)
      .filter((key) => selectedPaymentMethods[key].selected)
      .map((key) => ({
        method: key,
        payamount: parseFloat(selectedPaymentMethods[key].details) || 0,
      }));
  };

  // Check if at least one payment method is selected
  const isPaymentMethodSelected = Object.values(selectedPaymentMethods).some(
    (method) => method.selected
  );

  // Handle reason change
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // Get total payment payamount
  const getTotalPaymentAmount = () => {
    return getPaymentBreakdown().reduce(
      (acc, { payamount }) => acc + payamount,
      0
    );
  };

  // Show reason textarea if total payamount entered is either greater or less than the sum of selected payment methods
  const showReasonTextarea = getTotalPaymentAmount() !== payamount;

  return (
    <div>
      <div className="flex space-x-8">
        {/* Payment ID Section */}
        <div className="w-1/2 mt-4">
          <InputField
            id="paymentid"
            label="Payment ID"
            value={id}
            type="text"
            disabled
          />
        </div>

        {/* Order ID Section */}
        <div className="w-1/2 mt-4">
          <InputField
            id="orderId"
            label="Order ID"
            value={orderId}
            type="text"
            disabled
          />
        </div>
      </div>

      <Coupons amount={payamount} />

      {/* Amount Input */}
      {/* <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="number"
          value={payamount}
          onChange={handleAmountChange}
          placeholder="Enter payamount"
          className="border p-2 w-full rounded-md"
        />
      </div> */}

      {/* URL Input and Share Button */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Share URL</label>
        <div className="flex items-center">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to share"
            className="border p-2 w-full rounded-md"
          />
          <Button
            onClick={handleShareUrl}
            color="blue"
            variant="filled"
            className="ml-2"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Payment Methods (Checkboxes) */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">
          Payment Methods
        </label>
        <div className="space-y-2">
          {Object.keys(selectedPaymentMethods).map((method) => (
            <div key={method} className="flex items-center">
              <input
                type="checkbox"
                name={method}
                checked={selectedPaymentMethods[method].selected}
                onChange={handlePaymentMethodChange}
                id={method}
                className="mr-2"
              />
              <label htmlFor={method}>
                {method.charAt(0).toUpperCase() + method.slice(1)}
              </label>
              {selectedPaymentMethods[method].selected && (
                <input
                  type="text"
                  name={method}
                  value={selectedPaymentMethods[method].details}
                  onChange={handlePaymentMethodInputChange}
                  placeholder={`Enter ${
                    method.charAt(0).toUpperCase() + method.slice(1)
                  } Details`}
                  className="border p-2 w-full ml-2 rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Date and Time */}
      <div className="mt-4">
        <InputField
          id="currentTime"
          label="Payment Received At"
          value={currentTime}
          type="text"
          disabled
        />
      </div>

      {/* Payment Agreement Checkbox */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={paymentChecked}
          onChange={handlePaymentCheckboxChange}
          className="mr-2"
        />
        <label className="text-sm">I agree to make a payment</label>
      </div>

      {/* Reason for Collecting More Amount */}
      {showReasonTextarea && (
        <div className="mt-4">
          <label className="block text-red-500 mb-2">
            Reason to collect more or less payamount than the service
          </label>
          <textarea
            value={reason}
            onChange={handleReasonChange}
            placeholder="Please provide a reason"
            className="border p-2 w-full rounded-md"
          />
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-4">
        <Button
          color="green"
          variant="filled"
          width="full"
          disabled={
            !paymentChecked || // Ensure the checkbox is checked
            !payamount || // Ensure payamount is entered
            !isPaymentMethodSelected || // Ensure at least one payment method is selected
            !url || // Ensure URL is entered
            (showReasonTextarea && !reason) // Ensure reason is provided if the payamount is more or less
          }
          onClick={handleSubmit}
        >
          Payment Received
        </Button>
      </div>
    </div>
  );
}
