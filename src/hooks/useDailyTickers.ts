import { useCallback } from "react";
import { getGroupedDaily } from "@/api/polygonApi";
import { useAppDispatch } from "@/redux/store";
import {
  getDailyNewsDataFailure,
  getDailyNewsDataSuccess,
} from "@/redux/tickerSlice";

export function useDailyTickers() {
  const dispatch = useAppDispatch();

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

  return { fetchAndStoreData };
}
