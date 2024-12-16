// components/Badge/Badge.stories.js
import React from "react";
import { Badge } from "./Badge";
import { badgeData } from "./data";  // Import sample data

export default {
  title: "Badge",
  component: Badge,
};

const Template = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "blue",  // Default color is blue
  children: badgeData.text,  // Use sample text
};

export const RedBadge = Template.bind({});
RedBadge.args = {
  color: "red",
  children: "Error",
};

export const GreenBadge = Template.bind({});
GreenBadge.args = {
  color: "green",
  children: "Success",
};

export const CustomBadge = Template.bind({});
CustomBadge.args = {
  color: "amber",
  className: "text-lg",  // Additional customization with custom class
  children: "Custom Badge",
};
