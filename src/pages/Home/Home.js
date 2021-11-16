import React from "react";

// Style \\
import styles from "./Home.module.scss";

// Components \\
import HeroSlider from "../../components/HeroSlider/HeroSlider";

const Home = () => {
  // JSX \\
  return (
    <React.Fragment>
      <HeroSlider />
      <main className={styles.home}></main>
    </React.Fragment>
  );
};

export default Home;
