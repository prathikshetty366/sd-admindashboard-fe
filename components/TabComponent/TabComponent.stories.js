// /components/TabComponent/TabComponent.stories.js

import React from "react";
import TabComponent from "./TabComponent";
import { tabsData } from "./data";

// Default export defines the title of the story and component
export default {
  title: "Components/TabComponent", // Name of the component category in Storybook
  component: TabComponent, // The component we are writing stories for
};

// Template for the TabComponent stories
const Template = (args) => <TabComponent {...args} />;

// Default Story (using the tabsData)
export const Default = Template.bind({});
Default.args = {
  tabs: tabsData, // Pass the sample tabsData as a prop
};
