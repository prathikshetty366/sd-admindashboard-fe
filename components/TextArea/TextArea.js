// components/TextArea.js

import React from "react";

const TextArea = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        rows="4"
      />
    </div>
  );
};

export default TextArea;
