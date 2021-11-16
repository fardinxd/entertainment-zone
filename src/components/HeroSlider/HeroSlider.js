import React, { useState, useEffect } from "react";

// Style & ImageURL \\
import styles from "./HeroSlider.module.scss";
import { backdrop_img } from "../../config/config";

// Custom Hook \\
import { useFetch } from "../../hooks/useFetch";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const HeroSlider = () => {
  // Inner Width \\
  const [width, setWidth] = useState(window.innerWidth);

  // Window Resize Handler \\
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slider Gap & Padding \\
  let sliderGap, sliderPadding;
  if (width > 600) sliderGap = "1rem";
  if (width < 600) sliderGap = "0.5rem";
  if (width > 600) sliderPadding = "20%";
  if (width < 600) sliderPadding = "10%";
  if (width < 500) sliderPadding = "5%";

  // Slider Options \\
  const options = {
    pagination: false,
    arrows: width > 600 ? true : false,
    type: "loop",
    rewind: true,
    autoplay: true,
    interval: 2500,
    gap: sliderGap,
    padding: sliderPadding,
  };

  // Fetching Contents For Slider With Custom Hook 'useFetch' \\
  const { content } = useFetch(
    `${process.env.REACT_APP_SEARCH_URL}movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=wwe&page=1`
  );

  // JSX \\
  return (
    <Splide options={{ ...options }}>
      {content &&
        content.slice(0, 5).map((data, i) => (
          <SplideSlide key={i} style={{ marginTop: "10px" }}>
            <img
              src={`${backdrop_img}/${data.backdrop_path}`}
              alt={data.title || data.name}
              className={styles.slider_img}
            />
          </SplideSlide>
        ))}
    </Splide>
  );
};

export default HeroSlider;
