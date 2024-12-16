// components/PageHeader/PageHeader.stories.js
import React from "react";
import PageHeader from "./PageHeader";
import { headerData } from "./data";

export default {
  title: "Components/PageHeader",
  component: PageHeader,
};

// Default Story
export const Default = () => <PageHeader {...headerData} />;

// No buttons Story
export const NoButtons = () => (
  <PageHeader title="No Buttons" subtitle="This page has no action buttons" />
);

// Custom Buttons Story
export const CustomButtons = () => (
  <PageHeader
    title="Custom Buttons"
    subtitle="This page has custom action buttons"
    buttons={[
      { name: "Custom Button 1", link: "#" },
      { name: "Custom Button 2", link: "#" },
    ]}
  />
);
