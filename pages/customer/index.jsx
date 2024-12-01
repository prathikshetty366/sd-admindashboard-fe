import { useState, useEffect } from "react";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import { Heading } from "@/components/heading";
import { Input, InputGroup } from "@/components/input";
import { Select } from "@/components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getOrders } from "@/data";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { CreateCustomer } from "./createcustomer";

export const metadata = {
  title: "Customer",
};

export function Stat({ title, value, vehicle }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {vehicle && (
        <div className="sm:text-m/6 mt-3 text-sm/6">
          <Badge className="text-sm" color={vehicle ? "lime" : "pink"}>
            {vehicle}
          </Badge>{" "}
          <span className="text-zinc-900">Vehicles</span>
        </div>
      )}
    </div>
  );
}

export default function Customer() {
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders(); // Fetch data
        setOrders(data); // Update state
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }

    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading state
  }

  return (
    <>
      <div className="flex items-end justify-between gap-1">
        <Heading>Customer</Heading>
        <CreateCustomer>Create Customer</CreateCustomer>
      </div>

      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Inventory" value="₹4.8L" />
        <Stat title="In Stock" value="56 Items" />
        <Stat title="Cleared Soon" value="2 Items" />
        <Stat title="No Stock" value="1 item" />
      </div>

      <Divider className="my-5" />

      <div className="mt-4 flex max-w-full flex-col gap-4 md:flex-row">
        <div className="w-full md:w-auto">
          <Select name="sort_by" className="w-full md:w-auto">
            <option value="">All</option>
            <option value="instock">In Stock</option>
            <option value="outofstock">Out of Stock</option>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select name="sort_by" className="w-full md:w-auto">
            <option value="">Any</option>
            <option value="OE">Original</option>
            <option value="AM">After Market</option>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select name="sort_by" className="w-full md:w-auto">
            <option value="">Any</option>
            <option value="hero">Hero</option>
            <option value="ktm">KTM</option>
          </Select>
        </div>
        <div className="w-full md:w-auto">
          <Select name="sort_by" className="w-full md:w-auto">
            <option value="">Any</option>
            <option value="pleasure">Pleasure</option>
            <option value="duke200">Duke200</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex max-w-full flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <InputGroup className="w-full">
            <MagnifyingGlassIcon />
            <Input
              name="search"
              placeholder="Search Purchase Order"
              className="w-full"
            />
          </InputGroup>
        </div>
      </div>

      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Inventory number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Vendor</TableHeader>
            <TableHeader>Total Count</TableHeader>
            <TableHeader>Remaining</TableHeader>
            <TableHeader>price per item</TableHeader>
            <TableHeader>Action</TableHeader>
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
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <Badge className="max-sm:hidden" color={"lime"}>
                  In Stock
                </Badge>
              </TableCell>
              <TableCell>400</TableCell>
              <TableCell>₹{order.amount.usd}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownButton plain aria-label="More options">
                    <EllipsisVerticalIcon />
                  </DropdownButton>
                  <DropdownMenu anchor="bottom end">
                    <DropdownItem href={""}>View</DropdownItem>
                    <DropdownItem>Update</DropdownItem>
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
