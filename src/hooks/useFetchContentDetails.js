import { useContext, useState, useEffect } from "react";

// Contexts \\
import { ContentDetailsContext } from "../context/ContentDetailsProvider";

export const useFetchContentDetails = () => {
  // States \\
  const [contentDetails, setContentDetails] = useState(null);
  const [castDetails, setCastDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  // Contexts \\
  const { showContentModal, contentID, contentType } = useContext(
    ContentDetailsContext
  );

  // Fetching Content Details Whenever User Click On Any Movie Or TV-Series \\
  useEffect(() => {
    if (!showContentModal) return;

    // Fetching Content Details \\
    const fetchContentDetails = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_TMDB_URL}/${contentType}/${contentID}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setContentDetails(data);
    };
    fetchContentDetails();

    // Fetching Content Cast Details \\
    const fetchCastDetails = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_TMDB_URL}/${contentType}/${contentID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const { cast } = await res.json();
      setCastDetails(cast);
    };
    fetchCastDetails();

    // Fetching Content Trailer URL \\
    const fetchTrailerUrl = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_TMDB_URL}/${contentType}/${contentID}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      const { results } = await res.json();
      setTrailerUrl(results[0]?.key);
    };
    fetchTrailerUrl();

    // Cleanup Function \\
    return () => {
      setContentDetails(null);
      setCastDetails(null);
      setTrailerUrl(null);
    };
  }, [contentID, contentType, showContentModal]);

  // Returning Content Details Object \\
  return {
    backdropPath: contentDetails && contentDetails.backdrop_path,

    posterPath: contentDetails && contentDetails.poster_path,

    title: contentDetails && `${contentDetails.title || contentDetails.name}`,

    tagline: contentDetails && contentDetails.tagline,

    genres: contentDetails && contentDetails.genres.map((genre) => genre.name),

    languages:
      contentDetails && contentDetails.spoken_languages[0]
        ? contentDetails.spoken_languages.map((lang) => lang.english_name)
        : [""],

    releaseDate:
      contentDetails && contentDetails.release_date
        ? contentDetails.release_date
        : contentDetails &&
          contentDetails.first_air_date &&
          contentDetails.last_air_date
        ? `${contentDetails.first_air_date} - ${contentDetails.last_air_date}`
        : "",

    overview: contentDetails && contentDetails.overview,

    castDetails: castDetails && castDetails,

    trailerUrl: trailerUrl && trailerUrl,
  };
};
