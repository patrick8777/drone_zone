import React, { useState } from "react"

const AccordionFAQAccordionSection = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='max-w-lg mx-auto'>
      <div className='border border-gray-300 rounded'>
        <div
          className='flex items-center justify-between p-4 cursor-pointer'
          onClick={toggleAccordion}>
          <h2 className='text-lg font-semibold'>FAQ Question</h2>
          <svg
            className={`w-6 h-6 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
            />
          </svg>
        </div>
        {isOpen && (
          <div className='p-4 border-t border-gray-300'>
            <p className='text-gray-600'>FAQ Answer goes here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccordionFAQAccordionSection
