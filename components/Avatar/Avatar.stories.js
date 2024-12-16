// components/Avatar/Avatar.stories.js
import React from "react";
import Avatar from "./Avatar";
import { avatarData } from "./data"; // Import sample data

export default {
  title: "Avatar",
  component: Avatar,
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...avatarData, // Use sample data for the default story
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  initials: "AB", // Fallback initials
  alt: "Alex Brown",
  square: true,
};

export const SquareAvatar = Template.bind({});
SquareAvatar.args = {
  ...avatarData,
  square: true, // Display avatar as square
};
