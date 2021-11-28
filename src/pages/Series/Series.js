import React, { useState } from "react";

// Style \\
import styles from "./Series.module.scss";

// Custom Hooks \\
import { useFetchContent } from "../../hooks/useFetchContent";
import { useGenres } from "../../hooks/useGenres";

// Components \\
import Genres from "../../components/Genres/Genres";
import ContentBoxContainer from "../../components/ContentBoxContainer/ContentBoxContainer";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";

const Series = () => {
  // Genres State \\
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // genreURL Will Be IDs Of Selected-Genres Like This '28,12,16,35' \\
  const genreURL = useGenres(selectedGenres);

  // Active Page State \\
  const [page, setPage] = useState(1);

  // Fetching TV-Series Contents With Custom Hook 'useFetchContent' \\
  const { content, numOfPagesAvailable, isPending, error } = useFetchContent(
    `${process.env.REACT_APP_SERIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
  );

  // JSX \\
  return (
    <main className={styles.series}>
      <h1 className="page-title">DISCOVER SERIES</h1>

      {!error && (
        <Genres
          type="tv"
          genres={genres}
          setGenres={setGenres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          setPage={setPage}
        />
      )}

      {isPending && <div className="loading"></div>}

      {error && <div className="error">{error}</div>}

      {!isPending &&
        !error &&
        content &&
        content.length === 0 &&
        selectedGenres.length > 0 && (
          <p className={styles.no_results}>
            No series found with your selected genres
          </p>
        )}

      <ContentBoxContainer>
        {!isPending &&
          !error &&
          content &&
          content.map((series) => (
            <ContentBox
              key={series.id}
              id={series.id}
              poster={series.poster_path}
              title={series.title || series.name}
              type="tv"
              date={series.first_air_date || series.release_date}
              rating={series.vote_average}
            />
          ))}
      </ContentBoxContainer>

      {!error && content && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Series;
