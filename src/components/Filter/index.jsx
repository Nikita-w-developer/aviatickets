import React from "react";
import styles from "./filter.module.scss";

const index = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <input type="checkbox" id="filter1" name="filter1"></input>
        <label for="filter1">Option 1</label>
      </div>

      <div className={styles.filter}>
        <input type="checkbox" id="filter2" name="filter2"></input>
        <label for="filter2">Option 2</label>
      </div>

      <div className={styles.filter}>
        <input type="checkbox" id="filter3" name="filter3"></input>
        <label for="filter3">Option 3</label>
      </div>
    </div>
  );
};

export default index;
