import React, { useState } from "react";

// Style \\
import styles from "./Movies.module.scss";

// Custom Hooks \\
import { useFetch } from "../../hooks/useFetch";
import { useGenres } from "../../hooks/useGenres";

// Components \\
import Genres from "../../components/Genres/Genres";
import ContentBoxContainer from "../../components/ContentBoxContainer/ContentBoxContainer";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";

const Movies = () => {
  // Genres State \\
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // genreURL Will Be IDs Of Selected-Genres Like This '28,12,16,35' \\
  const genreURL = useGenres(selectedGenres);

  // Active Page State \\
  const [page, setPage] = useState(1);

  // Fetching Movies Contents With Custom Hook 'useFetch' \\
  const { content, numOfPagesAvailable, isPending, error } = useFetch(
    `${process.env.REACT_APP_MOVIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
  );

  // JSX \\
  return (
    <main className={styles.movies}>
      <h1 className="page-title">DISCOVER MOVIES</h1>

      {!error && (
        <Genres
          type="movie"
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
            No movies found with your selected genres
          </p>
        )}

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
              type="movie"
              date={movie.first_air_date || movie.release_date}
              rating={movie.vote_average}
            />
          ))}
      </ContentBoxContainer>

      {!error && content && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Movies;
