// /dataQuery.js
const orderData = require("./data").default; // Import the mock data

// Function to get order details by orderId
export const getOrderDetailsByOrderId = (orderId) => {
  const order = orderData.find((data) => data.orderId === orderId); // Find the order by orderId

  if (order) {
    return {
      jobId: order.jobId,
      quoteId: order.quoteId,
      nextServiceId: order.nextServiceId,
      invoiceId: order.invoiceId,
      paymentId: order.paymentId,
    };
  } else {
    return null; // If orderId doesn't exist, return null
  }
};
