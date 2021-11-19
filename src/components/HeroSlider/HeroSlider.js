import React from "react";

// Style & Images \\
import styles from "./HeroSlider.module.scss";
import { backdrop_img } from "../../config/config";

// Custom Hooks \\
import { useFetch } from "../../hooks/useFetch";
import { useHeroSliderSettings } from "../../hooks/useHeroSliderSettings";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const HeroSlider = ({ url }) => {
  // Fetching Contents For Slider \\
  const { content } = useFetch(url);

  // Hero Slider Settings \\
  const settings = useHeroSliderSettings();

  // JSX \\
  return (
    <Splide options={{ ...settings }}>
      {content &&
        content.slice(1, 5).map((data, i) => (
          <SplideSlide key={i}>
            <div className={styles.slider_container}>
              <img
                src={`${backdrop_img}/${data.backdrop_path}`}
                alt={data.title || data.name}
                className={styles.slider_container_img}
              />
            </div>
          </SplideSlide>
        ))}
    </Splide>
  );
};

export default HeroSlider;
