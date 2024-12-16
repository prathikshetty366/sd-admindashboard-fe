import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderTracker from "@/components/OrderTracker/OrderTracker";
import DataDisplay from "@/components/DataDisplay/DataDisplay";
import Button from "@/components/Button/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import Modal from "@/components/Modal/Modal"; // Assuming Modal is in the components folder
import ReschedulePage from "./ReschedulePage"; // Import the ReschedulePage

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract 'id' from the URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   // Fetch order details when the id is available
  //   useEffect(() => {
  //     if (!id) return; // Wait for the 'id' to be available

  //     // const fetchOrderDetails = async () => {
  //     //   try {
  //     //     setLoading(true);
  //     //     setError(null);

  //     //     // Replace with your actual API endpoint
  //     //     const response = await fetch(`/api/orders/${id}`);

  //     //     if (!response.ok) {
  //     //       throw new Error("Failed to fetch order details");
  //     //     }

  //     //     const data = await response.json();
  //     //     setOrderDetails(data);
  //     //   } catch (err) {
  //     //     setError(err.message);
  //     //   } finally {
  //     //     setLoading(false);
  //     //   }
  //     // };

  //     // fetchOrderDetails();
  //   }, [id]);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>Error: {error}</div>;
  //   }

  //   if (!orderDetails) {
  //     return <div>No order details found.</div>;
  //   }x

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between flex-row mb-5">
        <div className="flex space-x-4">
          <div>
            <h2 className="font-bold text-[24px]">Order ID : 678678</h2>
          </div>
          <div>
            <Button
              color="red"
              variant="outline"
              onClick={() => console.log("Cancelled")}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="flex space-x-3">
          {/* Reschedule button */}
          <Button color="blue" variant="outline" onClick={openModal}>
            Reschedule
          </Button>
          {/* Accept Order button with icon */}
          <Button
            color="green"
            variant="filled"
            icon={ArrowRightIcon}
            iconPosition="right"
            onClick={() => console.log("Order Accepted")}
          >
            Accept Order
          </Button>
        </div>
      </div>

      {/* Modal with ReschedulePage */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Reschedule Appointment"
      >
        <ReschedulePage onClose={closeModal} />
      </Modal>

      <DataDisplay />
      <div className="mt-5 mb-5">
        <OrderTracker orderId={id} />
      </div>
    </>
  );
};

export default OrderDetails;
