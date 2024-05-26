import React from "react";
import styles from "./Card.module.scss";

const Card = ({ title, subtitle, handleStatusSelection }) => {
  return (
    <>
      <div className={styles.card} onClick={handleStatusSelection}>
        <h5 className={styles.titletext}>{title}</h5>
        <h3 className={styles.subtitletext}>{subtitle}</h3>
      </div>
    </>
  );
};

export default Card;
