import React from "react";
import styles from "./RadioButton.module.scss";

const RadioButton = ({ label, name, value }) => {
  return (
    <label className={styles.radio}>
      <input type="radio" name={name} value={value} />
      <span className={styles.radiomark}></span>
      {label}
    </label>
  );
};

export default RadioButton;
