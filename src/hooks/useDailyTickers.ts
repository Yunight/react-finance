import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getDailyNewsDataFailure,
  getDailyNewsDataSuccess,
} from "@/redux/tickerSlice";
import { getGroupedDaily } from "@/api/polygonApi";
import { useCallback } from "react";

export function useDailyTickers(
  setFilter: React.Dispatch<React.SetStateAction<string>>
) {
  const dispatch = useAppDispatch();
  const dailyNews = useAppSelector((state) => state.ticker.dailyNews);

  const handleFilterChange = useCallback(
    (event: { target: { value: string } }) => {
      setFilter(event.target.value);
    },
    [setFilter]
  );

  const fetchAndStoreData = useCallback(
    (date: string) => {
      getGroupedDaily({ date })
        .then((res) => {
          localStorage.setItem(
            "dailyNews",
            JSON.stringify({ date, results: res.results })
          );
          dispatch(getDailyNewsDataSuccess(res.results));
        })
        .catch((error) => dispatch(getDailyNewsDataFailure(error.message)));
    },
    [dispatch]
  );

  return { fetchAndStoreData, dailyNews, handleFilterChange };
}
