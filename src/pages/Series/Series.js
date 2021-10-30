import React, { useState, useEffect } from "react";
import styles from "./Series.module.scss";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Series = () => {
  // Genres State \\
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  // genreURL Will Be IDs Of Selected-Genres Like This '28,12,16,35' \\
  const genreURL = useGenres(selectedGenres);

  // TV-Series & Pagination State \\
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();

  // Fetch TV-Series Whenever Page Or GenreURL Changes \\
  useEffect(() => {
    const fetchSeries = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERIES_URL}api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
      );

      setContent(data.results);

      setNumOfPagesAvailable(data.total_pages);
    };

    fetchSeries();
  }, [page, genreURL]);

  // JSX \\
  return (
    <main className={styles.series}>
      <h1 className="page-title">DISCOVER SERIES</h1>

      <Genres
        type="tv"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      <div className={styles.series__list}>
        {content &&
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
      </div>

      {content.length > 0 && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Series;
