import { useMemo, useState } from "react";

export const usePagination = <T>(
  initialPage: number,
  itemsPerPage: number,
  items: T[]
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return { handleNext, handlePrevious, currentItems, currentPage, totalPages };
};
