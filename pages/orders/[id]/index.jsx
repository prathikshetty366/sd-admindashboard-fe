import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import CoinsAndCashback from "@/components/coinsandcashback";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/description-list";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import { Link } from "@/components/link";
import Panels from "@/components/panels";
import Upload from "@/components/upload";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Reschedule } from "../reschedule";
import { PaymentDetails } from "./PaymentDetails";
import OtherVehicle from "./othervehicle";
import { fetchServiceDetailsById, updateServiceStatus } from "@/app/services/service";
import { useState ,useEffect} from "react";
import { useRouter } from "next/router";
import { Select } from "@/components/select";
import { ToastContainer, toast } from 'react-toastify';


export async function generateMetadata({ params }) {
  // Static metadata
  return {
    title: "Order #1234",
  };
}

export default function Order() {

  const router = useRouter()
  const { id } = router.query
  const [serviceInfo, setServiceInfo] = useState({})
  const [recentStatus, setRecentStatus] = useState({})
  const [filteredOptions, setFilteredOptions] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadingProgress, setUploadingProgress] = useState(false) 
  const options = [
    { id: 1, name: "booked" },
    { id: 2, name: "accepted" },
    { id: 3, name: "picked" },
    { id: 4, name: "repairing" },
    { id: 5, name: "billing" },
    { id: 6, name: "readyToDeliver" },
    { id: 7, name: "delivered" }
  ];

  useEffect(() => {
    if (id) {
      fetchServiceInfoById();
    } else {
      console.error("Service ID is undefined or missing.");
    }}, [id]);



const fetchServiceInfoById = async () => {
    try {
      console.log(id,"RRRR")
        const response = await fetchServiceDetailsById(id)
        if (response.success) {
            setServiceInfo(response.data)
            const mostRecent = response.data.serviceHistory.reduce((latest, current) => {
                return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
            });
            setRecentStatus(mostRecent)
            filterOptions(mostRecent.serviceStatus);

        }
    } catch (error) {
        console.log(error)
    }
}
const handleStatusChange = async (status) => {
  if (!status) return
  console.log(status,">>>>>>>")
  try {
      const response = await updateServiceStatus({ id, serviceStatus: status})
      console.log(response)
      if (response.success) {
          toast.success("Status updated.")
          fetchServiceInfoById()
      }
  } catch (error) {
      console.log(error)
  }
}
const filterOptions = (currentStatus) => {
  const currentIndex = options.findIndex(option => option.name === currentStatus);
  if (currentIndex !== -1 && currentIndex < options.length - 1) {
      setFilteredOptions([options[currentIndex + 1]]);
  } else {
      setFilteredOptions([]);
  }
};



const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setSelectedFiles(files);
  const filePreviews = files.map((file) => URL.createObjectURL(file));
  setPreviews(filePreviews);
};
const uploadServiceImages = async () => {
  setUploadingProgress(true)
  try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
          formData.append('images', file);
      });
      formData.append('serviceId', id);

      // Call the fileUpload function with the FormData containing all images
      toast.warning("Please wait till we upload the documents")
      const response = await fileUpload(formData);
      if (response.data) {
          setUploadingProgress(false)
          toast.success("Upload completed")
          setPreviews([])
          fetchServiceInfoById()
      }
      console.log(response.data); // Handle response as needed
  } catch (error) {
      console.error('Error uploading images:', error);
  }
};


const generateJobsheet = async (data, items, images) => {
  console.log('Jobsheet Data:', data);
  console.log('Jobsheet Items:', items);
  console.log('Jobsheet images:', images);
  let payload = {
      companyName: "Spannerdoor Pvt Ltd",
      garageAddress: serviceInfo?.garage?.address,
      garageContact: serviceInfo?.garage?.ownerContact,
      companyEmail: "spannerdoor@gmail.com",
      garageId: serviceInfo?.garage?.id,
      customerName: serviceInfo?.user?.firstName,
      customerAddress: null,
      customerEmail: serviceInfo?.user?.email,
      customerContact: serviceInfo?.user?.phoneNumber,
      technicianId: null,
      vehicleBrand: serviceInfo?.vehicle?.brandName,
      vehicleModel: serviceInfo?.vehicle?.brandModel,
      vehicleReg: serviceInfo?.vehicle?.licensePlate,
      fuelStatus: data.fuelStatus,
      odometerReading: data.odometerReading,
      serviceType: "General",
      serviceNumber: serviceInfo?.serviceNumber,
      serviceId: id,
      checkNumber: null,
      jobNumber: null,
      createdDate: null,
      dueDate: null,
      items: items,
      customerVoice: "test",
      newSparesImages: images
  }
  const response = await generateJobsheetPdf(payload)
  console.log(response)
};

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Orders
        </Link>
      </div>
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>Order #{serviceInfo?.serviceNumber}</Heading>
          <Badge color="lime">{recentStatus?.serviceStatus?.toUpperCase()}</Badge>
          {/* <Badge color="red">Payment Pending</Badge> */}
        </div>
        <div className="mt-8 flex items-end justify-between">
        <div>
          <Select name="period"   onChange={(e)=>{handleStatusChange(e.target.value)}} >
            <option value=''>Change Service status</option>
            {filteredOptions.map((option)=>{
              return(
                <option value={option.name}>{option.name}</option>
              )
            })}
          
          </Select>
        </div>
      </div>
        {/* <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>US{order.amount.usd}</span>
            </span>
            <span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
              <CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
              <span>{order.date}</span>
            </span>
            <CoinsAndCashback />
          </div>
          <div className="flex gap-4">
            <Button outline>Create Quote</Button>
            <Button outline>Create Invoice</Button>
            <PaymentDetails filled="true" amount={order.amount.usd}>
              Update Payment
            </PaymentDetails>
          </div>
        </div> */}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div>
            <Subheading>Order Details</Subheading>
          </div>
        </div>

        <Divider className="mt-4" />

        <div className="flex space-x-6">
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.user?.firstName}</DescriptionDetails>

              <DescriptionTerm>Contact</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.user?.phoneNumber}</DescriptionDetails>

              <DescriptionTerm>Email</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.user?.email}</DescriptionDetails>
{/* 
              <DescriptionTerm>
                Quote <Badge color="lime">Created</Badge>
              </DescriptionTerm>
              <DescriptionDetails>{order.amount.usd}</DescriptionDetails> */}

              {/* <DescriptionTerm>
                Invoice <Badge color="lime">Created</Badge>
              </DescriptionTerm>
              <DescriptionDetails>{order.amount.usd}</DescriptionDetails> */}
            </DescriptionList>
          </div>
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Booking Date and Time</DescriptionTerm>
              <DescriptionDetails>
                <Button outline>{serviceInfo?.serviceScheduledDate}</Button>
                {/* <Reschedule outline amount={order.amount.usd}>
                  Reschedule
                </Reschedule> */}
              </DescriptionDetails>
              <DescriptionTerm>&rarr; Pick</DescriptionTerm>
              <DescriptionDetails>
                {serviceInfo?.vehiclePickupType}
              </DescriptionDetails>

              <DescriptionTerm>&rarr; Drop</DescriptionTerm>
              <DescriptionDetails>
                {serviceInfo?.vehicleDropType}
              </DescriptionDetails>
            </DescriptionList>
          </div>
        </div>

        <Divider className="mb-4 mt-4" />
        <div className="flex items-center justify-between">
          <div>
            <Subheading>Vehicle Details</Subheading>
          </div>
          {/* <div>
            <OtherVehicle outline>
              Other Vehicles <Badge color="lime">3 Vehicles</Badge>
            </OtherVehicle>
          </div> */}
        </div>
        <Divider className="mt-4" />

        <div className="flex space-x-6">
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Vehicle No</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.vehicle?.licensePlate}</DescriptionDetails>

              <DescriptionTerm>Brand</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.vehicle?.brandName}</DescriptionDetails>
            </DescriptionList>
          </div>
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Year</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.vehicle?.registrationDate}</DescriptionDetails>

              <DescriptionTerm>Model</DescriptionTerm>
              <DescriptionDetails>{serviceInfo?.vehicle?.brandModel}</DescriptionDetails>
            </DescriptionList>
          </div>
        </div>

        <Divider className="mb-4 mt-4" />

        {/* <Subheading>Last Service Details</Subheading>
        <Divider className="mt-4" />

        <div className="flex space-x-6">
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Last Service Date</DescriptionTerm>
              <DescriptionDetails>
                {order.service.lastServiceDate}
              </DescriptionDetails>

              <DescriptionTerm>Odometer</DescriptionTerm>
              <DescriptionDetails>{order.service.odometer}</DescriptionDetails>

              <DescriptionTerm>Last Service Bill</DescriptionTerm>
              <DescriptionDetails>
                {order.service.billAmount}{" "}
                <Badge color="lime">Payment Success</Badge>
              </DescriptionDetails>
            </DescriptionList>
          </div>
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Last service Jobsheet</DescriptionTerm>
              <DescriptionDetails>
                <div className="flex-shrink-0">
                  <a
                    href={order.service.jobsheetUrl}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View & Download
                  </a>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>Last service Invoice</DescriptionTerm>
              <DescriptionDetails>
                <div className="flex-shrink-0">
                  <a
                    href={order.service.invoiceUrl}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View & Download
                  </a>
                </div>
              </DescriptionDetails>
              <DescriptionTerm>Comment</DescriptionTerm>
              <DescriptionDetails>{order.service.comment}</DescriptionDetails>
            </DescriptionList>
          </div>
        </div> */}
      </div>

      <div className="col-span-4">
        <Panels />
      </div>

      <Subheading className={"mt-6"}>Insurance & Emission</Subheading>
      <Divider className="mb-4 mt-4" />

      <div className="mt-8 grid grid-cols-4 gap-5">
        <div className="col-span-1">
          <Upload title="Insurance" />
          <DescriptionList>
            <DescriptionTerm>Company</DescriptionTerm>
            <DescriptionDetails>AIG TATA</DescriptionDetails>
            <DescriptionTerm>Expire Date</DescriptionTerm>
            <DescriptionDetails>12/09/2024</DescriptionDetails>
          </DescriptionList>
        </div>

        <div className="col-span-1">
          <Upload title="Emission" />
          <DescriptionList>
            <DescriptionTerm>Company</DescriptionTerm>
            <DescriptionDetails>ABC Emission Ltd</DescriptionDetails>
            <DescriptionTerm>Expire Date</DescriptionTerm>
            <DescriptionDetails>12/09/2024</DescriptionDetails>
          </DescriptionList>
        </div>
      </div>

    </>
  );
}
