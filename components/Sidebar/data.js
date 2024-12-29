// src/components/Sidebar/data.js

import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  ArchiveBoxXMarkIcon,
  SunIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ClipboardDocumentIcon,
    sublinks: [{ name: "All Orders", href: "/orders" }],
  },
  {
    name: "Rsa",
    href: "/rsa",
    icon: ClipboardDocumentIcon,
    sublinks: [{ name: "All RSA", href: "/rsa" }],
  },
  {
    name: "Subscriptions",
    href: "/subscription",
    icon: CreditCardIcon,
  },
  {
    name: "Reminders",
    href: "/reminders",
    icon: CalendarIcon,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: UsersIcon,
  },
  {
    name: "Vehicles",
    href: "/vehicles",
    icon: UsersIcon,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FolderIcon,
  },
  {
    name: "Spares",
    href: "/spares",
    icon: ArchiveBoxXMarkIcon,
    sublinks: [{ name: "All Spares", href: "/spares" }],
  },
  {
    name: "Offline Booking",
    href: "/offlinebook",
    icon: UsersIcon,
  },
  {
    name: "Holiday List",
    href: "/holiday",
    icon: SunIcon,
  },
];
