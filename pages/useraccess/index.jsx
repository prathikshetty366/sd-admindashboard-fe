import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Text } from '@/components/text'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'

export const metadata = {
  title: 'Oulet Settings',
}

export default function UserAccess() {
  return (
    <form method="post" className="mx-auto max-w-4xl">
      <Heading>Access Management</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Who all can access this dashboard </Subheading>
          <Text>Contact Admin to Add, Remove Access or any access issues. Contact : OuletSupport@spannerdoor.com</Text>
        </div>
      </section>

      <Divider className="my-10" soft />

      <Subheading>FOCO Model</Subheading>

      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>User Id</TableHeader>
            <TableHeader>Username Name</TableHeader>
            <TableHeader>Username Email</TableHeader>
            <TableHeader>Username Contact</TableHeader>
            <TableHeader>Access</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {orders.map((order) => ( */}
          <TableRow>
            {/* key={order.id} href={order.url} title={`Order #${order.id}`} */}
            <TableCell>SPDRFOWN000</TableCell>
            <TableCell>Spannerdoor</TableCell>
            <TableCell>Spannerdoor@gmail.com</TableCell>
            <TableCell>+91 8050428282</TableCell>
            <TableCell>
              <Select name="sort_by" className="w-full md:w-auto">
                <option Select value="Admin">
                  Admin
                </option>
                <option value="advsior">Advsior</option>
                <option value="wwner">Owner</option>
                <option value="technician">Technician</option>
              </Select>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownButton plain aria-label="More options">
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem href={''}>View</DropdownItem>
                  <DropdownItem>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
          <TableRow>
            {/* key={order.id} href={order.url} title={`Order #${order.id}`} */}
            <TableCell>SPDRFOWN001</TableCell>
            <TableCell>Rakshith Shetty</TableCell>
            <TableCell>Rakshith@gmail.com</TableCell>
            <TableCell>+91 87987789979</TableCell>
            <TableCell>
              <Select name="sort_by" className="w-full md:w-auto">
                <option value="Admin">Admin</option>
                <option value="advsior">Advsior</option>
                <option Select value="owner">
                  Owner
                </option>
                <option value="technician">Technician</option>
              </Select>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownButton plain aria-label="More options">
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem href={''}>View</DropdownItem>
                  <DropdownItem>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
          <TableRow>
            {/* key={order.id} href={order.url} title={`Order #${order.id}`} */}
            <TableCell>SPDRFOWN002</TableCell>
            <TableCell>Nischith Shetty</TableCell>
            <TableCell>Nischith@gmail.com</TableCell>
            <TableCell>+91 87987789979</TableCell>
            <TableCell>
              <Select name="sort_by" className="w-full md:w-auto">
                <option value="Admin">Admin</option>
                <option value="advsior">Advsior</option>
                <option Select value="owner">
                  Owner
                </option>
                <option value="technician">Technician</option>
              </Select>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownButton plain aria-label="More options">
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem href={''}>View</DropdownItem>
                  <DropdownItem>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>{' '}
          </TableRow>
          <TableRow>
            {/* key={order.id} href={order.url} title={`Order #${order.id}`} */}
            <TableCell>SPDRFOWN003</TableCell>
            <TableCell>Dixit Shetty</TableCell>
            <TableCell>Dixit@gmail.com</TableCell>
            <TableCell>+91 87987789979</TableCell>
            <TableCell>
              <Select name="sort_by" className="w-full md:w-auto">
                <option value="Admin">Admin</option>
                <option value="advsior">Advsior</option>
                <option Select value="owner">
                  Owner
                </option>
                <option value="technician">Technician</option>
              </Select>
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownButton plain aria-label="More options">
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem href={''}>View</DropdownItem>
                  <DropdownItem>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
