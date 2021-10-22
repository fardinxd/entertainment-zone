import React, { useState, useEffect } from "react";
import styles from "./Footer.module.scss";
import { ImFire as TrendingIcon } from "react-icons/im";
import { MdMovie as MoviesIcon } from "react-icons/md";
import { FiMonitor as TvIcon } from "react-icons/fi";
import { BiSearch as SearchIcon } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  const [activePage, setActivePage] = useState(history.location.pathname);

  useEffect(() => {
    history.listen((location) => {
      setActivePage(location.pathname);
    });
  }, [history]);

  const activate = (pathname) => {
    if (activePage === pathname) return styles.active;
    else return "";
  };

  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__list}>
        <Link
          to="/trending"
          className={`${styles.footer__listItem} ${activate("/trending")}`}
        >
          <div className={styles.icon}>
            <TrendingIcon />
          </div>
          <div className={styles.title}>Trending</div>
        </Link>

        <Link
          to="/movies"
          className={`${styles.footer__listItem} ${activate("/movies")}`}
        >
          <div className={styles.icon}>
            <MoviesIcon />
          </div>
          <div className={styles.title}>Movies</div>
        </Link>

        <Link
          to="/series"
          className={`${styles.footer__listItem} ${activate("/series")}`}
        >
          <div className={styles.icon}>
            <TvIcon />
          </div>
          <div className={styles.title}>Tv Series</div>
        </Link>

        <Link
          to="/search"
          className={`${styles.footer__listItem} ${activate("/search")}`}
        >
          <div className={styles.icon}>
            <SearchIcon />
          </div>
          <div className={styles.title}>Search</div>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
