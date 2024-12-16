// src/stories/SearchBar.stories.js

import React from "react";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

export default {
  title: "Components/SearchBar", // The category of the story
  component: SearchBar, // The component that we are showcasing
};

const Template = (args) => <SearchBar {...args} />;

// Story for SearchBar with different states
export const Default = Template.bind({});
Default.args = {};

export const WithQuery = Template.bind({});
WithQuery.args = {
  query: "Order #12345", // Setting an initial query for demonstration
};
