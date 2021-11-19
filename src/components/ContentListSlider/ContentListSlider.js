import React from "react";
import { Link } from "react-router-dom";

// Style & Images \\
import styles from "./ContentListSlider.module.scss";
import { AiOutlineRight } from "react-icons/ai";
import { img_500 } from "../../config/config";

// Custom Hooks \\
import { useFetch } from "../../hooks/useFetch";
import { useContentListSliderSettings } from "../../hooks/useContentListSliderSettings";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const ContentListSlider = ({ url, path, heading }) => {
  // Fetching Contents For Slider \\
  const { content } = useFetch(url);

  // Content List Slider Settings \\
  const settings = useContentListSliderSettings();

  // JSX \\
  return (
    <div className={styles.content_list}>
      {content && (
        <Link to={path}>
          {heading} <AiOutlineRight />
        </Link>
      )}

      <Splide options={{ ...settings }}>
        {content &&
          content.map((data, i) => (
            <SplideSlide key={i}>
              <img
                src={`${img_500}/${data.poster_path}`}
                alt={data.title || data.name}
                className={styles.content_list_img}
              />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default ContentListSlider;
