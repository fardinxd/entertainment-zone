import React from "react";
import styles from "./ContentBox.module.scss";
import { img_300, posterUnavailable } from "../../config/config";

const ContentBox = ({ id, poster, title, type, date, rating }) => {
  const contentTitle = title.length > 20 ? `${title.slice(0, 18)}...` : title;

  // JSX \\
  return (
    <div className={styles.content}>
      <img
        src={poster ? `${img_300}/${poster}` : posterUnavailable}
        alt={contentTitle}
        className={styles.content__image}
      />

      <div className={styles.content__title}>{contentTitle}</div>

      <div className={styles.content__info}>
        <span>{type === "tv" ? "TV Series" : "Movie"}</span>
        <span>{date}</span>
      </div>

      <div className={styles.content__rating}>{rating}</div>
    </div>
  );
};

export default ContentBox;
