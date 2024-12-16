// /components/OrderTracker/OrderTracker.js
import React, { useState, useEffect } from "react";
import { getOrderDetailsByOrderId } from "./dataQuery"; // Import the query function
import { steps } from "./stepsData"; // Import static steps data

// Import the content components
import ProgressTracker from "./ProgressTracker"; // Import ProgressTracker

export default function OrderTracker({ orderId }) {
  const [orderDetails, setOrderDetails] = useState([]);

  // useEffect(() => {
  //   // Query order details based on orderId
  //   const details = getOrderDetailsByOrderId(orderId);
  //   setOrderDetails(details);
  // }, [orderId]);

  // if (!orderDetails) {
  //   return <div>Loading...</div>; // Show loading message until order details are fetched
  // }

  // Step content rendering based on current step
  return (
    <div>
      {/* Progress Tracker and Buttons */}
      <ProgressTracker steps={steps} data={orderDetails} orderId={orderId} />
    </div>
  );
}
