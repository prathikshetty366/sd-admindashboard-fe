import React from "react";

function InputField({
  id,
  label,
  value,
  onChange,
  type,
  placeholder,
  required,
  disabled, // Adding the disabled prop
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm mb-4 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        disabled={disabled} // Apply the disabled prop here
        readOnly={disabled} // Optionally, you can use readOnly for further control
        className={`mt-1 block w-[100%] rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`} // Style when disabled
      />
    </div>
  );
}

export default InputField;
