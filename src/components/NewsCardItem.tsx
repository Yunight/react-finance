import { dateConvert } from "@/lib/utils";
import { TickerNewsResult } from "@/types/types";
import { useEffect, useState } from "react";
interface NewsCardItemProps {
  result: TickerNewsResult;
}

const NewsCardItem = ({ result }: NewsCardItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = result.image_url;

    img.onload = () => {
      setIsLoading(false);
      setIsImage(true);
    };

    img.onerror = () => {
      setIsLoading(false);
      setIsImage(false);
    };
  }, [result.image_url]);

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton w-full h-48"></div>
          </div>
        ) : (
          <img
            src={
              isImage
                ? result.image_url
                : "https://placehold.co/384x192?text=Image+not+found"
            }
            alt={result.title}
            className="w-full h-48 "
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {result.title && result.title.length > 50
            ? `${result.title.substring(0, 50)}...`
            : result.title}
        </h2>
        <p>
          By {result.author}
          <i className="block pb-5">
            Published at {dateConvert(result.published_utc)}
          </i>
          {result.description && result.description.length > 100
            ? `${result.description.substring(0, 100)}...`
            : result.description}
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-info text-base-100"
            onClick={() => window.open(result.article_url, "_blank")}
          >
            Read more
          </button>
        </div>
      </div>
      <div className="flex flex-wrap space-x-4 text-xs text-muted-foreground p-4">
        {result.tickers.map((ticker, index) => (
          <div className="p-1" key={index}>
            #{ticker}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCardItem;
