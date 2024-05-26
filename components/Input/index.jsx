import React from "react";
import styles from "./Input.module.scss";

const Input = ({ type, name, placeholder }) => {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
