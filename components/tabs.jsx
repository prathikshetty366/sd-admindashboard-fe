'use client'
import { useState } from 'react'

// Helper function to join class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({ tabs }) {
  const [selectedTab, setSelectedTab] = useState(tabs.find((tab) => tab.current)?.name || tabs[0].name)

  // Handle tab click and set the selected tab
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName)
  }

  // Find the content for the selected tab
  const selectedTabContent = tabs.find((tab) => tab.name === selectedTab)

  return (
    <div>
      {/* Tab navigation */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabClick(tab.name)
                }}
                aria-current={tab.name === selectedTab ? 'page' : undefined}
                className={classNames(
                  tab.name === selectedTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                )}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.name === selectedTab ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Display content based on the selected tab */}
      <div className="mt-4">
        {selectedTabContent ? (
          <TabContent description={selectedTabContent.description} tableData={selectedTabContent.tableData} />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  )
}

// Component to display tab-specific content
function TabContent({ description, tableData }) {
  return (
    <div>
      {/* Description */}
      <p className="text-gray-600">{description}</p>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {Object.keys(tableData?.[0] || {}).map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          {/* <tbody className="divide-y divide-gray-200 bg-white">
            {tableData?.map((row, rowIndex) => (
              <tr key={rowIndex} href={tableData.url}>
                {Object.values(row).map((value, index) => (
                  <td key={index} className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody> */}

          <tbody className="divide-y divide-gray-200 bg-white">
            {tableData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => (window.location.href = row.url)} // Navigate to the vehicle's URL on row click
                className="cursor-pointer hover:bg-gray-100" // Styling to show row is clickable
              >
                {/* Display each row's data */}
                {Object.values(row).map((value, index) => (
                  <td key={index} className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
