import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, name, placeholder, handleChange }) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
