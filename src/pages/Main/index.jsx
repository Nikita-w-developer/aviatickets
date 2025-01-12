import React from "react";
import "../../variables/container.scss";
import styles from "./main.module.scss";
import Filter from "../../components/Filter";
import Ticket from "../../components/Ticket";
import Sort from "../../components/Sort";

import { useGetFlightOffersQuery } from "../../redux/Slices/apiSlice";
import { useSelector } from "react-redux";

const Index = () => {
  const { data, error, isLoading } = useGetFlightOffersQuery({
    originLocationCode: "NYC",
    destinationLocationCode: "CAN",
    departureDate: "2025-01-15",
    adults: 1,
  });

  const { coast, speed } = useSelector((state) => state.sortReducer);

  const parseDuration = (duration) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const [, hours = 0, minutes = 0] = duration.match(regex) || [];
    return (parseInt(hours, 10) || 0) * 60 + (parseInt(minutes, 10) || 0);
  };

  const sortFlightsByDuration = (flights) => {
    return [...flights].sort((a, b) => {
      const durationA = parseDuration(
        a.itineraries?.[0]?.segments?.[0]?.duration || "PT0M"
      );
      const durationB = parseDuration(
        b.itineraries?.[0]?.segments?.[0]?.duration || "PT0M"
      );
      return durationA - durationB;
    });
  };
  const coastFlights = data?.data ? data?.data : [];
  console.log(coastFlights);

  const sortedFlights = data?.data
    ? sortFlightsByDuration(
        data.data.filter((flight) => flight.itineraries?.[0]?.segments?.[0])
      )
    : [];
  console.log(sortedFlights);
  console.log(coast);

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
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading data</p>}
          {coast &&
            coastFlights.map((flight) => (
              <Ticket
                key={flight.id}
                price={flight.price?.total}
                arrival={flight.itineraries?.[0]?.segments?.[0]?.arrival}
                departure={flight.itineraries?.[0]?.segments?.[0]?.departure}
                stop={flight.itineraries?.[0]?.segments?.[0]?.numberOfStops}
                airlines={
                  flight.itineraries?.[0]?.segments?.[0]?.operating?.carrierCode
                }
                duration={flight.itineraries?.[0]?.segments?.[0]?.duration}
                transfer={
                  flight.itineraries?.[0]?.segments?.[0]?.stops?.[0]?.iataCode
                }
              />
            ))}
          {speed &&
            sortedFlights.map((flight) => (
              <Ticket
                key={flight.id}
                price={flight.price?.total}
                arrival={flight.itineraries?.[0]?.segments?.[0]?.arrival}
                departure={flight.itineraries?.[0]?.segments?.[0]?.departure}
                stop={flight.itineraries?.[0]?.segments?.[0]?.numberOfStops}
                airlines={
                  flight.itineraries?.[0]?.segments?.[0]?.operating?.carrierCode
                }
                duration={flight.itineraries?.[0]?.segments?.[0]?.duration}
                transfer={
                  flight.itineraries?.[0]?.segments?.[0]?.stops?.[0]?.iataCode
                }
              />
            ))}
          {/* {coast &&
            coastFlights.map((flight) => {
              <Ticket
                key={flight.id}
                price={flight.price?.total}
                arrival={flight.itineraries?.[0]?.segments?.[0]?.arrival}
                departure={flight.itineraries?.[0]?.segments?.[0]?.departure}
                stop={flight.itineraries?.[0]?.segments?.[0]?.numberOfStops}
                airlines={
                  flight.itineraries?.[0]?.segments?.[0]?.operating?.carrierCode
                }
                duration={flight.itineraries?.[0]?.segments?.[0]?.duration}
                transfer={
                  flight.itineraries?.[0]?.segments?.[0]?.stops?.[0]?.iataCode
                }
              />;
            })} */}

          {/* {sortedFlights.length > 0
            ? sortedFlights.map((flight) => (
                <Ticket
                  key={flight.id}
                  price={flight.price?.total}
                  arrival={flight.itineraries?.[0]?.segments?.[0]?.arrival}
                  departure={flight.itineraries?.[0]?.segments?.[0]?.departure}
                  stop={flight.itineraries?.[0]?.segments?.[0]?.numberOfStops}
                  airlines={
                    flight.itineraries?.[0]?.segments?.[0]?.operating
                      ?.carrierCode
                  }
                  duration={flight.itineraries?.[0]?.segments?.[0]?.duration}
                  transfer={
                    flight.itineraries?.[0]?.segments?.[0]?.stops?.[0]?.iataCode
                  }
                />
              ))
            : !isLoading && <p>No flights available</p>} */}
        </div>
      </section>
    </div>
  );
};

export default Index;
