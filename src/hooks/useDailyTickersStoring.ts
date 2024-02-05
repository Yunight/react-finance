import { useEffect } from "react";
import { getDailyNewsDataSuccess } from "@/redux/tickerSlice";
import { useAppDispatch } from "@/redux/store";

type FetchAndStoreDataFunction = (date: string) => Promise<void>;

const useStoredDailyNews = (fetchAndStoreData: FetchAndStoreDataFunction) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 2);
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
  }, [dispatch, fetchAndStoreData]);
};

export default useStoredDailyNews;
