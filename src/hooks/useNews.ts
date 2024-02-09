import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchNewsData, getNewsDataSuccess } from "@/redux/tickerSlice";

import { MIN_BEFORE_FETCHING_NEWS } from "@/consts/consts";

export const useNews = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector((state) => state.ticker.newsResponse);

  useEffect(() => {
    const storedData = localStorage.getItem("newsData");

    if (storedData) {
      const { storingTime, newsResponse: storedDatas } = JSON.parse(storedData);

      const currentTime = new Date().getTime();
      if (currentTime - storingTime > MIN_BEFORE_FETCHING_NEWS * 60000) {
        dispatch(fetchNewsData());
      } else {
        dispatch(getNewsDataSuccess(storedDatas));
      }
    } else {
      dispatch(fetchNewsData());
    }
  }, [dispatch]);

  return results;
};
