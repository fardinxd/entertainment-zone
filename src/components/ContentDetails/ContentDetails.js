import React from "react";

// Style & Images \\
import styles from "./ContentDetails.module.scss";
import { img_500, backdrop_img, posterUnavailable } from "../../config/config";

// Custom Hook \\
import { useFetchContentDetails } from "../../hooks/useFetchContentDetails";

// Components \\
import ContentDetailsModal from "./ContentDetailsModal";
import ContentDetailsCastSlider from "./ContentDetailsCastSlider";

const ContentDetails = () => {
  // Content Details \\
  const {
    backdropPath,
    posterPath,
    title,
    tagline,
    genres,
    languages,
    releaseDate,
    overview,
    castDetails,
    trailerUrl,
  } = useFetchContentDetails();

  // JSX \\
  return (
    <ContentDetailsModal>
      <div className={styles.details}>
        {backdropPath && (
          <img
            src={`${backdrop_img}/${backdropPath}`}
            alt={title}
            className={styles.details_backdrop}
          />
        )}

        <div className={styles.details_container}>
          <div className={styles.details_poster}>
            <img
              src={posterPath ? `${img_500}/${posterPath}` : posterUnavailable}
              alt={title}
            />
          </div>

          <div className={styles.details_information}>
            <div className={styles.title_tagline}>
              <h2 className={styles.title}>{title}</h2>
              {tagline && <p className={styles.tagline}>{tagline}</p>}
            </div>

            <div className={styles.genre_language_release}>
              <div className={styles.genre}>
                {genres &&
                  genres.map((genre, i) => <span key={i}>{genre}</span>)}
              </div>
              <div className={styles.language}>
                {languages &&
                  languages.map((language, i) => (
                    <span key={i}>{language}</span>
                  ))}
              </div>
              <div className={styles.release}>{releaseDate}</div>
            </div>

            {overview && (
              <p className={styles.overview}>
                {overview.length > 100
                  ? `${overview.slice(0, 300)}...`
                  : overview}
              </p>
            )}

            <ContentDetailsCastSlider castDetails={castDetails} />

            {trailerUrl && (
              <a
                href={`https://www.youtube.com/watch?v=${trailerUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.trailer}
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </ContentDetailsModal>
  );
};

export default ContentDetails;
