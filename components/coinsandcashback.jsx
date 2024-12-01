import { CheckIcon, CurrencyRupeeIcon } from '@heroicons/react/20/solid' // Ensure the correct icon import

export default function CoinsAndCashback() {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-white">
      {/* Coins and Cashback Section */}
      <div className="flex space-x-4">
        {/* Coins Section */}
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 text-white">
            <CurrencyRupeeIcon className="h-3 w-3" />
          </div>
          <div>
            {/* <div className="text-md font-medium leading-6 text-gray-900">Coins</div> */}
            <div className="mt-0 text-sm leading-6 text-gray-700 sm:mt-0">1,250</div>
          </div>
        </div>

        {/* Cashback Section */}
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
            <CheckIcon className="h-3 w-3" />
          </div>
          <div>
            {/* <div className="text-md font-medium leading-6 text-gray-900">Cashback</div> */}
            <div className="mt-0 text-sm leading-6 text-gray-700 sm:mt-0">150</div>
          </div>
        </div>
      </div>
    </div>
  )
}
