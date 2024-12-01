'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import CoinsAndCashback from '@/components/coinsandcashback'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { useState } from 'react'

export function PaymentDetails({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogDescription>
          The Payment details are updated to verify the customer payment is complete.
        </DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Total Bill Amount</Label>
              <Input name="bill-amount" defaultValue={'4,890'} placeholder="Bill Amount" autoFocus />
            </Field>
            <Field>
              <Label>Amount Paid</Label>
              <Input name="bill-amount" defaultValue={'4,890'} placeholder="Bill Amount" autoFocus />
            </Field>
            <Field>
              <CoinsAndCashback />
              <Field>
                <Label>Use Coins</Label>
                <Input name="use-coins" defaultValue={'0'} placeholder="Use Coins" autoFocus />
              </Field>
              <Field>
                <Label>Use Cashback</Label>
                <Input name="use-cashback" defaultValue={'0'} placeholder="Cashback" autoFocus />
              </Field>
            </Field>

            <Field>
              <Label>Payment Method</Label>
              <Select name="payment-method" defaultValue="UPI">
                <option value="" disabled>
                  Select Payment Method&hellip;
                </option>
                <option value="duplicate">UPI</option>
                <option value="fraudulent">Debit Card</option>
                <option value="requested_by_customer">Credit Card</option>
              </Select>
            </Field>
            <CheckboxField>
              <Checkbox name="paid" />
              <Label>Confirming Full Payment Done</Label>
              <Description>An email notification will be sent to this customer on payment done.</Description>
            </CheckboxField>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Received</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
