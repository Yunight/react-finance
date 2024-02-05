import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getDailyNewsDataFailure,
  getDailyNewsDataSuccess,
  getSmaFailure,
  getSmaStart,
  getSmaSuccess,
  resetSearchInput,
  resetSelectedTicker,
  resetSma,
  selectedTicker,
  setDailyNewsFilter,
  setSearchInput,
} from "@/redux/tickerSlice";
import { getGroupedDaily, getSma, getTickers } from "@/api/polygonApi";
import { useNavigate } from "react-router-dom";

export const useDailyTickers = () => {
  const dispatch = useAppDispatch();
  const dailyNews = useAppSelector((state) => state.ticker.dailyTickers);
  const navigate = useNavigate();

  const handleButtonClick = useCallback(
    async (ticker: string) => {
      const data = await getTickers(ticker);
      dispatch(resetSelectedTicker());
      dispatch(resetSearchInput());
      dispatch(resetSma());
      if (data.results.length > 1) {
        const filteredData = data.results.filter(
          (result) => result.ticker === ticker
        );

        dispatch(selectedTicker(filteredData[0]));
        dispatch(setSearchInput(filteredData[0].name));
        dispatch(getSmaStart());
        getSma(filteredData[0].ticker)
          .then((data) =>
            dispatch(
              getSmaSuccess({ results: { values: data.results.values } })
            )
          )
          .catch((error) => dispatch(getSmaFailure(error.message)));
      } else {
        dispatch(selectedTicker(data.results[0]));
        dispatch(setSearchInput(data.results[0].name));
        dispatch(getSmaStart());
        getSma(data.results[0].ticker)
          .then((data) =>
            dispatch(
              getSmaSuccess({ results: { values: data.results.values } })
            )
          )
          .catch((error) => dispatch(getSmaFailure(error.message)));
      }

      navigate("/search");
    },
    [dispatch, navigate]
  );

  const handleFilterChange = useCallback(
    (event: { target: { value: string } }) => {
      dispatch(setDailyNewsFilter(event.target.value));
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

  return {
    fetchAndStoreData,
    dailyNews,
    handleFilterChange,
    handleButtonClick,
  };
};
