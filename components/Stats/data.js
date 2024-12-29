// /components/Stats/data.js

export const sampleStats = [
  {
    name: "Total Revenue",
    stat: "$120,000",
    previousStat: "$100,000",
    change: "$20,000",
    changeType: "increase",
    createdDate: "2024-12-25", // ISO date format
    path: "/Reports",
  },
  {
    name: "Total Orders",
    stat: "1,500",
    previousStat: "1,200",
    change: "300",
    changeType: "increase",
    createdDate: "2023-12-20",
    path: "/Orders",
  },
  {
    name: "New Customers",
    stat: "250",
    previousStat: "200",
    change: "50",
    changeType: "increase",
    createdDate: "2023-12-18",
    path: "/Customers",
  },
  {
    name: "Total Expenses",
    stat: "$45,000",
    previousStat: "$40,000",
    change: "$5,000",
    changeType: "increase",
    createdDate: "2023-12-10",
    path: "/Expenses",
  },
];

export const OverallStats = [
  {
    name: "Total Revenue",
    stat: "1",
    createdDate: "2023-12-20",
    path: "/reports",
  },
  {
    name: "Total Booking",
    stat: "12",
    createdDate: "2023-12-20",
    path: "/orders",
  },
  {
    name: "Total Vehicles",
    stat: "1",
    createdDate: "2023-12-20",
    path: "/vehicles",
  },
  {
    name: "Total RSA",
    stat: "1",
    createdDate: "2023-12-20",
    path: "/rsa",
  },
  {
    name: "New Customers",
    stat: "8",
    createdDate: "2023-12-20",
    path: "/customers",
  },
  {
    name: "Reiminders",
    stat: "4",
    createdDate: "2023-12-20",
    path: "/reminders",
  },
];

// Export them together as an object
export const statsData = {
  sampleStats,
  OverallStats,
};
