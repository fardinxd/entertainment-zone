import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// Style \\
import styles from "./Footer.module.scss";

// Icons \\
import { ImFire as TrendingIcon } from "react-icons/im";
import { MdMovie as MoviesIcon } from "react-icons/md";
import { FiMonitor as TvIcon } from "react-icons/fi";
import { BiSearch as SearchIcon } from "react-icons/bi";

const Footer = () => {
  const history = useHistory();

  const [activePage, setActivePage] = useState(history.location.pathname);

  useEffect(() => {
    history.listen((location) => {
      setActivePage(location.pathname);
    });
  }, [history]);

  const activate = (pathname) => (activePage === pathname ? styles.active : "");

  // JSX \\
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer_list}>
        <li>
          <Link
            to="/trending"
            className={`${styles.footer_list_item} ${activate("/trending")}`}
          >
            <div className={styles.icon}>
              <TrendingIcon />
            </div>
            <div className={styles.title}>Trending</div>
          </Link>
        </li>

        <li>
          <Link
            to="/movies"
            className={`${styles.footer_list_item} ${activate("/movies")}`}
          >
            <div className={styles.icon}>
              <MoviesIcon />
            </div>
            <div className={styles.title}>Movies</div>
          </Link>
        </li>

        <li>
          <Link
            to="/series"
            className={`${styles.footer_list_item} ${activate("/series")}`}
          >
            <div className={styles.icon}>
              <TvIcon />
            </div>
            <div className={styles.title}>Tv Series</div>
          </Link>
        </li>

        <li>
          <Link
            to="/search"
            className={`${styles.footer_list_item} ${activate("/search")}`}
          >
            <div className={styles.icon}>
              <SearchIcon />
            </div>
            <div className={styles.title}>Search</div>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
