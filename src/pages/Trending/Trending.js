import React, { useState, useEffect } from "react";
import styles from "./Trending.module.scss";
import ContentBox from "../../components/ContentBox/ContentBox";
import axios from "axios";

const Trending = () => {
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_TRENDING_URL}api_key=${process.env.REACT_APP_API_KEY}`
    );

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <main className={styles.trending}>
      <h1 className="page-title">TRENDING TODAY</h1>

      <div className={styles.trending__contents}>
        {content &&
          content.map((movie) => (
            <ContentBox
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              type={movie.media_type}
              date={movie.first_air_date || movie.release_date}
              rating={movie.vote_average}
            />
          ))}
      </div>
    </main>
  );
};

export default Trending;
