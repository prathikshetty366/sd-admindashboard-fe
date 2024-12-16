import React, { useState, useEffect } from "react";
import InputField from "@/components/InputField/InputField";
import couponsList from "./data";

export default function CouponsItem({ amount, onApplyDiscount }) {
  const [coupon, setCoupon] = useState("");
  const [serviceType, setServiceType] = useState("RSA");
  const [payableAmount, setPayableAmount] = useState(amount);
  const [error, setError] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState(""); // To hold coupon status like "valid", "expired", or "always valid"

  // Handle input change for coupon and service type
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "coupon") {
      setCoupon(value);
    } else if (name === "serviceType") {
      setServiceType(value);
    }
  };

  // Check if the coupon is valid based on amount and service type
  const applyCoupon = () => {
    const validCoupon = couponsList.find(
      (c) =>
        c.code === coupon &&
        amount >= c.conditions.amountRange[0] &&
        amount <= c.conditions.amountRange[1] &&
        c.conditions.serviceTypes.includes(serviceType)
    );

    if (validCoupon) {
      // Check if coupon is expired
      const currentDate = new Date();
      const validTillDate = validCoupon.validtill
        ? new Date(validCoupon.validtill)
        : null;

      if (validTillDate && currentDate > validTillDate) {
        setIsCouponValid(false);
        setCouponStatus("Coupon Expired");
        setError("This coupon has expired.");
        setPayableAmount(amount);
      } else {
        // Coupon is valid
        setIsCouponValid(true);
        setDiscount(validCoupon.discount);
        setCouponStatus(
          validCoupon.validtill === "" ? "Always Valid" : "Valid"
        );
        const newPayableAmount = amount - (amount * validCoupon.discount) / 100;
        setPayableAmount(newPayableAmount);
        onApplyDiscount(newPayableAmount); // Pass back the calculated amount to parent
        setError(""); // Clear previous errors
      }
    } else {
      setIsCouponValid(false);
      setCouponStatus(""); // Reset coupon status
      setError(
        `This coupon is only applicable for service types: ${serviceType} and amount range: ₹${amount} is not within the valid range.`
      );
      setPayableAmount(amount); // Reset to original amount if invalid coupon
    }
  };

  useEffect(() => {
    // Update the payable amount if there's no valid coupon
    setPayableAmount(amount);
  }, [amount]);

  return (
    <>
      <div className="flex space-x-8 mt-4">
        <div className="w-1/2 mt-4">
          {/* Amount */}
          <InputField
            id="amount"
            label="Amount"
            value={amount}
            type="number"
            disabled
          />
        </div>

        <div className="w-1/2 mt-4">
          <div>
            {/* Service Type */}
            <label
              htmlFor="serviceType"
              className="block text-sm mb-4 font-medium"
            >
              Service Type
            </label>
            <select
              id="serviceType"
              name="serviceType"
              value={serviceType}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-md"
            >
              <option value="RSA">RSA</option>
              <option value="Service">Service</option>
              <option value="Repair">Repair</option>
            </select>
          </div>
          <div className="mt-5">
            {/* Coupon Code */}
            <InputField
              id="coupon"
              label="Coupon Code"
              value={coupon}
              type="text"
              onChange={handleInputChange}
              name="coupon"
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Apply Coupon
            </button>

            {error && <div className="text-red-500 mt-2">{error}</div>}

            {isCouponValid && !error && couponStatus && (
              <div className="text-green-500 mt-2">
                Coupon Applied Successfully! ({couponStatus})
              </div>
            )}
            {couponStatus === "Coupon Expired" && (
              <div className="text-red-500 mt-2">Coupon has expired.</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-8 mt-4">
        <div className="w-1/2 mt-4">
          {/* Payable Amount */}
          <InputField
            id="payableAmount"
            label="Payable Amount"
            value={payableAmount}
            type="number"
            disabled
          />
        </div>
      </div>
    </>
  );
}
