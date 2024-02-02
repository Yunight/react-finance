import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getKpiDataSuccess } from "@/redux/tickerSlice";

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

const DailyTickersDisplay = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const kpiData = useAppSelector((state) => state.ticker.kpiData);
  const [filter, setFilter] = useState("");

  const { fetchAndStoreData } = useDailyTickers();

  const filteredItems = useMemo(() => {
    return kpiData.filter((item) =>
      item.T.toLowerCase().includes(filter.toLowerCase())
    );
  }, [kpiData, filter]);

  useEffect(() => {
    const currenTableCellate = new Date();
    const yesterday = new Date(currenTableCellate);
    yesterday.setDate(yesterday.getDate() - 2);
    const year = yesterday.getFullYear();
    const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    const day = ("0" + yesterday.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    const storedData = localStorage.getItem("kpiData");

    setCurrentPage(1);

    if (storedData) {
      const { date, results } = JSON.parse(storedData);
      if (date === formattedDate) {
        dispatch(getKpiDataSuccess(results));
      } else {
        fetchAndStoreData(formattedDate);
      }
    } else {
      fetchAndStoreData(formattedDate);
    }
  }, [dispatch, fetchAndStoreData, filter]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

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
        <div className="flex gap-8">
          <div className="join">
            <button
              className="join-item btn"
              onClick={handlePrevious}
              disabled={currentPage === 1 || filteredItems.length === 0}
            >
              «
            </button>
            <button className="join-item btn">
              {currentPage === 1 && filteredItems.length === 0
                ? ` No result`
                : `Page ${currentPage} of ${totalPages}`}
            </button>
            <button
              className="join-item btn "
              onClick={handleNext}
              disabled={
                currentPage === totalPages || filteredItems.length === 0
              }
            >
              »
            </button>
          </div>
        </div>
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
