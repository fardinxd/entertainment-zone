import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  // JSX \\
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Entertainment Zone
      </Link>
    </header>
  );
};

export default Header;
