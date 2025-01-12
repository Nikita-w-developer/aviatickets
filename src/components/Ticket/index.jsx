import React from "react";
import styles from "./ticket.module.scss";

const Index = ({
  price,
  arrival,
  departure,
  transfer,
  airlines,
  duration,
  stop,
  id,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.price}>Цена: {price}€</div>
        <div className={styles.company}>Авиакомпания {airlines}</div>
      </div>
      <div className={styles.detail}>
        <p>
          {departure.iataCode} - {arrival.iataCode}
        </p>
        <p>В ПУТИ</p>
        <p>{stop === 0 ? "БЕЗ ПЕРЕСАДОК" : `${stop} ПЕРЕСАДКА`}</p>
        <p>
          {departure.at.substring(11, 16)} - {arrival.at.substring(11, 16)}
        </p>
        <p>
          {duration.substring(2).replace("H", " часов ").replace("M", " минут")}
        </p>
        <p>{transfer ? transfer[0].iataCode : "Прямой рейс"}</p>
      </div>
    </div>
  );
};

export default Index;
