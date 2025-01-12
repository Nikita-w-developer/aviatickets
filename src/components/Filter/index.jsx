import React from "react";
import styles from "./filter.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setStopsFilter } from "../../redux/Slices/filterSlice";
import { setValue } from "../../redux/Slices/searchSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { stops } = useSelector((state) => state.filterReducer);
  const searchValue = useSelector((state) => state.serachReducer);

  const onToggleFilter = (value) => {
    if (stops === value) {
      dispatch(setStopsFilter(null));
    } else {
      dispatch(setStopsFilter(value));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filter}>
        <input
          type="checkbox"
          id="filter1"
          name="filter1"
          checked={stops === 0}
          onChange={() => onToggleFilter(0)}
        />
        <label htmlFor="filter1">БЕЗ ПЕРЕСАДОК</label>
      </div>

      <div className={styles.filter}>
        <input
          type="checkbox"
          id="filter2"
          name="filter2"
          checked={stops === 1}
          onChange={() => onToggleFilter(1)}
        />
        <label htmlFor="filter2">С 1 ПЕРЕСАДКОЙ</label>
      </div>

      <div className={styles.filter}>
        <input
          type="checkbox"
          id="filter3"
          name="filter3"
          checked={stops >= 2}
          onChange={() => onToggleFilter(2)}
        />
        <label htmlFor="filter3">БОЛЕЕ 1 ПЕРЕСАДКИ</label>
      </div>
      <div className={styles.search}>
        <input
          value={searchValue}
          onChange={(event) => dispatch(setValue(event.target.value))}
          className={styles.text}
          placeholder="Поиск по авиакомпании или городу..."
        />
      </div>
    </div>
  );
};

export default Index;
