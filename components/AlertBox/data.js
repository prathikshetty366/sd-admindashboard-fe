// components/AlertBox/data.js
export const alertData = {
  isOpen: true,
  title: "Information Alert",
  message: "This is an informational alert message.",
  type: "info", // You can change this to "warning" or "success" to test different types
  actions: [
    {
      label: "Close",
      onClick: () => alert("Alert closed"),
      className: "bg-blue-500 text-white",
    },
    {
      label: "Learn More",
      onClick: () => alert("Redirecting to Learn More"),
      className: "bg-gray-500 text-white",
    },
  ],
};
