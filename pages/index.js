import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
import Tabs from "@/components/tabs";
// import { getGarages, getRecentOrders } from "@/data";

export function Stat({ title, value, vehicle, amounttype }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {vehicle && (
        <div className="sm:text-m/6 mt-3 text-sm/6">
          <Badge className="text-sm" color={vehicle ? "purple" : "grey"}>
            {vehicle}
          </Badge>
          <span className="text-zinc-900">Vehicles</span>
        </div>
      )}
    </div>
  );
}

const tabsdata = [
  {
    name: "Todays Order",
    current: true,
    description: "Here is the list of service reminders that need attention.",
    tableData: [
      { id: 1, customer: "John Doe", dueDate: "2024-10-01" },
      { id: 2, customer: "Jane Smith", dueDate: "2024-10-03" },
    ],
  },
  {
    name: "RSA",
    current: true,
    description: "Here is the list of service reminders that need attention.",
    tableData: [
      { id: 1, customer: "John Doe", dueDate: "2024-10-01" },
      { id: 2, customer: "Jane Smith", dueDate: "2024-10-03" },
    ],
  },
  {
    name: "Service Reminder",
    current: true,
    description: "Here is the list of service reminders that need attention.",
    tableData: [
      { id: 1, customer: "John Doe", dueDate: "2024-10-01" },
      { id: 2, customer: "Jane Smith", dueDate: "2024-10-03" },
    ],
  },
  {
    name: "Delayed Service",
    description: "These services are delayed and require immediate attention.",
    tableData: [
      { id: 1, customer: "Michael Johnson", dueDate: "2024-09-15" },
      { id: 2, customer: "Emily Davis", dueDate: "2024-09-18" },
    ],
  },
  {
    name: "Pending Payment",
    description:
      "Payments that are pending from the customers are listed below.",
    tableData: [
      { id: 1, customer: "Chris Martin", amount: "$500" },
      { id: 2, customer: "Alice Brown", amount: "$300" },
    ],
  },
];

function HomePage() {
  return (
    <>
      <Heading>Good afternoon!</Heading>
      <Heading>FRIDAY , 20 SEPTEMBER 2024</Heading>

      <div className="mt-8 flex w-full flex-col items-start">
        <div className="flex w-full items-center justify-between">
          <Subheading>
            Today's Booking
            <Badge className="text-sm" color="lime">
              Status Update
            </Badge>
          </Subheading>
        </div>

        <div className="mt-4 grid w-full gap-8 sm:grid-cols-5 xl:grid-cols-5">
          <Stat title="Booking" value="8" />
          <Stat title="Picked" value="4" />
          <Stat title="Repair" value="2" />
          <Stat title="Ready" value="1" />
          <Stat title="Delivered" value="1" />
          {/* 
        <DarkStat /> */}
        </div>
      </div>

      <Divider className="my-5" />
      <Tabs tabs={tabsdata} />

      <div className="mt-8 flex w-full flex-col items-end justify-between">
        <div className="mt-4 flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Heading>Attur Layout</Heading>
                <Badge color="lime">FOCO</Badge>
              </div>
              <div className="mt-2 text-sm text-zinc-500">
                24, SEP 2024 at 10:00AM <span aria-hidden="true">·</span> Attur
                Layout
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              outline
              href="https://g.page/r/CbhOBa4Q4dO_EAE/review"
              target="_blank"
            >
              Get more Reviews
            </Button>
            <Button color="blue">Google Business</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
