interface PaginationProps<T> {
  handlePrevious: () => void;
  handleNext: () => void;
  currentPage: number;
  totalPages: number;
  filteredItems: T[];
}

function Pagination<T>({
  handlePrevious,
  handleNext,
  currentPage,
  totalPages,
  filteredItems,
}: PaginationProps<T>) {
  return (
    <div className="flex gap-8">
      <div className="join">
        <button
          className="join-item btn"
          onClick={handlePrevious}
          disabled={currentPage === 1 || filteredItems.length === 0}
        >
          «
        </button>
        <button className="join-item btn">
          {currentPage === 1 && filteredItems.length === 0
            ? ` No result`
            : `Page ${currentPage} of ${totalPages}`}
        </button>
        <button
          className="join-item btn "
          onClick={handleNext}
          disabled={currentPage === totalPages || filteredItems.length === 0}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default Pagination;
