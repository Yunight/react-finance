import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getNewsDataFailure,
  getNewsDataStart,
  getNewsDataSuccess,
} from "@/redux/tickerSlice";
import { getTickerNews } from "@/api/polygonApi";
import { timeHoursAndMinuteToMinutes } from "@/lib/utils";
import { MIN_BEFORE_FETCHING_NEWS } from "@/consts/consts";

export const useNews = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.ticker.newsResponse);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getNewsDataStart());
      getTickerNews()
        .then((res) => {
          const currentTime = new Date();
          const storedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
          const newsResponse = res.results;
          localStorage.setItem(
            "newsData",
            JSON.stringify({ storedTime, newsResponse })
          );
          dispatch(getNewsDataSuccess(res.results));
        })
        .catch((error) => dispatch(getNewsDataFailure(error.message)));
    };

    const storedData = localStorage.getItem("newsData");

    if (storedData) {
      const { storedTime: storedMin, newsResponse: storedDatas } =
        JSON.parse(storedData);
      const minutes = timeHoursAndMinuteToMinutes(storedMin);
      const currentTime = new Date();
      const currentStoredTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
      const localStoredTime = timeHoursAndMinuteToMinutes(currentStoredTime);

      if (localStoredTime - minutes >= MIN_BEFORE_FETCHING_NEWS) {
        fetchData();
      } else {
        dispatch(getNewsDataSuccess(storedDatas));
      }
    } else {
      fetchData();
    }
  }, [dispatch]);

  return results;
};
