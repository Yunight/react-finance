import { useNews } from "@/hooks/useNews";
import NewsCardItem from "./NewsCardItem";
import { TickerNewsResultItem } from "@/types/types";
import ContentTitleDisplay from "./ContentTitleDisplay";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "./Pagination"; // import the Pagination component
import { ARTICLES_PER_PAGE } from "@/consts/consts";

const NewsCardDisplay = () => {
  const results = useNews();

  const { handleNext, handlePrevious, currentItems, currentPage, totalPages } =
    usePagination(ARTICLES_PER_PAGE, results || []);

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
        {currentItems?.map((result: TickerNewsResultItem) => (
          <NewsCardItem key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

export default NewsCardDisplay;
