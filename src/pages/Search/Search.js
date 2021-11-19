import React, { useState, useEffect } from "react";

// Style \\
import styles from "./Search.module.scss";

// Components \\
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchTab from "../../components/SearchTab/SearchTab";
import ContentBoxContainer from "../../components/ContentBoxContainer/ContentBoxContainer";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";

const Search = () => {
  // States \\
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // Initially False To Prevent Fetching Content When Page Loads First Time \\
  const [startFetching, setStartFetching] = useState(false);

  // Whenever 'searchTheContent' Changes Its State 'useEffect Will Run' \\
  const [searchTheContent, setSearchTheContent] = useState(false);

  // Fetch The Searched Content \\
  useEffect(() => {
    if (!startFetching) return;
    const controller = new AbortController();

    const fetchSearch = async () => {
      setIsPending(true);

      try {
        const res = await fetch(
          `${process.env.REACT_APP_SEARCH_URL}${
            activeTab === 1 ? "movie" : "tv"
          }?api_key=${
            process.env.REACT_APP_API_KEY
          }&language=en-US&query=${searchText}&page=${page}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();

        setContent(data.results);
        setNumOfPagesAvailable(data.total_pages);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") setError("The fetch was aborted");
        else {
          setIsPending(false);
          setError("Could not fetch the data");
        }
      }
    };

    fetchSearch();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTheContent, page]);

  // JSX \\
  return (
    <main className={styles.search}>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        setStartFetching={setStartFetching}
        setSearchTheContent={setSearchTheContent}
        activeTab={activeTab}
        setContent={setContent}
        setPage={setPage}
      />

      <SearchTab
        setSearchText={setSearchText}
        setStartFetching={setStartFetching}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        content={content}
        setContent={setContent}
        setPage={setPage}
      />

      {isPending && <div className="loading"></div>}

      {error && <div className="error">{error}</div>}

      {!isPending && !error && !searchText && content.length === 0 && (
        <p className={styles.search__something}>
          Search Any {activeTab === 1 ? "Movie" : "Series"}
        </p>
      )}

      {!isPending &&
        !error &&
        searchText &&
        startFetching &&
        content.length === 0 && (
          <p className={styles.search__error}>No results found</p>
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
              type={activeTab === 1 ? "movie" : "tv"}
              date={movie.first_air_date || movie.release_date}
              rating={movie.vote_average}
            />
          ))}
      </ContentBoxContainer>

      {!error && content && content.length > 0 && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}
    </main>
  );
};

export default Search;
