import { useNews } from "@/hooks/useNews";
import NewsCardItem from "./NewsCardItem";
import { TickerNewsResult } from "@/types/types";

const NewsCard = () => {
  const results = useNews();

  return (
    <>
      <div className="flex items-center space-x-2 mb-8 ">
        <div className="text-2xl">Latest News on Tickers !</div>
      </div>
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-20 my-8">
        {results?.map((result: TickerNewsResult) => (
          <NewsCardItem key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

export default NewsCard;
