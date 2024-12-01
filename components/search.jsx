'use client'

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const items = [
  {
    id: 1,
    name: 'Vendors',
    description: 'Manage and update vendor information',
    url: '/vendors',
    color: 'bg-indigo-500',
    icon: PencilSquareIcon,
  },
  {
    id: 2,
    name: 'Customers',
    description: 'View and manage customer details',
    url: '/customer',
    color: 'bg-indigo-500',
    icon: PencilSquareIcon,
  },
  {
    id: 3,
    name: 'Parts',
    description: 'Add and update parts information',
    url: '/parts',
    color: 'bg-indigo-500',
    icon: PencilSquareIcon,
  },
  {
    id: 4,
    name: 'Orders',
    description: 'Create and manage orders',
    url: '/orders',
    color: 'bg-indigo-500',
    icon: PencilSquareIcon,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Search({ open, setOpen }) {
  const [query, setQuery] = useState('')

  const filteredItems =
    query === '' ? [] : items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="bg-white-900 sticky top-0 z-40 flex h-8 shrink-0 items-center gap-x-2 border-b border-white px-2 shadow-sm sm:px-2 lg:px-10">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form action="#" method="GET" className="flex flex-1">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
            />
            <input
              id="search-field"
              name="search"
              type="search"
              placeholder="Search..."
              className="block h-full w-full border-0 bg-[#F4F4F5] py-0 pl-8 pr-0 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              onClick={() => setOpen(true)} // Open the search dialog on click
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <Dialog
        className="relative z-10"
        open={open}
        onClose={() => {
          setOpen(false)
          setQuery('')
        }}
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
            <Combobox
              onChange={(item) => {
                if (item) {
                  window.location.href = item.url // Redirect to the selected item's URL
                  setOpen(false) // Close the search dialog
                }
              }}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <ComboboxInput
                  autoFocus
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => setQuery('')}
                />
              </div>

              {filteredItems.length > 0 && (
                <ComboboxOptions static className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3">
                  {filteredItems.map((item) => (
                    <ComboboxOption
                      key={item.id}
                      value={item}
                      className="group flex cursor-default select-none rounded-xl p-3 data-[focus]:bg-gray-100"
                    >
                      <div
                        className={classNames(
                          'flex h-10 w-10 flex-none items-center justify-center rounded-lg',
                          item.color
                        )}
                      >
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="ml-4 flex-auto">
                        <p className="text-sm font-medium text-gray-700 group-data-[focus]:text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500 group-data-[focus]:text-gray-700">{item.description}</p>
                      </div>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}

              {query !== '' && filteredItems.length === 0 && (
                <div className="px-6 py-14 text-center text-sm sm:px-14">
                  <ExclamationCircleIcon className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="mt-4 font-semibold text-gray-900">No results found</p>
                  <p className="mt-2 text-gray-500">No components found for this search term. Please try again.</p>
                </div>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
