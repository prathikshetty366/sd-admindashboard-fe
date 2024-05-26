import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ label, name }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" name={name} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
