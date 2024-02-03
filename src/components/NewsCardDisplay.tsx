import { useNews } from "@/hooks/useNews";
import NewsCardItem from "./NewsCardItem";
import { TickerNewsResultItem } from "@/types/types";
import ContentTitleDisplay from "./ContentTitleDisplay";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination";
import { ARTICLES_PER_PAGE } from "@/consts/consts";

const NewsCardDisplay = () => {
  const results = useNews();

  const {
    handleNext,
    handlePrevious,
    currentItems,
    currentPage,
    totalPages,
    isPending,
  } = usePagination(ARTICLES_PER_PAGE, results || []);

  return (
    <>
      <ContentTitleDisplay text="Latest News on Tickers !" />
      <Pagination
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentPage={currentPage}
        totalPages={totalPages}
        filteredItems={currentItems || []}
      />
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-5 my-5">
        {isPending ? (
          <div className="flex flex-col gap-4 w-52">
            <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        ) : (
          currentItems?.map((result: TickerNewsResultItem) => (
            <NewsCardItem key={result.id} result={result} />
          ))
        )}
      </div>
    </>
  );
};

export default NewsCardDisplay;
