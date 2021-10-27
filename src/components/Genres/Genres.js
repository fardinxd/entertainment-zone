import React, { useEffect } from "react";
import styles from "./Genres.module.scss";
import axios from "axios";

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
}) => {
  // On Select Genre \\
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((existingGenre) => existingGenre.id !== genre.id));
  };

  // On Remove Genre \\
  const onRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((existingGenre) => existingGenre.id !== genre.id)
    );
    setGenres([...genres, genre]);
  };

  // Fetch Genres \\
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_GENRES_URL}/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setGenres(data.genres);
    };

    fetchGenres();
  }, [type, setGenres]);

  // JSX \\
  const showGenres = genres.length > 0 || selectedGenres.length > 0;

  if (showGenres)
    return (
      <ul className={styles.genres}>
        {selectedGenres.map((selectedGenre) => (
          <li // Selected Genres LIST \\
            className={`${styles.genres__name} ${styles.active}`}
            key={selectedGenre.id}
            onClick={() => onRemove(selectedGenre)}
          >
            {selectedGenre.name}
          </li>
        ))}

        {genres.map((genre) => (
          <li // Available Genres LIST \\
            className={styles.genres__name}
            key={genre.id}
            onClick={() => handleAdd(genre)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );

  return "";
};

export default Genres;
