import React from "react";
import "../../variables/container.scss";
import styles from "./main.module.scss";
import Filter from "../../components/Filter";
import Ticket from "../../components/Ticket";
import Sort from "../../components/Sort";
import Skeleton from "../../components/Skeleton";
import { useGetFlightOffersQuery } from "../../redux/Slices/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setProps } from "../../redux/Slices/propsSlice";

const Main = () => {
  const { data, error, isLoading } = useGetFlightOffersQuery({
    originLocationCode: "NYC",
    destinationLocationCode: "CAN",
    departureDate: "2025-01-15",
    adults: 1,
  });

  const dispatch = useDispatch();
  const { coast, speed } = useSelector((state) => state.sortReducer);
  const { stops } = useSelector((state) => state.filterReducer);

  const filterByStops = (flights) => {
    return flights.filter((flight) => {
      const stopCount =
        flight.itineraries?.[0]?.segments?.[0]?.numberOfStops || 0;
      if (stops === 0) return stopCount === 0;
      if (stops === 1) return stopCount === 1;
      if (stops >= 2) return stopCount > 1;
      return true;
    });
  };

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

  const getFlights = () => {
    if (!data?.data) return [];
    let flights = filterByStops(data.data);
    if (speed) flights = sortFlightsByDuration(flights);
    return flights;
  };

  const coastFlights = data?.data ? filterByStops(data.data) : [];
  const flights = getFlights();

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
          {isLoading && [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
          {error && <p>Error loading data</p>}
          {coast &&
            coastFlights.map((flight) => (
              <Link
                to={`/info/${flight.id}`}
                className="custom-link"
                onClick={() => dispatch(setProps(flight))}
              >
                <Ticket
                  key={flight.id}
                  id={flight.id}
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
              </Link>
            ))}
          {speed &&
            flights.map((flight) => (
              <Link
                to={`/info/${flight.id}`}
                className="custom-link"
                onClick={() => dispatch(setProps(flight))}
              >
                <Ticket
                  key={flight.id}
                  id={flight.id}
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
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
