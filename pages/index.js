import { React, useState, useEffect } from "react";
import Button from "@/components/Button/Button";
import GreetingTime from "@/components/Greetingtime/Greetingtime";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Table from "@/components/Table/Table";
import { sampletabledata } from "@/components/Table/data";
import TabComponent from "@/components/TabComponent/TabComponent";
import { tabsData } from "./../components/TabComponent/data";
import Stats from "@/components/Stats/Stats";
import { statsData } from "./../components/Stats/data";
import OrderTracker from "@/components/OrderTracker/OrderTracker";
import Upload from "@/components/Upload/Upload";
import GetGoogleReview from "@/components/GetGoogleReview/GetGoogleReview";
import { Dialog } from "@/components/Dialog/Dialog";
import Loader from "@/components/Loader/Loader";
import QuotePreviewPage from "./quote/[orderId]";

export default function Home() {
  const { miniStats } = statsData;
  const orderId = "7867";
  const googleReviewCode = "CeOlLmnRDVOuEBM";
  const customerNumber = "917019864767";

  const [inputValue, setInputValue] = useState(""); // For handling form inputs

  // Function to handle input change
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Function to handle confirm action
  const handleConfirm = () => {
    alert("Form Submitted!");
  };

  // Function to handle delete action
  // const handleDelete = () => {
  //   alert("Item Deleted!");
  // };

  // Function to handle accept action
  const handleAccept = () => {
    alert("Item Accepted!");
  };

  {
    /* -============================ */
  }

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle dialog open/close
  const toggleDialog = () => setIsOpen(!isOpen);

  // Function to handle the delete action
  const handleDelete = () => {
    alert("Item deleted!");
    setIsOpen(false); // Close the dialog after delete action
  };
  {
    /* -============================ */
  }
  const [isLoading, setIsLoading] = useState(false);
  const loaderImage = "teams/logo.png"; // Custom loader image
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);
  }, []);

  return (
    <>
      <div>
        <div>
          <GreetingTime />
        </div>
        <div>
          <Stats miniStats={miniStats} />
        </div>
        <div className="mt-5 mb-5">
          <TabComponent tabsData={tabsData} />
        </div>
        <div className="mt-5 mb-5">
          <Button
            href="/home"
            color="blue"
            variant="filled"
            icon={ArrowRightIcon}
            iconPosition="left"
            width="auto"
          >
            Go to Home
          </Button>
        </div>
        <div className="mt-5 mb-5">
          <Table
            headers={["Date", "Name", "Email", "Role"]}
            data={sampletabledata}
            filters={["Admin", "User"]}
            daterange={true} // Enable date range filter
          />
        </div>



        <QuotePreviewPage />

        <div className="p-6">
          {/* Confirm Dialog */}
          <div className="mt-5 mb-5">
            <Dialog
              type="confirm"
              title="Simple Dialog"
              description="This is a simple dialog with a confirm button."
              confirmText="Confirm"
              cancelText="Cancel"
              buttonName="Proceed"
              buttonColor="bg-yellow-500" // Make sure this is a valid Tailwind class
              onConfirm={handleConfirm}
              onCancel={toggleDialog}
            >
              <input
                type="text"
                id="name"
                value={inputValue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md mt-2"
                placeholder="Enter your name"
              />
            </Dialog>
          </div>

          {/* Delete Dialog */}
          <div className="mt-5 mb-5">
            <Dialog
              isOpen={isOpen}
              onClose={toggleDialog}
              size="md"
              type="delete" // Set the dialog type to "delete"
              title="Delete Item"
              description="Are you sure you want to delete this item?"
              cancelText="Cancel"
              deleteText="Delete"
              buttonName="Delete Now"
              buttonColor="bg-red-700"
              onDelete={handleDelete}
              onCancel={toggleDialog}
            >
              <p className="text-sm text-gray-700">
                This action is irreversible.
              </p>
            </Dialog>
          </div>

          {/* Accept Dialog */}
          <div className="mt-5 mb-5">
            <Dialog
              isOpen={isOpen}
              onClose={toggleDialog}
              size="md"
              type="accept" // Set the dialog type to "accept"
              title="Accept Terms"
              description="Please accept the terms and conditions."
              confirmText="Accept"
              cancelText="Cancel"
              buttonName="I Accept"
              buttonColor="bg-green-600"
              onConfirm={handleConfirm}
              onCancel={toggleDialog}
            />
          </div>

          {/* Simple Dialog */}
          <div className="mt-5 mb-5">
            <Dialog
              isOpen={isOpen}
              onClose={toggleDialog}
              size="md"
              type="simple" // Set the dialog type to "simple"
              title="Simple Dialog"
              description="This is a simple dialog with a cancel button."
              cancelText="Cancel"
              buttonName="Okay"
              buttonColor="bg-gray-500"
              onCancel={toggleDialog}
            >
              {/* Optional content inside the dialog body */}
              <p className="text-sm text-gray-700">This is a simple dialog.</p>
            </Dialog>
          </div>
        </div>

        <div>
          <Loader isLoading={isLoading} imageUrl={loaderImage} />

          {/* Loader with default image */}
          <Loader isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
