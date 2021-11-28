import React, { useContext } from "react";

// Style & Images \\
import styles from "./ContentBox.module.scss";
import { img_300, posterUnavailable } from "../../config/config";

// Contexts \\
import { ContentDetailsContext } from "../../context/ContentDetailsProvider";

const ContentBox = ({ id, poster, title, type, date, rating }) => {
  // Shortening Content Title \\
  const contentTitle = title.length > 20 ? `${title.slice(0, 18)}...` : title;

  // Contexts \\
  const { setShowContentModal, setContentID, setContentType } = useContext(
    ContentDetailsContext
  );

  // On Content Click \\
  const contentHandler = () => {
    setContentID(id);
    setContentType(type);
    setShowContentModal(true);
  };

  // JSX \\
  return (
    <div className={styles.content} onClick={contentHandler}>
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
