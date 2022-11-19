import React from "react";
import styles from "../../styles/Distance.module.css";

const Distance = ({ leg }) => {
  console.log(leg);
  return (
    <p className={styles.info}>
      The distance is{" "}
      <span className={styles.highlight}>{leg.distance.text} </span>
      and the time is{" "}
      <span className={styles.highlight}>{leg.duration.text}</span>
    </p>
  );
};

export default Distance;
