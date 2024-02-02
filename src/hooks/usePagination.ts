import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCurrentPage } from "@/redux/tickerSlice";
import { useMemo, useTransition } from "react";

export const usePagination = <T>(itemsPerPage: number, items: T[]) => {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }
  const currentPage = useAppSelector((state) => state.ticker.currentPage);
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

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
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevious = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
