import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ numberOfPages = 10, setPage }) => {
  const goToPage = ({ selected }) => {
    window.scroll(0, 0);
    setPage(++selected);
  };

  // JSX \\
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        onPageChange={goToPage}
        pageCount={numberOfPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        previousLabel="Previous"
        nextLabel="Next"
        containerClassName={styles.paginationContainer}
        previousLinkClassName={styles.paginationPrev}
        nextLinkClassName={styles.paginationNext}
        activeClassName={styles.paginationActive}
        disabledClassName={styles.paginationDisabled}
      />
    </div>
  );
};

export default Pagination;
