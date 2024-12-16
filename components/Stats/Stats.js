import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

// Utility function for conditionally applying classNames
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Stats({ miniStats }) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        {miniStats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-blue-600">
                {item.stat}
                {item.previousStat && (
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    from {item.previousStat}
                  </span>
                )}
              </div>

              {item.changeType && (
                <div
                  className={classNames(
                    item.changeType === "increase"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon
                      aria-hidden="true"
                      className="-ml-1 mr-0.5 w-5 h-5 text-green-500"
                    />
                  ) : (
                    <ArrowDownIcon
                      aria-hidden="true"
                      className="-ml-1 mr-0.5 w-5 h-5 text-red-500"
                    />
                  )}

                  <span className="sr-only">
                    {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
                  </span>
                  {item.change}
                </div>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Stats;
