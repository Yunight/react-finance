import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getDailyNewsDataFailure,
  getDailyNewsDataSuccess,
  setCurrentPage,
  setDailyNewsFilter,
} from "@/redux/tickerSlice";
import { getGroupedDaily } from "@/api/polygonApi";
import { useCallback } from "react";

export function useDailyTickers() {
  const dispatch = useAppDispatch();
  const dailyNews = useAppSelector((state) => state.ticker.dailyTickers);

  const handleFilterChange = useCallback(
    (event: { target: { value: string } }) => {
      dispatch(setDailyNewsFilter(event.target.value));
      dispatch(setCurrentPage(1));
    },
    [dispatch]
  );

  const fetchAndStoreData = useCallback(
    (date: string): Promise<void> => {
      return getGroupedDaily({ date })
        .then((res) => {
          localStorage.setItem(
            "dailyNews",
            JSON.stringify({ date, results: res.results })
          );
          dispatch(getDailyNewsDataSuccess(res.results));
        })
        .catch((error) => {
          dispatch(getDailyNewsDataFailure(error.message));
          return void 0;
        });
    },
    [dispatch]
  );

  return { fetchAndStoreData, dailyNews, handleFilterChange };
}
