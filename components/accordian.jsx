'use client'
import { useState } from 'react'

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="accordion-section">
      <div className="flex cursor-pointer items-center justify-between" onClick={toggleAccordion}>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div>
          <button className="text-indigo-600 outline-none focus:outline-none">{isOpen ? 'Hide' : 'Show'}</button>
        </div>
      </div>
      {isOpen && (
        <>
          <hr className="mt-4" />
          <div className="mt-4">{children}</div>
        </>
      )}
    </div>
  )
}

export default Accordion
