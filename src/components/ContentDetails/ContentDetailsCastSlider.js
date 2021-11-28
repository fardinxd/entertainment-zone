import React from "react";

// Style & Images \\
import styles from "./ContentDetailsCastSlider.module.scss";
import { img_500, posterUnavailable } from "../../config/config";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const ContentDetailsCastSlider = ({ castDetails }) => {
  // Slider Settings \\
  const settings = {
    pagination: false,
    arrows: false,
    fixedWidth: "6rem",
    gap: "6px",
  };

  // JSX \\
  return (
    <Splide options={{ ...settings }}>
      {castDetails &&
        castDetails.map((data, i) => (
          <SplideSlide key={i}>
            <img
              src={
                data.profile_path
                  ? `${img_500}/${data.profile_path}`
                  : posterUnavailable
              }
              alt={data.title || data.name}
              className={styles.cast_photo}
            />

            <p className={styles.cast_name}>{data.name}</p>
          </SplideSlide>
        ))}
    </Splide>
  );
};

export default ContentDetailsCastSlider;
