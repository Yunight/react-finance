import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

import { Separator } from "./ui/separator";
import { useDailyTickers } from "@/hooks/useDailyTickers";
import DailyTickersTable from "./DailyTickersTable";
import ContentTitleDisplay from "./ContentTitleDisplay";
import { usePagination } from "@/hooks/usePagination";
import { NUMBER_OF_DAILY_PER_PAGE } from "@/consts/consts";
import Pagination from "./Pagination";

import { useMemo } from "react";
import { useAppSelector } from "@/redux/store";

const DailyTickersDisplay = () => {
  const filter = useAppSelector((state) => state.ticker.dailyTickersFilter);

  const { dailyNews, handleFilterChange } = useDailyTickers();

  const filteredItems = useMemo(() => {
    if (!dailyNews) {
      return [];
    }

    return dailyNews.filter((item) =>
      item.T.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dailyNews, filter]);

  const { handleNext, handlePrevious, currentItems, currentPage, totalPages } =
    usePagination(NUMBER_OF_DAILY_PER_PAGE, filteredItems);

  return (
    <>
      <ContentTitleDisplay text="Display and Filter - Grouped Daily Tickers" />
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter here"
            value={filter}
            onChange={handleFilterChange}
            className="input input-bordered w-full max-w-xs font-semibold placeholder:italic"
          />
        </div>
        <div className="stats shadow bg-base-200">
          <div className="stat">
            <div className="stat-figure ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>

            <div className="stat-title">Total Results</div>
            <div className="stat-value">{filteredItems.length}</div>
          </div>
        </div>
        <Pagination
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          currentPage={currentPage}
          totalPages={totalPages}
          filteredItems={filteredItems}
        />
      </div>
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-20">
        {currentItems.map((item, index) => (
          <Card key={index} className="w-[350px] max-w-full ">
            <CardHeader>
              <CardTitle className="font-semibold leading-none tracking-tight ">
                {item.T}
              </CardTitle>
              <CardDescription>Grouped Daily</CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              <DailyTickersTable item={item} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default DailyTickersDisplay;
