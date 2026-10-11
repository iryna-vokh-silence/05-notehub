import ReactPaginateDefault from "react-paginate";
import css from "./Pagination.module.css";

// react-paginate ships as CommonJS; у продакшн-збірці Vite його default-експорт
// може бути загорнутий у додатковий шар { default }, тож розгортаємо його безпечно.
const ReactPaginate = (
  ReactPaginateDefault as unknown as {
    default?: typeof ReactPaginateDefault;
  }
).default ?? ReactPaginateDefault;

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (selectedItem: { selected: number }): void => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
