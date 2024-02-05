import { useEffect } from "react";
import { getDailyNewsDataSuccess } from "@/redux/tickerSlice";
import { useAppDispatch } from "@/redux/store";
import { formatDate, getLastOpenDay } from "@/lib/utils";

type FetchAndStoreDataFunction = (date: string) => Promise<void>;

const useDailyTickersStoring = (
  fetchAndStoreData: FetchAndStoreDataFunction
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const lastOpenDay = getLastOpenDay(currentDate);
    const formattedDate = formatDate(lastOpenDay);

    const storedData = localStorage.getItem("dailyNews");

    if (storedData) {
      const { date, results } = JSON.parse(storedData);
      if (date !== formattedDate) {
        fetchAndStoreData(formattedDate);
      } else {
        dispatch(getDailyNewsDataSuccess(results));
      }
    } else {
      fetchAndStoreData(formattedDate);
    }
  }, [dispatch, fetchAndStoreData]);
};

export default useDailyTickersStoring;
