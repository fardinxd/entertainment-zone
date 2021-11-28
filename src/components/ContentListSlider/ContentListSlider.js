import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Style & Images \\
import styles from "./ContentListSlider.module.scss";
import { AiOutlineRight } from "react-icons/ai";
import { img_500 } from "../../config/config";

// Contexts \\
import { ContentDetailsContext } from "../../context/ContentDetailsProvider";

// Custom Hooks \\
import { useFetchContent } from "../../hooks/useFetchContent";
import { useContentListSliderSettings } from "../../hooks/useContentListSliderSettings";

// Splide Slider Library \\
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const ContentListSlider = ({ url, path, heading }) => {
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
                onClick={() => contentHandler(data)}
              />
            </SplideSlide>
          ))}
      </Splide>
    </div>
  );
};

export default ContentListSlider;
