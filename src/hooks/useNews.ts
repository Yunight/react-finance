import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getNewsDataFailure,
  getNewsDataStart,
  getNewsDataSuccess,
} from "@/redux/tickerSlice";
import { getTickerNews } from "@/api/polygonApi";

export const useNews = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.ticker.newsResponse?.results);

  useEffect(() => {
    dispatch(getNewsDataStart());
    getTickerNews()
      .then((news) => {
        localStorage.setItem("newsData", JSON.stringify(news));
        dispatch(getNewsDataSuccess(news));
      })
      .catch((error) => dispatch(getNewsDataFailure(error.message)));
  }, [dispatch]);

  return results;
};
