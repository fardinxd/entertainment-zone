import React from "react";
import styles from "./ContentBoxContainer.module.scss";

const ContentBoxContainer = ({ children }) => {
  return <div className={styles.content_container}>{children}</div>;
};

export default ContentBoxContainer;
