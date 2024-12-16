// src/components/Sidebar/Sidebar.stories.js

import React from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import { navigation } from "./data"; // Import the sample navigation data

// Default export defines the title of the story and component
export default {
  title: "Components/Sidebar", // Name of the component category in Storybook
  component: Sidebar, // The component we are writing stories for
  argTypes: {
    navigation: { control: "object" }, // Allow Storybook to control the 'navigation' prop via the controls
  },
};

// Template for the Sidebar stories
const Template = (args) => <Sidebar {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  navigation, // Pass the navigation data to the Sidebar component
};

// Collapsed Sidebar
export const Collapsed = Template.bind({});
Collapsed.args = {
  navigation, // Pass the navigation data to the Sidebar component
  collapsed: true, // Set the collapsed prop to true
};

// Sidebar with an expanded accordion
export const ExpandedAccordion = Template.bind({});
ExpandedAccordion.args = {
  navigation, // Pass the navigation data to the Sidebar component
  openAccordions: {
    Orders: true, // Open the "Orders" accordion by default
  },
};
