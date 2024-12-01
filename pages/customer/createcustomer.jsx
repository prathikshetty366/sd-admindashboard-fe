'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { useState } from 'react'

export function CreateCustomer({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen} size="3xl">
        <DialogTitle>Create Customer</DialogTitle>
        <DialogDescription>Create & Update the Customer based on the Order.</DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Purchase Orders</Label>
              <Select name="purchaseorder" defaultValue="">
                <option value="" disabled>
                  Select from Purchase Order&hellip;
                </option>
                <option value="SPDRPO234">SPDRPO234</option>
                <option value="SPDRPO236">SPDRPO236</option>
              </Select>
            </Field>
            <a
              href="/purchaseorder"
              target="_blank"
              className="text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400"
            >
              Verify Purchase Order if required
            </a>
            <div className="grid grid-cols-2 gap-6">
              <Field>
                <Label>Part Category</Label>
                <Input name="Category" defaultValue="Oil & Lubricant" placeholder="Part Category" autoFocus />
              </Field>
              <Field>
                <Label>Part Name</Label>
                <Input name="Part Name" defaultValue="Shell 2D Grade Oil" placeholder="Part Name" autoFocus />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Field>
                <Label>Part Number</Label>
                <Input name="Part Number" defaultValue="SPDRPNO64564" placeholder="Part Number" autoFocus />
              </Field>

              <Field>
                <Label>Part Qty</Label>
                <Input name="Part Qty" defaultValue="10" placeholder="Part Qty" autoFocus />
              </Field>
            </div>

            <CheckboxField>
              <Checkbox name="confirm" />
              <Label>All the parts added to inventory is verified</Label>
              <Description>
                An verification is to check all parts are updated in garage as per data updated.
              </Description>
            </CheckboxField>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Updated</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
