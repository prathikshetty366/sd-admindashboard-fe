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

export async function generateMetadata({ params }) {
  // Static metadata
  return {
    title: "Order #1234",
  };
}

export default function Order() {
  // Static order data
  const order = {
    id: "1234",
    amount: { usd: 500 },
    date: "2024-11-22",
    customer: {
      name: "John Doe",
      contact: "+1234567890",
      email: "johndoe@example.com",
    },
    booking: {
      dateTime: "2024-11-23 10:00 AM",
      pickLocation: "Location A",
      dropLocation: "Location B",
    },
    vehicle: {
      number: "ABC1234",
      brand: "Honda",
      year: 2020,
      model: "CBR 500R",
    },
    service: {
      lastServiceDate: "2024-06-15",
      odometer: "12000 km",
      billAmount: 300,
      jobsheetUrl: "/path/to/jobsheet",
      invoiceUrl: "/path/to/invoice",
      comment: "Regular service done",
    },
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
          <Heading>Order #{order.id}</Heading>
          <Badge color="lime">Payment Successfully</Badge>
          <Badge color="red">Payment Pending</Badge>
        </div>
        <div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
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
        </div>
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
              <DescriptionDetails>{order.customer.name}</DescriptionDetails>

              <DescriptionTerm>Contact</DescriptionTerm>
              <DescriptionDetails>{order.customer.contact}</DescriptionDetails>

              <DescriptionTerm>Email</DescriptionTerm>
              <DescriptionDetails>{order.customer.email}</DescriptionDetails>

              <DescriptionTerm>
                Quote <Badge color="lime">Created</Badge>
              </DescriptionTerm>
              <DescriptionDetails>{order.amount.usd}</DescriptionDetails>

              <DescriptionTerm>
                Invoice <Badge color="lime">Created</Badge>
              </DescriptionTerm>
              <DescriptionDetails>{order.amount.usd}</DescriptionDetails>
            </DescriptionList>
          </div>
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Booking Date and Time</DescriptionTerm>
              <DescriptionDetails>
                <Button outline>{order.booking.dateTime}</Button>
                <Reschedule outline amount={order.amount.usd}>
                  Reschedule
                </Reschedule>
              </DescriptionDetails>
              <DescriptionTerm>&rarr; Pick</DescriptionTerm>
              <DescriptionDetails>
                {order.booking.pickLocation}
              </DescriptionDetails>

              <DescriptionTerm>&rarr; Drop</DescriptionTerm>
              <DescriptionDetails>
                {order.booking.dropLocation}
              </DescriptionDetails>
            </DescriptionList>
          </div>
        </div>

        <Divider className="mb-4 mt-4" />
        <div className="flex items-center justify-between">
          <div>
            <Subheading>Vehicle Details</Subheading>
          </div>
          <div>
            <OtherVehicle outline>
              Other Vehicles <Badge color="lime">3 Vehicles</Badge>
            </OtherVehicle>
          </div>
        </div>
        <Divider className="mt-4" />

        <div className="flex space-x-6">
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Vehicle No</DescriptionTerm>
              <DescriptionDetails>{order.vehicle.number}</DescriptionDetails>

              <DescriptionTerm>Brand</DescriptionTerm>
              <DescriptionDetails>{order.vehicle.brand}</DescriptionDetails>
            </DescriptionList>
          </div>
          <div className="flex-1">
            <DescriptionList>
              <DescriptionTerm>Year</DescriptionTerm>
              <DescriptionDetails>{order.vehicle.year}</DescriptionDetails>

              <DescriptionTerm>Model</DescriptionTerm>
              <DescriptionDetails>{order.vehicle.model}</DescriptionDetails>
            </DescriptionList>
          </div>
        </div>

        <Divider className="mb-4 mt-4" />

        <Subheading>Last Service Details</Subheading>
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
        </div>
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
