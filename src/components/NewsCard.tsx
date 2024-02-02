import { useNews } from "@/hooks/useNews";
import NewsCardItem from "./NewsCardItem";
import { TickerNewsResult } from "@/types/types";
import ContentTitleDisplay from "./ContentTitleDisplay";

const NewsCard = () => {
  const results = useNews();

  return (
    <>
      <ContentTitleDisplay text="Latest News on Tickers !" />
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-20 my-8">
        {results?.map((result: TickerNewsResult) => (
          <NewsCardItem key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

export default NewsCard;
