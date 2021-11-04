import React, { useState, useEffect } from "react";
import styles from "./Search.module.scss";
import SearchInput from "../../components/SearchInput/SearchInput";
import SearchTab from "../../components/SearchTab/SearchTab";
import ContentBox from "../../components/ContentBox/ContentBox";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";

const Search = () => {
  // State Of Search-Input, Active-Tab, Fetched-Content, Current-Page, Total-Pages-Available \\
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPagesAvailable, setNumOfPagesAvailable] = useState();

  // Initially False To Prevent Fetching Content When Page Loads First Time \\
  const [startFetching, setStartFetching] = useState(false);

  // Whenever 'searchTheContent' Changes Its State 'useEffect Will Run' \\
  const [searchTheContent, setSearchTheContent] = useState(false);

  // Fetch The Searched Content \\
  useEffect(() => {
    if (!startFetching) return;

    const fetchSearch = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SEARCH_URL}${
          activeTab === 1 ? "movie" : "tv"
        }?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}`
      );

      setContent(data.results);
      setNumOfPagesAvailable(data.total_pages);
    };

    fetchSearch();
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

      <div className={styles.search__content}>
        {content &&
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
      </div>

      {content.length > 0 && numOfPagesAvailable > 1 && (
        <Pagination numberOfPages={numOfPagesAvailable} setPage={setPage} />
      )}

      {!searchText && content.length === 0 && (
        <p className={styles.search__something}>
          Search any {activeTab === 1 ? "movie" : "series"}
        </p>
      )}

      {searchText && startFetching && content.length === 0 && (
        <p className={styles.search__error}>No results found</p>
      )}
    </main>
  );
};

export default Search;
