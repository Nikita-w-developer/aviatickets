import React from "react";
import styles from "./sort.module.scss";
import { toggleActive } from "../../redux/Slices/sortSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  const sortType = ["ДЕШЕВЛЕ", "БЫСТРЕЕ"];
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useDispatch();
  const onToggleActive = (index) => {
    if (activeIndex !== index) {
      dispatch(toggleActive());
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.wrapper}>
      {sortType.map((el, i) => (
        <div
          onClick={() => onToggleActive(i)}
          className={activeIndex === i ? styles.active : styles.sortBy}
        >
          {el}
        </div>
      ))}
    </div>
  );
};

export default Index;
