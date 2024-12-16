// List of coupons with conditions and their discount percentages
const couponsList = [
  {
    code: "SPDR34GT",
    discount: 10, // 10% Discount
    conditions: {
      amountRange: [2000, 3000], // Amount must be between 2000 and 3000
      serviceTypes: ["RSA", "Service"], // Service types allowed
    },
    validtill: "12/12/2024",
  },
  {
    code: "SUMMER20",
    discount: 20, // 20% Discount
    conditions: {
      amountRange: [1000, 5000], // Amount must be between 1000 and 5000
      serviceTypes: ["RSA", "Service", "Repair"], // Allowed service types
    },
    validtill: "",
  },
];

export default couponsList;
