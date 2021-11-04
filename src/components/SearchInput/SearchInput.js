import React from "react";
import styles from "./SearchInput.module.scss";
import { BiSearchAlt as SearchIcon } from "react-icons/bi";

const SearchInput = ({
  searchText,
  setSearchText,
  setStartFetching,
  setSearchTheContent,
  activeTab,
  setContent,
  setPage,
}) => {
  // Input-Change Handler \\
  const inputChangeHandler = (event) => {
    setSearchText(event.target.value);
    if (searchText.length === 0) setStartFetching(false);
  };

  // Search-Content Handler \\
  const searchContentHandler = (event) => {
    event.preventDefault();

    if (searchText.length === 0) {
      setContent([]);
      return;
    }

    setStartFetching(true);
    setPage(1);
    setSearchTheContent((previousState) => !previousState);
  };

  // JSX \\
  return (
    <form className={styles.search__form} onSubmit={searchContentHandler}>
      <input
        className={styles.search__form_input}
        type="text"
        placeholder={activeTab === 1 ? "Search Movies" : "Search TV Series"}
        onChange={inputChangeHandler}
        value={searchText}
      />

      <button className={styles.search__form_btn}>
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchInput;
