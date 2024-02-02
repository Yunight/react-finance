import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { getDailyNewsDataSuccess } from "@/redux/tickerSlice";

export const useFetchDailyData = (fetchDailyData: () => void) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
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
        fetchDailyData();
      }
    } else {
      fetchDailyData();
    }
  }, [dispatch, fetchDailyData]);
};
