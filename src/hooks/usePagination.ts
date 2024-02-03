import { useAppSelector } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";

export const usePagination = <T>(itemsPerPage: number, items: T[]) => {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  const [currentPage, setCurrentPage] = useState(1);
  const dailyTickersFilter = useAppSelector(
    (state) => state.ticker.dailyTickersFilter
  );

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (dailyTickersFilter) {
      setCurrentPage(1);
    }
  }, [dailyTickersFilter]);

  return {
    handleNext,
    handlePrevious,
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
