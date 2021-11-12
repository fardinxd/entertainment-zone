import React from "react";
import { Link } from "react-router-dom";

// Style \\
import styles from "./Header.module.scss";

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
