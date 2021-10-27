import React, { useState, useEffect } from "react";
import styles from "./Movies.module.scss";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Movies = () => {
  // Genres State \\
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // genreURL Will Be IDs Of Selected-Genres Like This '28,12,16,35' \\
  const genreURL = useGenres(selectedGenres);

  // Movies & Pagination State \\
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();

  // Fetch Movies Whenever Page Or GenreURL Changes \\
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
      );

      setContent(data.results);

      setNumOfPagesAvailable(data.total_pages);
    };

    fetchMovies();
  }, [page, genreURL]);

  // JSX \\
  return (
    <main className={styles.movies}>
      <h1 className="page-title">DISCOVER MOVIES</h1>

      <Genres
        type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <div className={styles.movies__list}>
        {content &&
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
      </div>

      {content.length > 0 && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Movies;
