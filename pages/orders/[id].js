import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderTracker from "@/components/OrderTracker/OrderTracker";
import Orderinfodisplay from "@/components/Orderinfodisplay/Orderinfodisplay";
import Button from "@/components/Button/Button";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid"; // Importing back arrow icon
import Modal from "@/components/Modal/Modal";
import ReschedulePage from "./ReschedulePage";
import Upload from "@/components/Upload/Upload";
import {
  fetchServiceDetailsById,
  updateServiceStatus,
  cancelServiceBooking,
} from "@/app/services/service";
import { toast } from "react-toastify"; // Assuming toast is used for notifications

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [serviceInfo, setServiceInfo] = useState({});
  const [recentStatus, setRecentStatus] = useState({});
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);

  // Define the sequential status options
  const options = [
    { id: 1, name: "booked" },
    { id: 2, name: "accepted" },
    { id: 3, name: "picked" },
    { id: 4, name: "repairing" },
    { id: 5, name: "billing" },
    { id: 6, name: "readyToDeliver" },
    { id: 7, name: "delivered" },
  ];
  const cancellableStatuses = ["booked", "accepted", "picked"];

  useEffect(() => {
    if (id) {
      fetchServiceInfoById();
    } else {
      console.error("Service ID is undefined or missing.");
    }
  }, [id]);

  // Fetch service details and most recent status
  const fetchServiceInfoById = async () => {
    try {
      const response = await fetchServiceDetailsById(id);
      if (response.success) {
        setServiceInfo(response.data);
        const mostRecent = response.data.serviceHistory.reduce(
          (latest, current) =>
            new Date(latest.createdAt) > new Date(current.createdAt)
              ? latest
              : current
        );
        setRecentStatus(mostRecent);
        filterOptions(mostRecent.serviceStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Disable previous statuses and allow only the next
  const filterOptions = (currentStatus) => {
    const currentIndex = options.findIndex(
      (option) => option.name === currentStatus
    );
    if (currentIndex !== -1 && currentIndex < options.length - 1) {
      setFilteredOptions([options[currentIndex + 1]]);
    } else {
      setFilteredOptions([]); // No next step available if at the end
    }
  };

  // Handle status change and update the backend
  const handleStatusChange = async (status) => {
    if (!status) return;
    try {
      const response = await updateServiceStatus({ id, serviceStatus: status });
      if (response.success) {
        toast.success("Status updated successfully.");
        fetchServiceInfoById(); // Refresh data after successful update
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  // Handle Back Button Click - Redirect to /orders
  const handleBackClick = () => {
    router.push("/orders");
  };

  const handleCancelOrder = async () => {
    if (!cancellableStatuses.includes(recentStatus.serviceStatus)) {
      toast.warning("Order is not eligible for cancellation.");
      return;
    }
    if (!id) {
      toast.error("Invalid service ID.");
      return;
    }
    try {
      const response = await cancelServiceBooking(id);
      if (response.success) {
        toast.success("Order cancelled successfully.");
        fetchServiceInfoById(); // Refresh the order details after cancel
      } else {
        toast.error(response.message || "Failed to cancel the order.");
      }
    } catch (error) {
      toast.error("Error while canceling the order.");
      console.log("Error:", error);
    }
  };
  console.log(recentStatus.serviceStatus?.toUpperCase(), ">>>>>>>>>>>");

  return (
    <>
      <div className="flex justify-between flex-row mb-5">
        {/* Back Button */}
        <Button
          color="gray"
          variant="outline"
          icon={ArrowLeftIcon}
          onClick={handleBackClick}
        >
          Back
        </Button>

        {/* Order ID Display */}
        <h2 className="font-bold text-[24px]">
          Order ID: {serviceInfo.serviceNumber}
        </h2>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {cancellableStatuses.includes(
            recentStatus.serviceStatus?.toLowerCase()
          ) && (
            <Button color="red" variant="outline" onClick={handleCancelOrder}>
              Cancel Order
            </Button>
          )}

          {/* Reschedule Button */}
          <Button color="blue" variant="outline">
            {recentStatus.serviceStatus?.toUpperCase()}
          </Button>

          {/* Accept Order Button based on Sequential Status Flow */}
          {filteredOptions.length > 0 ? (
            <Button
              color="green"
              variant="filled"
              icon={ArrowRightIcon}
              iconPosition="right"
              onClick={() => handleStatusChange(filteredOptions[0]?.name)}
            >
              {`Proceed to ${filteredOptions[0]?.name}`}
            </Button>
          ) : (
            <Button color="gray" variant="outline" disabled>
              No Further Actions
            </Button>
          )}
        </div>
      </div>

      {/* Modal for Rescheduling */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Reschedule Appointment"
      >
        <ReschedulePage onClose={() => setIsModalOpen(false)} />
      </Modal>

      {/* Order Info Section */}
      <Orderinfodisplay serviceInfo={serviceInfo} />

      {/* Order Tracker Section (only if the order is accepted) */}
      {filteredOptions.length > 0 && (
        <div className="mt-5 mb-5">
          <OrderTracker orderId={id} />
        </div>
      )}

      {/* Image Upload Section (Commented as per the requirement) */}
      {/* <div>
        <hr />
        <h2 className="p-5 font-bold">Images regarding this service (Optional)</h2>
        <Upload
          uploadCount={5}
          uploadType="service"
          includeType="all"
          excludeType="pdf"
          onChange={(uploads) => console.log(uploads)}
        />
      </div> */}
    </>
  );
};

export default OrderDetails;
