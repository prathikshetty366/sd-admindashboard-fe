'use client'

import TimePicker from '@/components/Timer' // Adjust path as necessary
import { Button } from '@/components/button'
import Calendar from '@/components/calender' // Adjust path as necessary
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import { useState } from 'react'

export function Reschedule({ amount, ...props }) {
  let [isOpen, setIsOpen] = useState(false)
  const [selectedStartTime, setSelectedStartTime] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} size="3xl">
        <DialogTitle>Reschedule Order</DialogTitle>
        <DialogDescription>The Books for this month can be viewed from here.</DialogDescription>
        <DialogBody>
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <Calendar onDateChange={handleDateChange} />
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Schedule Order</h2>
              <div className="mt-4 space-y-4">
                <TimePicker selectedTime={selectedStartTime} setSelectedTime={setSelectedStartTime} />
                {selectedDate && selectedStartTime && (
                  <div className="mt-4 text-gray-700">
                    <p>Rescheduled Date & Time:</p>
                    <p>
                      {selectedDate.toLocaleDateString()} at {selectedStartTime.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
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
