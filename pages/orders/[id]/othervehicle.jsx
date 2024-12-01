'use client'

import { Button } from '@/components/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/dialog'
import Tabs from '@/components/tabs'
import { useState } from 'react'

const vehicleTabs = [
  {
    name: 'Toyota', // Brand
    description: '', // You can add any additional description here if needed
    tableData: [
      {
        vehicleNo: 'MH12AB1234',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2018,
        status: 'expired',
        url: '/vehicles/MH12AB1234',
      },
      {
        vehicleNo: 'MH12XY5678',
        brand: 'Toyota',
        model: 'Camry',
        year: 2019,
        status: 'active',
        url: '/vehicles/MH12XY5678',
      },
    ],
  },
  {
    name: 'Honda',
    description: '',
    tableData: [
      {
        vehicleNo: 'DL3CAX4567',
        brand: 'Honda',
        model: 'Civic',
        year: 2020,
        status: 'active',
        url: '/vehicles/DL3CAX4567',
      },
      {
        vehicleNo: 'DL3CAD9876',
        brand: 'Honda',
        model: 'Accord',
        year: 2021,
        status: 'expired',
        url: '/vehicles/DL3CAD9876',
      },
    ],
  },
  {
    name: 'Ford',
    description: '',
    tableData: [
      {
        vehicleNo: 'KA05GH6789',
        brand: 'Ford',
        model: 'Mustang',
        year: 2021,
        status: 'active',
        url: '/vehicles/KA05GH6789',
      },
    ],
  },
]

const OtherVehicle = ({ ...props }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)} {...props} />
      <Dialog open={isOpen} onClose={setIsOpen} size="4xl">
        <DialogTitle>Other Vehicles</DialogTitle>
        <DialogDescription>See other vehicle status.</DialogDescription>
        <DialogBody>
          <Tabs tabs={vehicleTabs} />
        </DialogBody>
        <DialogActions>
          {/* <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button> */}
          <Button onClick={() => setIsOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default OtherVehicle
