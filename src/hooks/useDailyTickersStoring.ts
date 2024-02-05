import { useEffect } from "react";
import { getDailyNewsDataSuccess } from "@/redux/tickerSlice";
import { useAppDispatch } from "@/redux/store";

type FetchAndStoreDataFunction = (date: string) => Promise<void>;

const useDailyTickersStoring = (
  fetchAndStoreData: FetchAndStoreDataFunction
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentDate = new Date();
    const lastOpenDay = new Date(currentDate);

    switch (lastOpenDay.getDay()) {
      case 0:
        lastOpenDay.setDate(lastOpenDay.getDate() - 2);
        break;
      case 1:
        lastOpenDay.setDate(lastOpenDay.getDate() - 3);
        break;
      case 6:
        lastOpenDay.setDate(lastOpenDay.getDate() - 1);
        break;
      default:
        lastOpenDay.setDate(lastOpenDay.getDate() - 1);
    }

    const year = lastOpenDay.getFullYear();
    const month = ("0" + (lastOpenDay.getMonth() + 1)).slice(-2);
    const day = ("0" + lastOpenDay.getDate()).slice(-2);
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

export default useDailyTickersStoring;
