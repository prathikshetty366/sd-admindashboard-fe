// components/NotificationIcon/NotificationIcon.js
import { BellIcon } from "@heroicons/react/24/outline";
import { notificationData } from "./data"; // Import data from the data file

// NotificationIcon component
export default function NotificationIcon({
  notificationCount = notificationData.defaultCount,
}) {
  return (
    <div className="relative flex items-center justify-center">
      <button className="relative focus:outline-none">
        <BellIcon className="w-8 h-8 text-gray-600 hover:text-gray-800 transition duration-200 ease-in-out" />
        {/* Notification count bubble */}
        {notificationCount > 0 && (
          <span className="absolute -top-2 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow">
            {notificationCount}
          </span>
        )}
      </button>
    </div>
  );
}
