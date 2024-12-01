import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import SecondaryNavbar from '@/components/secondarynavbar'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import NextLink from 'next/link'
import { Address } from './address'

export const metadata = {
  title: 'Outlet Settings',
}

export default function Settings() {
  return (
    <>
      <form method="post" className="mx-auto max-w-4xl">
        <Heading>Outlet Settings</Heading>
        <Divider className="my-1 mt-3" />
        <SecondaryNavbar />
        <Divider className="my-8 mt-1" />

        {/* Google Business Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Google Business</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <NextLink href="https://g.co/kgs/2Pn3Aku" target="_blank" rel="noopener noreferrer">
              Spannerdoor Private Limited (YNT - Attur Layout)
            </NextLink>
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Name Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Name</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Input aria-label="Organization Name" name="name" defaultValue="Attur Layout" />
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Bio Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Bio</Subheading>
            <Text>This will be displayed on your public profile. Maximum 240 characters.</Text>
          </div>
          <div>
            <Textarea aria-label="Outlet Bio" name="bio" />
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* GST Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>GST</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Input aria-label="GST Number" name="gst-number" defaultValue="29ABKS2999Q1Z1" />
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Advisor Name Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Advisor Name</Subheading>
            <Text>This will be displayed on your public profile.</Text>
          </div>
          <div>
            <Input aria-label="Advisor Name" name="adv_name" defaultValue="Abhishek M R" />
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Contact Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Contact</Subheading>
            <Text>This is how customers can contact over Call and Whatsapp.</Text>
          </div>
          <div className="space-y-4">
            <Input type="tel" aria-label="Outlet Contact" name="contact" defaultValue="+91 8050428282" />
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Email Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Email</Subheading>
            <Text>This is how customers can contact you for support.</Text>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              aria-label="Organization Email"
              name="email"
              defaultValue="atturlayout.spannerdoor@gmail.com"
            />
            <CheckboxField>
              <Checkbox name="email_is_public" defaultChecked />
              <Label>Show email on public profile</Label>
            </CheckboxField>
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Address Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Address</Subheading>
            <Text>This is where your organization is registered.</Text>
          </div>
          <Address />
        </section>

        <Divider className="my-10" soft />

        {/* Outlet Timings Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Outlet Timings</Subheading>
            <Text>Based on the outlet timing customers book slots for booking.</Text>
          </div>
          <div className="space-y-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="flex items-center space-x-6">
                <div className="flex flex-shrink-0 items-center space-x-4">
                  <CheckboxField className="flex items-center">
                    <Checkbox name={`${day.toLowerCase()}`} value={`${day.toLowerCase()}`} defaultChecked />
                    <Label className="ml-2">{day}</Label>
                  </CheckboxField>
                </div>
                <div className="flex flex-grow items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      aria-label={`Outlet ${day} Start Time`}
                      name={`outlet-start-time-${day.toLowerCase()}`}
                      defaultValue="09:00"
                      className="w-24"
                    />
                    <span>&rarr;</span>
                    <Input
                      type="time"
                      aria-label={`Outlet ${day} End Time`}
                      name={`outlet-end-time-${day.toLowerCase()}`}
                      defaultValue="21:00"
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Franchise Owners Section */}
        <Subheading>Franchise Owners</Subheading>
        <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Owner Id</TableHeader>
              <TableHeader>Owner Name</TableHeader>
              <TableHeader>Invested Amount</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>SPDRFOWN001</TableCell>
              <TableCell>Rakshith Shetty</TableCell>
              <TableCell className="text-zinc-500">+91 9865446789</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SPDRFOWN002</TableCell>
              <TableCell>Nischith Shetty</TableCell>
              <TableCell className="text-zinc-500">+91 9865446789</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SPDRFOWN003</TableCell>
              <TableCell>Dixit Shetty</TableCell>
              <TableCell className="text-zinc-500">+91 9865446789</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Divider className="my-10" soft />

        {/* Currency Section */}
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Subheading>Currency</Subheading>
            <Text>The currency that your outlet will be collecting.</Text>
          </div>
          <div>
            <Select aria-label="Currency" name="currency" defaultValue="cad">
              <option value="rupee">₹ - Rupee</option>
            </Select>
          </div>
        </section>

        <Divider className="my-10" soft />

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="reset" plain>
            Reset
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </>
  )
}
