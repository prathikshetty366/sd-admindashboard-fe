import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { eachDayOfInterval, endOfMonth, format, isSameDay, isSameMonth, isToday, startOfMonth, subDays } from 'date-fns'
import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)

  // Adjust start of the week to Monday
  const firstDayOfCalendar =
    firstDayOfMonth.getDay() === 0
      ? subDays(firstDayOfMonth, 6)
      : subDays(firstDayOfMonth, firstDayOfMonth.getDay() - 1)

  const days = eachDayOfInterval({
    start: firstDayOfCalendar,
    end: lastDayOfMonth,
  })

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))
  }

  const meetings = [
    {
      id: 1,
      name: 'Leslie Alexander',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      start: '1:00 PM',
      startDatetime: format(new Date(), 'yyyy-MM-dd') + 'T13:00',
      end: '2:30 PM',
      endDatetime: format(new Date(), 'yyyy-MM-dd') + 'T14:30',
    },
  ]

  return (
    <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
      <div className="md:pr-14">
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button
            onClick={handlePrevMonth}
            type="button"
            className="-my-1.5 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={handleNextMonth}
            type="button"
            className="-my-1.5 ml-2 flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.toString()} className={classNames(dayIdx >= 7 && 'border-t border-gray-200', 'py-2')}>
              <button
                type="button"
                className={classNames(
                  isToday(day) && 'text-indigo-600',
                  isSameDay(day, new Date()) && 'bg-indigo-600 text-white',
                  isSameMonth(day, currentMonth) ? 'text-gray-900' : 'text-gray-400',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* <section className="mt-12 md:mt-0 md:pl-14">
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
            >
              <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
              <div className="flex-auto">
                <p className="text-gray-900">
                  {meeting.start} - {meeting.end}
                </p>
              </div>
              <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                <div>
                  <MenuButton className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                    <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                        Edit
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                        Cancel
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
          ))}
        </ol>
      </section> */}
    </div>
  )
}
