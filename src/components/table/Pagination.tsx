import React from "react";
import styles from "src/styles/Table.module.css";
import classnames from "classnames";
import { Icons } from "@us-gov-cdc/cdc-react-icons";
import { Button } from "src/components/Button";

type PaginationPageProps = {
  page: number;
  isCurrent?: boolean;
  setCurrentPage: (page: number) => void;
};

type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  maxSlots?: number;
  setCurrentPage: (page: number) => void;
};

const PaginationPage = ({
  page,
  isCurrent,
  setCurrentPage,
}: PaginationPageProps) => {
  const linkClasses = classnames("usa-pagination__button", {
    "usa-current": isCurrent,
  });

  return (
    <li
      key={`pagination_page_${page}`}
      className="usa-pagination__item usa-pagination__page-no">
      <Button
        type="button"
        unstyled
        data-testid="pagination-page-number"
        className={linkClasses}
        aria-label={`Page ${page}`}
        aria-current={isCurrent ? "page" : undefined}
        onClick={() => setCurrentPage(page - 1)}>
        {page}
      </Button>
    </li>
  );
};

const PaginationOverflow = () => (
  <li
    className="usa-pagination__item usa-pagination__overflow"
    role="presentation">
    <span>…</span>
  </li>
);

export const Pagination = ({
  totalPages,
  currentPage,
  className,
  maxSlots = 9,
  setCurrentPage,
  ...props
}: PaginationProps & JSX.IntrinsicElements["nav"]): React.ReactElement => {
  const navClasses = classnames(
    styles["pagination"],
    "usa-pagination",
    className
  );

  const isOnFirstPage = currentPage === 1;
  const isOnLastPage = totalPages ? currentPage === totalPages : false;

  const showOverflow = totalPages ? totalPages > maxSlots : true;

  const middleSlot = Math.round(maxSlots / 2);
  const isBeforeMiddleSlot = !!(
    totalPages && totalPages - currentPage >= middleSlot
  );
  const showPrevOverflow = showOverflow && currentPage > middleSlot;
  const showNextOverflow = isBeforeMiddleSlot || !totalPages;

  const currentPageRange: Array<number | "overflow"> =
    showOverflow || !totalPages
      ? [currentPage]
      : Array.from({ length: totalPages }).map((_, i) => i + 1);

  if (showOverflow) {
    const prevSlots = isOnFirstPage ? 0 : showPrevOverflow ? 2 : 1;
    const nextSlots = isOnLastPage ? 0 : showNextOverflow ? 2 : 1;
    const pageRangeSize = maxSlots - 1 - (prevSlots + nextSlots);

    let currentPageBeforeSize = 0;
    let currentPageAfterSize = 0;
    if (showPrevOverflow && showNextOverflow) {
      currentPageBeforeSize = Math.round((pageRangeSize - 1) / 2);
      currentPageAfterSize = pageRangeSize - currentPageBeforeSize;
    } else if (showPrevOverflow) {
      currentPageAfterSize = (totalPages || 0) - currentPage - 1;
      currentPageAfterSize =
        currentPageAfterSize < 0 ? 0 : currentPageAfterSize;
      currentPageBeforeSize = pageRangeSize - currentPageAfterSize;
    } else if (showNextOverflow) {
      currentPageBeforeSize = currentPage - 2;
      currentPageBeforeSize =
        currentPageBeforeSize < 0 ? 0 : currentPageBeforeSize;
      currentPageAfterSize = pageRangeSize - currentPageBeforeSize;
    }

    let counter = 1;
    while (currentPageBeforeSize > 0) {
      currentPageRange.unshift(currentPage - counter);
      counter++;
      currentPageBeforeSize--;
    }

    counter = 1;
    while (currentPageAfterSize > 0) {
      currentPageRange.push(currentPage + counter);
      counter++;
      currentPageAfterSize--;
    }

    if (showPrevOverflow) currentPageRange.unshift("overflow");
    if (currentPage !== 1) currentPageRange.unshift(1);
    if (showNextOverflow) currentPageRange.push("overflow");
    if (totalPages && currentPage !== totalPages)
      currentPageRange.push(totalPages);
  }

  const prevPage = !isOnFirstPage && currentPage - 1;
  const nextPage = !isOnLastPage && currentPage + 1;

  return (
    <nav aria-label="Pagination" className={navClasses} {...props}>
      <ul className="usa-pagination__list">
        {prevPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <Button
              type="button"
              unstyled
              className="usa-pagination__link usa-pagination__previous-page"
              aria-label="Previous page"
              data-testid="pagination-previous"
              onClick={() => setCurrentPage(currentPage - 2)}>
              <Icons.ChevronLeft />
              <span className="usa-pagination__link-text">Previous</span>
            </Button>
          </li>
        )}

        {currentPageRange.map((pageNum, i) =>
          pageNum === "overflow" ? (
            <PaginationOverflow key={`pagination_overflow_${i}`} />
          ) : (
            <PaginationPage
              key={`pagination_page_${pageNum}`}
              page={pageNum}
              isCurrent={pageNum === currentPage}
              setCurrentPage={setCurrentPage}
            />
          )
        )}

        {nextPage && (
          <li className="usa-pagination__item usa-pagination__arrow">
            <Button
              type="button"
              unstyled
              className="usa-pagination__link usa-pagination__next-page"
              aria-label="Next page"
              data-testid="pagination-next"
              onClick={() => setCurrentPage(currentPage)}>
              <span className="usa-pagination__link-text">Next</span>
              <Icons.ChevronRight />
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
