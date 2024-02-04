import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getNewsDataFailure,
  getNewsDataStart,
  getNewsDataSuccess,
} from "@/redux/tickerSlice";
import { getTickerNews } from "@/api/polygonApi";
import { MIN_BEFORE_FETCHING_NEWS } from "@/consts/consts";

export const useNews = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.ticker.newsResponse);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getNewsDataStart());

      getTickerNews()
        .then((res) => {
          const storingTime = new Date().getTime();

          const newsResponse = res.results;
          localStorage.setItem(
            "newsData",
            JSON.stringify({ storingTime, newsResponse })
          );
          dispatch(getNewsDataSuccess(res.results));
        })
        .catch((error) => dispatch(getNewsDataFailure(error.message)));
    };

    const storedData = localStorage.getItem("newsData");

    if (storedData) {
      const { storingTime, newsResponse: storedDatas } = JSON.parse(storedData);

      const currentTime = new Date().getTime();
      if (currentTime - storingTime > MIN_BEFORE_FETCHING_NEWS * 60000) {
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
