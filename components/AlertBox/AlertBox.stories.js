// components/AlertBox/AlertBox.stories.js
import React from "react";
import AlertBox from "./AlertBox";
import { alertData } from "./data"; // Import the sample data

export default {
  title: "AlertBox", // This creates a section in Storybook for AlertBox
  component: AlertBox,
};

const Template = (args) => <AlertBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...alertData, // Use the sample data for the default story
};

export const Warning = Template.bind({});
Warning.args = {
  ...alertData,
  type: "warning", // Change the alert type to 'warning'
  title: "Warning Alert",
  message: "This is a warning message.",
};

export const Success = Template.bind({});
Success.args = {
  ...alertData,
  type: "success", // Change the alert type to 'success'
  title: "Success Alert",
  message: "Your operation was successful!",
};
