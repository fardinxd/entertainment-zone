import React from "react";

// Style \\
import styles from "./Home.module.scss";

// Components \\
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ContentListSlider from "../../components/ContentListSlider/ContentListSlider";

// Slider Data \\
import { heroSliderUrl } from "./HomeSlidersData";
import { contentListSliderData } from "./HomeSlidersData";

const Home = () => {
  // JSX \\
  return (
    <main className={styles.home}>
      <HeroSlider url={heroSliderUrl} />

      {contentListSliderData.map((data) => (
        <ContentListSlider
          key={data.id}
          url={data.url}
          path={data.path}
          heading={data.heading}
        />
      ))}
    </main>
  );
};

export default Home;
