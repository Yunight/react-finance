import { useAppSelector } from "@/redux/store";
import { useEffect, useMemo, useState, useTransition } from "react";

export const usePagination = <T>(itemsPerPage: number, items: T[]) => {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [isPending, startTransition] = useTransition();
  const dailyTickersFilter = useAppSelector(
    (state) => state.ticker.dailyTickersFilter
  );

  const handleNextTransition = () => {
    startTransition(() => {
      handleNext();
    });
  };

  const handlePreviousTransition = () => {
    startTransition(() => {
      handlePrevious();
    });
  };

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

  useEffect(() => {
    if (dailyTickersFilter) {
      setCurrentPage(1);
    }
  }, [dailyTickersFilter]);

  return {
    handleNext: handleNextTransition,
    handlePrevious: handlePreviousTransition,
    isPending,
    currentItems,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};
