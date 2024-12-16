// /components/Stats/data.js

export const sampleStats = [
  {
    name: "Total Revenue",
    stat: "$120,000",
    previousStat: "$100,000",
    change: "$20,000",
    changeType: "increase",
  },
  {
    name: "Total Orders",
    stat: "1,500",
    previousStat: "1,200",
    change: "300",
    changeType: "increase",
  },
  {
    name: "New Customers",
    stat: "250",
    previousStat: "200",
    change: "50",
    changeType: "increase",
  },
  {
    name: "Total Expenses",
    stat: "$45,000",
    previousStat: "$40,000",
    change: "$5,000",
    changeType: "increase",
  },
];

export const miniStats = [
  {
    name: "Total Revenue",
    stat: "$120,000",
  },
  {
    name: "Total Orders",
    stat: "1,500",
  },
  {
    name: "New Customers",
    stat: "250",
  },
  {
    name: "Total Expenses",
    stat: "$45,000",
  },
];

// Export them together as an object
export const statsData = {
  sampleStats,
  miniStats,
};
