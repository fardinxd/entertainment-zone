import React, { useState, useEffect } from "react";
import styles from "./Trending.module.scss";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Trending = () => {
  // Trending Contents & Pagination State \\
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();

  // Fetch Trending Contents \\
  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TRENDING_URL}api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );

      setContent(data.results);

      setNumOfPagesAvailable(data.total_pages);
    };

    fetchTrending();
  }, [page]);

  // JSX \\
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

      {numOfPagesAvailable > 1 && <Pagination setPage={setPage} />}
    </main>
  );
};

export default Trending;
