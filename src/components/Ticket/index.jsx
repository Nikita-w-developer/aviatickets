import React from "react";
import styles from "./ticket.module.scss";

const index = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.price}>10$</div>
        <div className={styles.company}>s7</div>
      </div>
      <div className={styles.detail}>some detail</div>
    </div>
  );
};

export default index;
