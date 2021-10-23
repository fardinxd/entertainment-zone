import React, { useState, useEffect } from "react";
import styles from "./Movies.module.scss";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      );

      setContent(data.results);

      setNumOfPagesAvailable(data.total_pages);
    };

    fetchMovies();
  }, [page]);

  return (
    <main className={styles.movies}>
      <h1 className="page-title">DISCOVER MOVIES</h1>

      <div className={styles.moviesList}>
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

      {numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Movies;
