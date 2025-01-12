import React from "react";
import styles from "./info.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Form from "../../components/Form";

const Info = () => {
  const { props } = useSelector((state) => state.propsReducer);
  const [isBooked, setIsBooked] = React.useState(false);

  const amenityTranslations = {
    "BAG INCLUDED": "Багаж включен",
    "MEAL SERVICE": "Питание включено",
    "STANDARD SEAT SELECTION": "Выбор стандартного места",
    "CHANGEABLE TICKET": "Изменяемый билет",
    "ONLINE MESSAGE RIGHT": "Право на онлайн-сообщения",
    "FRONT SEAT SELECTION": "Выбор места в передней части салона",
  };

  return (
    <>
      {isBooked ? (
        <Form onClose={() => setIsBooked(false)} />
      ) : (
        <div className="container">
          <h1 className={styles.heading}>Подробная информация о билете</h1>
          <div className={styles.button}>
            <Link to={"/"} className="custom-link">
              <button>Вернуться назад</button>
            </Link>
            <button onClick={() => setIsBooked(!isBooked)}>
              Забронировать билет
            </button>
          </div>
          <div className={styles.ticketWrapper}>
            <h2 className={styles.subHeading}>Основная информация</h2>
            <ul className={styles.detailsList}>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Цена: </span>
                <span className={styles.detailValue}>
                  {props.price?.grandTotal} {props.price?.currency}
                </span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>Количество мест: </span>
                <span className={styles.detailValue}>
                  {props.numberOfBookableSeats}
                </span>
              </li>
              <li className={styles.detailItem}>
                <span className={styles.detailLabel}>
                  Дата последней продажи:{" "}
                </span>
                <span className={styles.detailValue}>
                  {props.lastTicketingDate}
                </span>
              </li>
            </ul>
          </div>

          <div className={styles.detailsWrapper}>
            <h2 className={styles.subHeading}>Маршрут</h2>
            {props.itineraries?.map((itinerary, index) => (
              <div key={index} className={styles.itinerary}>
                <h3 className={styles.itineraryHeading}>Перелет {index + 1}</h3>
                <ul className={styles.detailsList}>
                  {itinerary.segments?.map((segment) => (
                    <li key={segment.id} className={styles.segmentItem}>
                      <span className={styles.detailLabel}>Откуда: </span>
                      <span className={styles.detailValue}>
                        {segment.departure.iataCode} ({segment.departure.at})
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Куда: </span>
                      <span className={styles.detailValue}>
                        {segment.arrival.iataCode} ({segment.arrival.at})
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Авиакомпания: </span>
                      <span className={styles.detailValue}>
                        {segment.carrierCode}
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Время в пути: </span>
                      <span className={styles.detailValue}>
                        {segment.duration}
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Остановки: </span>
                      <span className={styles.detailValue}>
                        {segment.numberOfStops}
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Багаж: </span>
                      <span className={styles.detailValue}>
                        {props.travelerPricings[0]?.fareDetailsBySegment?.find(
                          (seg) => seg.segmentId === segment.id
                        )?.includedCheckedBags?.quantity || 0}{" "}
                        мест
                      </span>
                      <br />
                      <span className={styles.detailLabel}>Тип самолета: </span>
                      <span className={styles.detailValue}>
                        {segment.aircraft?.code}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.servicesWrapper}>
            <h2 className={styles.subHeading}>Услуги</h2>
            <ul className={styles.detailsList}>
              {props.travelerPricings[0]?.fareDetailsBySegment?.flatMap((seg) =>
                seg.amenities?.map((amenity) => (
                  <li key={amenity.description} className={styles.serviceItem}>
                    <span className={styles.detailValue}>
                      {amenityTranslations[amenity.description] ||
                        amenity.description}
                    </span>
                    {amenity.isChargeable && (
                      <span className={styles.chargeable}>
                        {" "}
                        (за дополнительную плату)
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Info;
