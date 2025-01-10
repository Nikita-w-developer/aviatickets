import React from "react";
import styles from "./filter.module.scss";

const Index = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <input type="checkbox" id="filter1" name="filter1"></input>
        <label htmlFor="filter1">БЕЗ ПЕРЕСАДОК</label>
      </div>

      <div className={styles.filter}>
        <input type="checkbox" id="filter2" name="filter2"></input>
        <label htmlFor="filter2">С 1 ПЕРЕСАДКОЙ</label>
      </div>

      <div className={styles.filter}>
        <input type="checkbox" id="filter3" name="filter3"></input>
        <label htmlFor="filter3">БОЛЕЕ 1 ПЕРЕСАДКИ</label>
      </div>
    </div>
  );
};

export default Index;
