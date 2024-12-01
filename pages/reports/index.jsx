import { useState, useEffect } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import BarChart from "@/components/charts/barchart";
import LineChart from "@/components/charts/linechart";
import { Divider } from "@/components/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import { Heading, Subheading } from "@/components/heading";
import { Link } from "@/components/link";
import { Select } from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getGarages, getOrders } from "@/data";
import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/16/solid";

export const metadata = {
  title: "Reports",
};

export function Stat({ title, value, vehicle, amounttype }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">
        {title}{" "}
        <Badge
          className="text-sm"
          color={amounttype === "income" ? "lime" : "pink"}
        >
          {amounttype}
        </Badge>{" "}
      </div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {vehicle && (
        <div className="sm:text-m/6 mt-3 text-sm/6">
          <Badge className="text-sm" color={vehicle ? "purple" : "grey"}>
            {vehicle}
          </Badge>{" "}
          <span className="text-zinc-900">Vehicles</span>
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    // Fetch data asynchronously
    async function fetchData() {
      const fetchedOrders = await getOrders();
      const fetchedGarages = await getGarages();
      setOrders(fetchedOrders);
      setGarages(fetchedGarages);
    }
    fetchData();
  }, []); // This will run once when the component mounts

  if (orders.length === 0 || garages.length === 0) {
    // You can return a loading spinner or message here while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Our Garages
        </Link>
      </div>
      {garages.map((garage) => (
        <div
          key={garage.id}
          className="mt-4 flex flex-wrap items-end justify-between gap-4"
        >
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <Heading>{garage.name}</Heading>
                <Badge color={garage.status === "FOCO" ? "lime" : "zinc"}>
                  {garage.status}
                </Badge>
              </div>
              <div className="mt-2 text-sm/6 text-zinc-500">
                {garage.date} at {garage.time} <span aria-hidden="true">·</span>{" "}
                {garage.location}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button outline>Reviews</Button>
            <Button>More Info</Button>
            <Button>View in Calender</Button>
          </div>
        </div>
      ))}

      <Divider className="my-3 mt-4" />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Reports</Heading>
        </div>
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Overall revenue" value="₹3.8L" />
        <Stat title="Overall Vehicle serviced" value="789" />
        <Stat title="Overall Franchise Gain" value="₹4,60,000" />
      </div>

      <div className="flex items-start justify-center">
        <BarChart />
        <LineChart />
      </div>

      <Divider className="my-5" />

      <div className="mt-8 flex items-end justify-between">
        <div>
          <Select name="period">
            <option value="">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>

      <Divider className="my-5" />

      <div className="mt-8 flex items-end justify-between">
        <Subheading>Month - September 2024</Subheading>
        <Button filled="true">Change Month</Button>
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        <Stat title="Total revenue" value="₹3.8L" />
        <Stat title="Total Expenses" value="₹2.5L" />
        <Stat title="Profit" value="₹60,000" />
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        <Stat
          title="Service"
          value="₹4,00,987"
          vehicle="210"
          amounttype="income"
        />
        <Stat
          title="Emission"
          value="₹3,490"
          vehicle="27"
          amounttype="income"
        />
        <Stat title="RSA" value="₹8,672" vehicle="34" amounttype="income" />
        <Stat
          title="Insurance"
          value="₹12,000"
          vehicle="70"
          amounttype="income"
        />
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
        <Stat title="Spares" value="₹40,987" amounttype="expense" />
        <Stat title="Salaries" value="₹1,02,490" amounttype="expense" />
        <Stat title="Electricity" value="₹1,500" amounttype="expense" />
        <Stat title="Water" value="₹1,000" amounttype="expense" />
        <Stat title="Others" value="₹1,500" amounttype="expense" />
      </div>

      <Divider className="my-5" />

      <div className="mt-8 flex items-end justify-between">
        <Heading>Detail Monthly Report</Heading>
      </div>
      <Table className="mt-5 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Report Id</TableHeader>
            <TableHeader>Month/Year</TableHeader>
            <TableHeader>Profit</TableHeader>
            <TableHeader>Vehicles</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              href={order.url}
              title={`Order #${order.id}`}
            >
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>₹60,000</TableCell>
              <TableCell>₹220</TableCell>

              <TableCell>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={""}>View</DropdownItem>
                    <DropdownItem>Download</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
