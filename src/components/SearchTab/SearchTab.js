import React from "react";
import styles from "./SearchTab.module.scss";

const SearchTab = ({
  setSearchText,
  setStartFetching,
  activeTab,
  setActiveTab,
  content,
  setContent,
  setPage,
}) => {
  // Tab Handler \\
  const TabHandler = (tab) => {
    if (activeTab === tab && content.length > 0) return;
    setActiveTab(tab);
    setContent([]);
    setPage(1);
    setStartFetching(false);
    if (activeTab !== tab) setSearchText("");
  };

  // Tab Class \\
  const tabClass = (tab) =>
    activeTab === tab ? `${styles.tab} ${styles.tab_active}` : `${styles.tab}`;

  // JSX \\
  return (
    <div className={styles.search__tabs}>
      <div className={tabClass(1)} onClick={() => TabHandler(1)}>
        Search Movies
      </div>
      <div className={tabClass(2)} onClick={() => TabHandler(2)}>
        Search Tv Series
      </div>
    </div>
  );
};

export default SearchTab;
