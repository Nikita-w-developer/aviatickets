import React from "react";
import styles from "./sort.module.scss";

const index = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.active}>По возрастанию цены</div>
      <div className={styles.sortBy}>По убыванию цены</div>
    </div>
  );
};

export default index;
