import React from "react";
import Dropdown from "./Dropdown";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// Sample data for the dropdown
const links = [
  {
    name: "Profile",
    href: "/profile",
    icon: ChevronDownIcon, // You can replace this with a real icon
  },
  {
    name: "Settings",
    href: "/settings",
    icon: ChevronDownIcon,
  },
  {
    name: "Sign Out",
    href: "/signout",
    icon: ChevronDownIcon,
  },
];

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  links: links,
};
