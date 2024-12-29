import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderTracker from "@/components/OrderTracker/OrderTracker";
import Orderinfodisplay from "@/components/Orderinfodisplay/Orderinfodisplay";
import Button from "@/components/Button/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import Modal from "@/components/Modal/Modal"; // Assuming Modal is in the components folder
import ReschedulePage from "./ReschedulePage"; // Import the ReschedulePage
import Upload from "@/components/Upload/Upload";

const RsaDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Extract 'id' from the URL
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptOrder = () => {
    alert("Order Accepted"); // Show the alert
    setIsOrderAccepted(true); // Set the order as accepted
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between flex-row mb-5">
        <div className="flex space-x-3">
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
            onClick={handleAcceptOrder}
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

      <Orderinfodisplay />
      {isOrderAccepted && (
        <div className="mt-5 mb-5">
          <OrderTracker orderId={id} />
        </div>
      )}

      <div>
        <hr />
        <h2 className="p-5 font-bold">
          Images regarding this service (Optional)
        </h2>
        <Upload
          uploadCount={5}
          uploadType="service"
          includeType="all"
          // includeType="png,jpg"
          excludeType="pdf"
          onChange={(uploads) => console.log(uploads)}
          errorMessage="Custom error message"
        />
      </div>
    </>
  );
};

export default RsaDetails;
