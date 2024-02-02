import { useTransition } from "react";
import { useNews } from "@/hooks/useNews";
import NewsCardItem from "./NewsCardItem";
import { TickerNewsResult } from "@/types/types";
import ContentTitleDisplay from "./ContentTitleDisplay";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination"; // import the Pagination component
import { ARTICLES_PER_PAGE } from "@/consts/consts";

const NewsCard = () => {
  const results = useNews();
  const itemsPerPage = ARTICLES_PER_PAGE;
  const { handleNext, handlePrevious, currentItems, currentPage, totalPages } =
    usePagination(1, itemsPerPage, results || []);

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

  return (
    <>
      <ContentTitleDisplay text="Latest News on Tickers !" />
      <Pagination
        handlePrevious={handlePreviousTransition}
        handleNext={handleNextTransition}
        currentPage={currentPage}
        totalPages={totalPages}
        filteredItems={currentItems || []}
      />
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-5 my-5">
        {isPending ? (
          <div className="flex flex-col gap-4 w-52">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        ) : (
          currentItems?.map((result: TickerNewsResult) => (
            <NewsCardItem key={result.id} result={result} />
          ))
        )}
      </div>
    </>
  );
};

export default NewsCard;