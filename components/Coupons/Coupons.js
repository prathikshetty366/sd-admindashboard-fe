// Coupons.js
import React, { useState } from "react";
import CouponsItem from "./CouponsItem";

export default function Coupons({ amount }) {
  const [payableAmount, setPayableAmount] = useState(amount);

  const handleApplyDiscount = (newPayableAmount) => {
    setPayableAmount(newPayableAmount);
  };

  return (
    <div className="p-6">
      <CouponsItem amount={amount} onApplyDiscount={handleApplyDiscount} />
    </div>
  );
}
