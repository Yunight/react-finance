import { useRef, useState, useMemo, useCallback } from "react";
import axios, { CancelTokenSource } from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  resetSelectedTicker,
  resetSma,
  setSearchInput,
  selectedTicker,
  getSmaStart,
  getSmaSuccess,
  getSmaFailure,
} from "@/redux/tickerSlice";
import { getTickers, getSma } from "@/api/polygonApi";
import { AllTickerDetails } from "@/types/types";

export const useAutoCompleteSearch = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const input = useAppSelector((state) => state.ticker.searchInput);
  const tickerData = useAppSelector((state) => state.ticker.data);
  const dispatch = useAppDispatch();

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const cancelToken = useRef<CancelTokenSource | null>(null);

  const fetchData = useCallback(
    (value: string) => {
      dispatch(fetchDataStart());
      dispatch(resetSelectedTicker());
      dispatch(resetSma());

      if (cancelToken.current) {
        getTickers(value, cancelToken.current.token)
          .then((data) => dispatch(fetchDataSuccess(data.results)))
          .catch((error) => {
            if (axios.isCancel(error)) {
              console.log("Request canceled", error.message);
            } else {
              dispatch(fetchDataFailure(error.message));
            }
          });
      }
    },
    [dispatch]
  );

  const fetchDataWithDelay = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      fetchData(input);
    }, 500);
  }, [fetchData, input]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchInput(e.target.value));
      setShowSuggestions(e.target.value !== "");
      if (e.target.value.length >= 1) {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (cancelToken.current) {
          cancelToken.current.cancel();
        }
        cancelToken.current = axios.CancelToken.source();

        fetchDataWithDelay();
      }
    },
    [fetchDataWithDelay, dispatch]
  );

  const filteredSuggestions = useMemo(
    () =>
      tickerData.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      ),
    [tickerData, input]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: AllTickerDetails) => {
      setShowSuggestions(false);
      dispatch(selectedTicker(suggestion));

      dispatch(getSmaStart());

      getSma(suggestion.ticker)
        .then((data) =>
          dispatch(getSmaSuccess({ results: { values: data.results.values } }))
        )
        .catch((error) => dispatch(getSmaFailure(error.message)));
    },
    [dispatch]
  );

  return {
    showSuggestions,
    input,
    handleInputChange,
    filteredSuggestions,
    handleSuggestionClick,
  };
};
