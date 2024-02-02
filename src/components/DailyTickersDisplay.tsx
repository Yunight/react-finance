import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getDailyNewsDataSuccess } from "@/redux/tickerSlice";

import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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

const DailyTickersDisplay = () => {
  const dispatch = useAppDispatch();
  const itemsPerPage = NUMBER_OF_DAILY_PER_PAGE;
  const dailyNews = useAppSelector((state) => state.ticker.dailyNews);
  const [filter, setFilter] = useState("");

  const { fetchAndStoreData } = useDailyTickers();

  const filteredItems = useMemo(() => {
    return dailyNews.filter((item) =>
      item.T.toLowerCase().includes(filter.toLowerCase())
    );
  }, [dailyNews, filter]);

  const { handleNext, handlePrevious, currentItems, currentPage, totalPages } =
    usePagination(1, itemsPerPage, filteredItems);

  useEffect(() => {
    const currenTableCellate = new Date();
    const yesterday = new Date(currenTableCellate);
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    const day = ("0" + yesterday.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    const storedData = localStorage.getItem("dailyNews");

    if (storedData) {
      const { date, results } = JSON.parse(storedData);
      if (date === formattedDate) {
        dispatch(getDailyNewsDataSuccess(results));
      } else {
        fetchAndStoreData(formattedDate);
      }
    } else {
      fetchAndStoreData(formattedDate);
    }
  }, [dispatch, fetchAndStoreData, filter]);

  const handleFilterChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setFilter(event.target.value);
    },
    []
  );

  return (
    <>
      <ContentTitleDisplay text="Display and Filter - Grouped Daily Tickers" />
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter here"
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
            <div className="stat-desc">
              {filteredItems.length > 9000 ? "It's over 9000 !" : null}
            </div>
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
