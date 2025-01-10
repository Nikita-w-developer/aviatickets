import React from "react";
import "../../variables/container.scss";
import styles from "./main.module.scss";
import Filter from "../../components/Filter";
import Ticket from "../../components/Ticket";
import Sort from "../../components/Sort";

import { useGetFlightOffersQuery } from "../../redux/Slices/apiSlice";

const Index = () => {
  const { data, error, isLoading } = useGetFlightOffersQuery({
    originLocationCode: "NYC",
    destinationLocationCode: "CAN",
    departureDate: "2025-01-15",
    adults: 1,
  });
  if (data) {
    console.log(data.data);
  }

  return (
    <div className="container">
      <section className={styles.logo}>
        <img src="img/planelogo.png" alt="logo" />
        <h1>Air Tickets</h1>
      </section>
      <section className={styles.wrapper}>
        <Filter />
        <div className={styles.ticket_part}>
          <Sort />
          {data
            ? data?.data?.map((obj, i) => (
                <Ticket
                  key={i}
                  price={data?.data[i]?.price.total}
                  arrival={data?.data[i]?.itineraries[0].segments[0].arrival}
                  departure={
                    data?.data[i]?.itineraries[0].segments[0].departure
                  }
                  stop={data?.data[i]?.itineraries[0].segments[0].numberOfStops}
                  airlines={
                    data?.data[i]?.itineraries[0].segments[0].operating
                      ?.carrierCode
                  }
                  duration={data?.data[i]?.itineraries[0].segments[0].duration}
                  transfer={data?.data[i]?.itineraries[0]?.segments[0]?.stops}
                />
              ))
            : isLoading || error}
        </div>
      </section>
    </div>
  );
};

export default Index;
