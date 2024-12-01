'use client'

import { Button } from '@/components/button'
import Calender from '@/components/calender'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { useState } from 'react'

export function OrderCalender({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen} size="3xl">
        <DialogTitle>Order Calender</DialogTitle>
        <DialogDescription>The Books for this month can be view from here.</DialogDescription>
        <DialogBody>
          <Calender />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
