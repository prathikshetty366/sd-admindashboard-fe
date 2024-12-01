import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getGarages, getOrders } from '@/data'
import { ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
// import { CreateOrder } from './createorder'

export const metadata = {
  title: 'Vehicle Details',
}

export function Stat({ title, value, change }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      {change && (
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
          <span className="text-zinc-500">from last week</span>
        </div>
      )}
    </div>
  )
}

export default async function Orders() {
  let orders = await getOrders()
  let garages = await getGarages()

  return (
    <>
      <div className="max-lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Our Garages
        </Link>
      </div>
      <Divider className="my-3 mt-4" />
      <div className="flex items-center gap-4">
        <div className="flex h-full items-center">
          <Heading className="text-3xl font-bold text-zinc-950">Orders</Heading>
        </div>
      </div>
      {/* DIVIDER */}
      <div className="mt-2 h-1 bg-gradient-to-r from-green-400 via-sky-500 to-blue-400"></div> {/* Gradient line */}{' '}
      {/* DIVIDER */}
      <div className="mt-8 flex items-end justify-between">
        <div>
          <Select name="period">
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="Yesterday">Yesterday</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex grid gap-4 text-center sm:grid-cols-2 xl:grid-cols-6">
        <Stat title="Cancelled" value="1" />
        <Stat title="Booked" value="10" />
        <Stat title="Picked" value="2" />
        <Stat title="Repairing" value="4" />
        <Stat title="Ready" value="5" />
        <Stat title="Delivered" value="9" />

        {/* <DarkStat /> */}
      </div>
      <Divider className="my-3 mt-4" />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Subheading>All Orders</Subheading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search orders&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        {/* <CreateOrder outline amount={'10'}>
          Create Order
        </CreateOrder> */}
        <Button outline>Add Vehicle</Button>
      </div>
      <Divider className="my-3 mt-4" />
      <Table className="mt-2 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>status</TableHeader>
            <TableHeader>Payment</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                {/* <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div> */}
                <Badge className="max-sm:hidden" color={'lime'}>
                  Delivered
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className="max-sm:hidden" color={'zinc'}>
                  pending
                </Badge>
              </TableCell>
              <TableCell className="text-right">₹{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
