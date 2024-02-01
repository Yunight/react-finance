import { getTickerNews } from "@/api/polygonApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getNewsDataFailure,
  getNewsDataStart,
  getNewsDataSuccess,
} from "@/redux/tickerSlice";
import { TickerNewsResult } from "@/types/types";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { dateConvert } from "@/lib/utils";

function NewsCard() {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.ticker.newsData[0]?.results);

  useEffect(() => {
    dispatch(getNewsDataStart());
    getTickerNews()
      .then((news: TickerNewsResult) => {
        localStorage.setItem("newsData", JSON.stringify(news));
        dispatch(getNewsDataSuccess([news]));
      })
      .catch((error) => dispatch(getNewsDataFailure(error.message)));
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center space-x-2 mb-8 ">
        <Label htmlFor="tickers" className="text-2xl">
          Latest News on Tickers !
        </Label>
      </div>
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-20 my-8">
        {results?.map((result: TickerNewsResult, index: number) => (
          <Card key={index} className="w-[500px] ">
            <CardHeader className="flex ">
              <CardTitle>
                {result.title && result.title.length > 50
                  ? `${result.title.substring(0, 50)}...`
                  : result.title}
              </CardTitle>
              <CardDescription className="">
                By {result.author}
                <i className="block">
                  {" "}
                  Published at {dateConvert(result.published_utc)}
                </i>
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-24">
              <img src={result.image_url} className="w-50 h-75 object-cover" />
              {result.description && result.description.length > 100
                ? `${result.description.substring(0, 100)}...`
                : result.description}
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
        ))}
      </div>
    </>
  );
}
export default NewsCard;
