'use client'

import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { Description, Field, FieldGroup, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { useState } from 'react'

export function CreateOrder({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Create Order</DialogTitle>
        <DialogDescription>The offline order will be created from here.</DialogDescription>
        <DialogBody>
          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input name="name" defaultValue="" placeholder="Customer Name" autoFocus />
            </Field>
            <Field>
              <Label>Contact</Label>
              <Input name="contact" defaultValue="+91" placeholder="Contact" autoFocus />
            </Field>
            <Field>
              <Label>Email</Label>
              <Input name="email" defaultValue="xxx@xxx.com" placeholder="email" autoFocus />
            </Field>
            <Field>
              <Label>Vehicle Registration No</Label>
              <Input name="vehicle-reg" defaultValue="" placeholder="KA XX XX XXXX" autoFocus />
            </Field>
            <Field>
              <Label>Vehicle Registration No</Label>
              <Select name="vehicle-brand" defaultValue="">
                <option value="" disabled>
                  Select a Brand&hellip;
                </option>
                <option value="re">Royal Enfield</option>
                <option value="bajaj">Bajaj</option>
                <option value="ktm">KTM</option>
                <option value="suzuki">Suzuki</option>
              </Select>
            </Field>
            <Field>
              <Label>Vehicle Model</Label>
              <Input name="vehicle-model" defaultValue="" placeholder="Enter Vehicle Modal" autoFocus />
            </Field>
            <CheckboxField>
              <Checkbox name="verify" />
              <Label>if customer verified via call/whatsapp</Label>
              <Description>An verification is to check the customer contact information is correct.</Description>
            </CheckboxField>
          </FieldGroup>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
