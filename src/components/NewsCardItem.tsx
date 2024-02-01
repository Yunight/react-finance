import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { dateConvert } from "@/lib/utils";
import { TickerNewsResult } from "@/types/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsCardItemProps {
  result: TickerNewsResult;
}

const NewsCardItem = ({ result }: NewsCardItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = result.image_url;
    img.onload = () => setIsLoading(false);
  }, [result.image_url]);

  return (
    <Card className="w-[500px] ">
      <CardHeader className="flex ">
        <CardTitle>
          {result.title && result.title.length > 50
            ? `${result.title.substring(0, 50)}...`
            : result.title}
        </CardTitle>
        <CardDescription className="">
          By {result.author}
          <i className="block">
            Published at {dateConvert(result.published_utc)}
          </i>
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-24">
        {isLoading ? (
          <Skeleton className="w-full h-48 rounded-sm" />
        ) : (
          <img src={result.image_url} className="w-full h-48 object-cover" />
        )}
        <p className="py-4">
          {result.description && result.description.length > 100
            ? `${result.description.substring(0, 100)}...`
            : result.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => window.open(result.article_url, "_blank")}>
          Read more
        </Button>
      </CardFooter>
      <div className="flex flex-wrap space-x-4 text-xs text-muted-foreground p-4">
        {result.tickers.map((ticker, index) => (
          <div className="p-1" key={index}>
            #{ticker}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NewsCardItem;
