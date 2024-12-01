export function RadioGroup({ radioItems }) {
  return (
    <fieldset className="border-b border-t border-gray-200">
      <legend className="sr-only">Options</legend>
      <div className="divide-y divide-gray-200">
        {radioItems.map((item) => (
          <div key={item.id} className="relative flex items-start pb-4 pt-3.5">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={item.id} className="font-medium text-gray-900">
                {item.title}
              </label>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id={item.id}
                name="radio-group" // Same name for the group
                type="radio"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
