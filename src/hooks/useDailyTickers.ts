import { useCallback } from "react";
import { getGroupedDaily } from "@/api/polygonApi";
import { useAppDispatch } from "@/redux/store";
import { getKpiDataFailure, getKpiDataSuccess } from "@/redux/tickerSlice";

export function useDailyTickers() {
  const dispatch = useAppDispatch();

  const fetchAndStoreData = useCallback(
    (date: string) => {
      getGroupedDaily({ date })
        .then((res) => {
          localStorage.setItem(
            "kpiData",
            JSON.stringify({ date, results: res.results })
          );
          dispatch(getKpiDataSuccess(res.results));
        })
        .catch((error) => dispatch(getKpiDataFailure(error.message)));
    },
    [dispatch]
  );

  return { fetchAndStoreData };
}
