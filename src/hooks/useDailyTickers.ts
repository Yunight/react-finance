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
  setNextStockValueUpdate,
  setSearchInput,
} from "@/redux/tickerSlice";
import { getGroupedDaily, getSma, getTickers } from "@/api/polygonApi";
import { useNavigate } from "react-router-dom";
import { AllTickerDetails } from "@/interfaces/interfaces";
import { getCurrentTimePlusXMins } from "@/lib/utils";

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

      const handleData = async (result: AllTickerDetails) => {
        dispatch(selectedTicker(result));
        dispatch(setSearchInput(result.name));
        dispatch(getSmaStart());
        dispatch(setNextStockValueUpdate(getCurrentTimePlusXMins()));
        try {
          const smaData = await getSma(result.ticker);
          dispatch(
            getSmaSuccess({ results: { values: smaData.results.values } })
          );
        } catch (error) {
          if (error instanceof Error) {
            dispatch(getSmaFailure(error.message));
          } else {
            throw error;
          }
        }
      };

      if (data.results.length > 1) {
        const filteredData = data.results.filter(
          (result) => result.ticker === ticker
        );
        handleData(filteredData[0]);
      } else {
        handleData(data.results[0]);
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
