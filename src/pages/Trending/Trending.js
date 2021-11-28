import React, { useState } from "react";

// Style \\
import styles from "./Trending.module.scss";

// Custom Hook \\
import { useFetchContent } from "../../hooks/useFetchContent";

// Components \\
import ContentBoxContainer from "../../components/ContentBoxContainer/ContentBoxContainer";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";

const Trending = () => {
  // Active Page State \\
  const [page, setPage] = useState(1);

  // Fetching Trending Contents With Custom Hook 'useFetchContent' \\
  const { content, numOfPagesAvailable, isPending, error } = useFetchContent(
    `${process.env.REACT_APP_TRENDING_URL}api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
  );

  // JSX \\
  return (
    <main className={styles.trending}>
      <h1 className="page-title">TRENDING TODAY</h1>

      {isPending && <div className="loading"></div>}

      {error && <div className="error">{error}</div>}

      <ContentBoxContainer>
        {!isPending &&
          !error &&
          content &&
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
      </ContentBoxContainer>

      {!error && content && numOfPagesAvailable > 1 && (
        <Pagination setPage={setPage} />
      )}
    </main>
  );
};

export default Trending;
