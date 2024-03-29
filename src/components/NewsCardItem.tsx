import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { dateConvert } from "@/lib/utils";
import { TickerNewsResultItem } from "@/interfaces/interfaces";
import { useEffect, useMemo, useState } from "react";
interface NewsCardItemProps {
  result: TickerNewsResultItem;
}
const NewsCardItem = ({ result }: NewsCardItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [isVisible, domRef] = useIntersectionObserver();
  const img = useMemo(() => new Image(), []);
  const placeholderImage =
    "https://placehold.co/384x192?text=Image+not+found+or+too+large";

  const truncatedTitle = useMemo(() => {
    return result.title && result.title.length > 50
      ? `${result.title.substring(0, 50)}...`
      : result.title;
  }, [result.title]);

  const truncatedDescription = useMemo(() => {
    return result.description && result.description.length > 100
      ? `${result.description.substring(0, 100)}...`
      : result.description;
  }, [result.description]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsImage(false);
    }, 2000);

    img.src = result.image_url;

    img.onload = () => {
      clearTimeout(timer);
      setIsLoading(false);
      setIsImage(true);
    };

    img.onerror = () => {
      clearTimeout(timer);
      setIsLoading(false);
      setIsImage(false);
    };

    return () => clearTimeout(timer);
  }, [result.image_url, img]);

  return (
    <div
      className="card card-compact w-96 bg-base-100 shadow-xl border"
      ref={domRef}
    >
      <figure>
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="skeleton w-full h-48"></div>
          </div>
        ) : isVisible ? (
          <img
            src={isImage ? result.image_url : placeholderImage}
            alt={result.title}
            className="w-full h-48 "
          />
        ) : null}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{truncatedTitle}</h2>
        <p>
          By {result.author}
          <i className="block pb-5">
            Published at {dateConvert(result.published_utc)}
          </i>
          {truncatedDescription}
        </p>
        <div className="card-actions justify-end">
          <a
            href={result.article_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn  btn-outline"
          >
            Read more
          </a>
        </div>
      </div>
      <div className="flex flex-wrap space-x-4 text-xs text-muted-foreground p-4">
        {result.tickers.slice(0, 5).map((ticker, index) => (
          <div className="p-1" key={index}>
            #{ticker}
          </div>
        ))}
        {result.tickers.length > 5 && <div className="p-1">...</div>}
      </div>
    </div>
  );
};

export default NewsCardItem;
