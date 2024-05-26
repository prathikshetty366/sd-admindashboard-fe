import React from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ options, name }) => {
  return (
    <select className={styles.dropdown} name={name}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
