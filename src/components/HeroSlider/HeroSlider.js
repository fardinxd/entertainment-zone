import React, { useContext } from "react";

// Contexts \\
import { ContentDetailsContext } from "../../context/ContentDetailsProvider";

// Style & Images \\
import styles from "./HeroSlider.module.scss";
import { backdrop_img } from "../../config/config";

// Custom Hooks \\
import { useFetchContent } from "../../hooks/useFetchContent";
import { useHeroSliderSettings } from "../../hooks/useHeroSliderSettings";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const HeroSlider = ({ url }) => {
  // Contexts \\
  const { setShowContentModal, setContentID, setContentType } = useContext(
    ContentDetailsContext
  );

  // On Content Click \\
  const contentHandler = (data) => {
    setContentID(data.id);
    setContentType(
      data.media_type ? data.media_type : data.first_air_date ? "tv" : "movie"
    );
    setShowContentModal(true);
  };

  // Fetching Contents For Slider \\
  const { content } = useFetchContent(url);

  // Hero Slider Settings \\
  const settings = useHeroSliderSettings();

  // JSX \\
  return (
    <Splide options={{ ...settings }}>
      {content &&
        content
          .filter((con) => con.backdrop_path !== null)
          .slice(0, 5)
          .map((data, i) => (
            <SplideSlide key={i}>
              <div
                className={styles.slider_container}
                onClick={() => contentHandler(data)}
              >
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
