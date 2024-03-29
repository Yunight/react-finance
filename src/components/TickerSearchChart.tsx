import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { min, max } from "d3-array";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo } from "react";
import { getSma } from "@/api/polygonApi";
import {
  getSmaFailure,
  getSmaStart,
  getSmaSuccess,
  setNextStockValueUpdate,
} from "@/redux/tickerSlice";
import { dateConvert, getCurrentTimePlusXMins } from "@/lib/utils";
import { BASE_TIMER } from "@/consts/consts";

const TickerStockChart = () => {
  const values = useAppSelector((state) => state.ticker.sma?.results.values);
  const isLoading = useAppSelector((state) => state.ticker.loading);

  const dispatch = useAppDispatch();

  const selectedTickerData = useAppSelector(
    (state) => state.ticker.selectedTicker
  );

  const minValue = useMemo(() => min(values ?? [], (d) => d.value), [values]);
  const maxValue = useMemo(() => max(values ?? [], (d) => d.value), [values]);

  const startValue = Math.floor(minValue ?? 0);
  const endValue = Math.ceil(maxValue ?? 0);

  const ticks = useMemo(
    () =>
      Array.from(
        { length: endValue - startValue + 1 },
        (_, i) => startValue + i
      ),
    [startValue, endValue]
  );

  const sortedData = useMemo(
    () => [...(values ?? [])].sort((a, b) => a.timestamp - b.timestamp),
    [values]
  );

  useEffect(() => {
    if (selectedTickerData && sortedData.length > 0) {
      const intervalId = setInterval(() => {
        dispatch(getSmaStart());
        getSma(selectedTickerData.ticker)
          .then((data) => {
            dispatch(
              getSmaSuccess({ results: { values: data.results.values } })
            );

            dispatch(setNextStockValueUpdate(getCurrentTimePlusXMins()));
          })
          .catch((error) => dispatch(getSmaFailure(error.message)));
      }, BASE_TIMER * 60 * 1000);
      return () => {
        clearInterval(intervalId);
        dispatch(setNextStockValueUpdate(getCurrentTimePlusXMins()));
      };
    }
  }, [dispatch, selectedTickerData, sortedData.length]);

  if (isLoading || !selectedTickerData) {
    return null;
  }
  if (sortedData.length > 0) {
    return (
      <Card className="w-full mb-4 animate-out duration-1000 mt-5">
        <CardHeader>
          <CardTitle>Simple Moving Average (SMA)</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <AreaChart width={500} height={300} data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => dateConvert(timestamp)}
            />
            <YAxis
              domain={[startValue, endValue]}
              ticks={ticks}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              labelFormatter={(timestamp) => dateConvert(timestamp)}
              formatter={(value) => [`$${value}`, "Value"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="w-full mt-5 px-20 ">
        <CardHeader>
          <CardTitle>Simple Moving Average (SMA)</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <p>No data available</p>
        </CardContent>
      </Card>
    );
  }
};

export default TickerStockChart;
