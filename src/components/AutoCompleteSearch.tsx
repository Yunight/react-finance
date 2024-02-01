import { getSma, getTickers } from "@/api/polygonApi";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  resetSelectedTicker,
  getSmaSuccess,
  getSmaFailure,
  resetSma,
  setSearchInput,
  selectedTicker,
  getSmaStart,
} from "@/redux/tickerSlice";
import { AllTickerDetails } from "@/types/types";
import { useRef, useState, useMemo, useCallback } from "react";
import axios, { CancelTokenSource } from "axios";
import { Input } from "@/components/ui/input";
import { Transition } from "@headlessui/react";

const AutoCompleteSearch = () => {
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

  return (
    <Transition
      show={true}
      enter="transition-opacity duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex items-center space-x-2 mb-8 ">
        <div className="text-2xl">Search and Display Ticker's Informations</div>
      </div>
      <div className="relative  w-1/3 mb-8">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search Here"
          className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full"
        />

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-full bg-gray-100 text-gray-900 z-10 rounded-3xl p-2  max-h-48 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-white px-4 py-2 hover:rounded-3xl"
              >
                {suggestion.name} ({suggestion.ticker})
              </li>
            ))}
          </ul>
        )}
      </div>
    </Transition>
  );
};

export default AutoCompleteSearch;
