// /components/Stats/Stats.stories.js

import React from "react";
import Stats from "./Stats";
import { sampleStats } from "./data"; // Import sampleStats

// Default export defines the title of the story and component
export default {
  title: "Components/Stats", // Name of the component category in Storybook
  component: Stats, // The component we are writing stories for
};

// Template for the Stats stories
const Template = (args) => <Stats {...args} />;

// Default Story (using the sampleStats data)
export const Default = Template.bind({});
Default.args = {
  stats: sampleStats, // Pass the sampleStats data as a prop
};
