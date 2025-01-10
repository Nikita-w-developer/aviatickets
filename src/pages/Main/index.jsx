import React from "react";
import "../../variables/container.scss";
import styles from "./main.module.scss";
import Filter from "../../components/Filter";
import Ticket from "../../components/Ticket";
import Sort from "../../components/Sort";

const index = () => {
  return (
    <div className="container">
      <section className={styles.logo}>
        <img src="img/planelogo.png" alt="logo" />
        <h1>Air Tickets</h1>
      </section>
      <section className={styles.wrapper}>
        <Filter />
        <div>
          <Sort />
          <Ticket />
        </div>
      </section>
    </div>
  );
};

export default index;
