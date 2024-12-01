import { useState, useEffect } from "react";
import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";
import { Heading, Subheading } from "@/components/heading";
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
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { CreateOrder } from "./createorder";
import { fetchAllGarages, fetchAllServices } from "@/app/services/service";

export const metadata = {
  title: "Orders",
};

export function Stat({ title, value, change }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {change && (
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={change.startsWith("+") ? "lime" : "pink"}>
            {change}
          </Badge>{" "}
          <span className="text-zinc-500">from last week</span>
        </div>
      )}
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [garages, setGarages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [statistics, setStatistics] = useState({});
  const [garageId, setGarageId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const fetchGarages = async () => {
    try {
      const response = await fetchAllGarages();
      const filteredOptions = response.data.map((garage) => ({
        garageId: garage.id,
        name: garage.name,
      }));
      setGarages(filteredOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchServices = async () => {
    // if (!garageId) return; // Ensure garageId is set
    try {
      const formattedStartDate = startDate ? formatDate(startDate) : null;
      const formattedEndDate = endDate ? formatDate(endDate) : null;

      const services = await fetchAllServices(
        pagination.page,
        pagination.limit,
        garageId,
        formattedStartDate,
        formattedEndDate,
        search,
        status
      );

      setBookings(services?.data?.bookings || []);
      setStatistics(services?.data?.statistics || {});
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: services.data.pagination?.totalPages || 0,
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    fetchGarages();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [pagination.page, pagination.limit, garageId, startDate, endDate, search, status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex h-full items-center">
          <Heading className="text-3xl font-bold text-zinc-950">Orders</Heading>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="mt-2 h-1 bg-gradient-to-r from-green-400 via-sky-500 to-blue-400"></div>{" "}
      {/* Gradient line */} {/* DIVIDER */}
      <div className="mt-8 flex items-end justify-between">
        <div>
          <Select name="period"   onChange={(e) => setGarageId(e.target.value)} >
            <option value=''>Garages</option>
            {garages.map((garage)=>{
              return(
                <option value={garage.garageId}>{garage.name}</option>
              )
            })}
          
          </Select>
        </div>
      </div>
      <div className="mt-4 flex grid gap-4 text-center sm:grid-cols-2 xl:grid-cols-6">
        <Stat title="Booked" value={statistics?.booked ? statistics?.booked : 0} />
        <Stat title="Picked" value={statistics?.picked ? statistics?.picked : 0} />
        <Stat title="Repairing" value={statistics?.repairing ? statistics?.repairing : 0} />
        <Stat title="Ready" value={statistics?.readyToDeliver ? statistics?.readyToDeliver : 0} />
        <Stat title="Delivered" value={statistics?.delivered ? statistics?.delivered : 0}/>
        <Stat title="Billing" value={statistics?.billing ? statistics?.billing : 0}/>
        <Stat title="Accepted" value={statistics?.accepted ? statistics?.accepted : 0}/>


      </div>
      <Divider className="my-3 mt-4" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Subheading>All Orders</Subheading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search orders&hellip;"  onChange={(e) => setSearch(e.target.value)}  />
              </InputGroup>
            </div>
            {/* <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div> */}
          </div>
        </div>
        <CreateOrder outline amount={"10"}>
          Create Order
        </CreateOrder>
      </div>
      <Divider className="my-3 mt-4" />
      <Table className="mt-2 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Customer</TableHeader>
            <TableHeader>License Plate</TableHeader>
            <TableHeader>Scheduled Date</TableHeader>
            <TableHeader>Contact</TableHeader>
            <TableHeader>Garage Name</TableHeader>
            {/* <TableHeader className="text-right">Amount</TableHeader> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking?.id}
              href={booking?.url}
              title={`Order #${booking?.id}`}
            >
              <TableCell>{booking?.user.firstName}</TableCell>
              <TableCell className="text-zinc-500">{booking?.vehicle?.licensePlate}</TableCell>
              <TableCell>{booking?.serviceScheduledDate}</TableCell>
              <TableCell>
                <Badge className="max-sm:hidden" color={"lime"}>
                  {booking?.user?.phoneNumber}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="max-sm:hidden" color={"zinc"}>
                  {booking?.garage?.name}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
