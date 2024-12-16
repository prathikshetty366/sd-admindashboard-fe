// src/components/CommandPalette/CommandPalette.stories.js

import React, { useState } from "react";
import CommandPalette from "./CommandPalette"; // Import the CommandPalette component

export default {
  title: "Components/CommandPalette", // The name of the component in the Storybook UI
  component: CommandPalette,
};

// A basic template to render the CommandPalette component with props
const Template = (args) => {
  const [rawQuery, setRawQuery] = useState(args.rawQuery || "");

  return (
    <div style={{ margin: "20px" }}>
      <CommandPalette {...args} rawQuery={rawQuery} setRawQuery={setRawQuery} />
    </div>
  );
};

// Story 1: Open with no query
export const OpenWithNoQuery = Template.bind({});
OpenWithNoQuery.args = {
  rawQuery: "", // Default empty query
};

// Story 2: Open with a query that matches some data (e.g., "Order")
export const OpenWithQuery = Template.bind({});
OpenWithQuery.args = {
  rawQuery: "Order", // A search query that matches items like "Order"
};

// Story 3: No results found for the given query
export const NoResultsFound = Template.bind({});
NoResultsFound.args = {
  rawQuery: "NonExistentSearchTerm", // A query that matches no results
};

// Story 4: Display the help screen when the query is "?"
export const EmptyStateHelp = Template.bind({});
EmptyStateHelp.args = {
  rawQuery: "?", // Display the help screen
};
