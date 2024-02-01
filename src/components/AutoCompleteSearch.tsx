import { getSma, getTickers } from "@/api/polygonApi";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  selectTicker,
  resetSelectedTicker,
  getSmaSuccess,
  getSmaFailure,
  resetSma,
  resetData,
} from "@/redux/tickerSlice";
import { AllTickerDetails } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import axios, { CancelTokenSource } from "axios";
import { Input } from "@/components/ui/input";

const AutoCompleteSearch = () => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const tickerData = useAppSelector((state) => state.ticker.data);
  const dispatch = useAppDispatch();

  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const cancelToken = useRef<CancelTokenSource | null>(null);

  useEffect(() => {
    return () => {
      dispatch(resetData());
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setShowSuggestions(e.target.value !== "");
    if (e.target.value.length >= 1) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      if (cancelToken.current) {
        cancelToken.current.cancel();
      }
      cancelToken.current = axios.CancelToken.source();

      timeoutId.current = setTimeout(() => {
        dispatch(fetchDataStart());
        dispatch(resetSelectedTicker());
        dispatch(resetSma());

        if (cancelToken.current) {
          getTickers(e.target.value, cancelToken.current.token)
            .then((data) => dispatch(fetchDataSuccess(data.results)))
            .catch((error) => {
              if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
              } else {
                dispatch(fetchDataFailure(error.message));
              }
            });
        }
      }, 500);
    }
  };

  const filteredSuggestions = tickerData.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  const handleSuggestionClick = (suggestion: AllTickerDetails) => {
    setInput(suggestion.name);
    setShowSuggestions(false);
    dispatch(selectTicker(suggestion));
    getSma(suggestion.ticker)
      .then((data) =>
        dispatch(getSmaSuccess({ results: { values: data.results.values } }))
      )
      .catch((error) => dispatch(getSmaFailure(error.message)));
  };

  return (
    <div className="relative  w-1/3 ">
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
  );
};

export default AutoCompleteSearch;
