import { Fragment } from "react";
import { DOTS, usePagination } from "./usePagination";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  console.log("CURRENT", currentPage === 1, lastPage);
  return (
    <Fragment>
      <ul
        className={`pagination-container ${className}`}
      >
        <li
          className={`pagination-item ${className} ${currentPage === 1 && "disabled"}`}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={`pagination-item ${className} ${pageNumber === currentPage && "selected"}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`pagination-item ${className} ${currentPage === lastPage && "disabled"}`}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </Fragment>
  );
};

export default Pagination;
