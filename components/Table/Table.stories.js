// /components/Table/Table.stories.js

import React from "react";
import Table from "./Table";
import { sampleData, headers, filters } from "./data";

// Default Story
export default {
  title: "Components/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  headers: headers,
  data: sampleData,
  filters: filters,
};
