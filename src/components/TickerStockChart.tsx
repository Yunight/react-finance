import { useAppSelector } from "@/redux/store";
import { format } from "date-fns";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { min, max } from "d3-array";
import { Separator } from "@/components/ui/separator";

function TickerStockChart() {
  const values = useAppSelector((state) => state.ticker.sma?.results.values);
  const isLoading = useAppSelector((state) => state.ticker.loading);
  const selectedTickerData = useAppSelector(
    (state) => state.ticker.selectedTicker
  );

  if (isLoading || !selectedTickerData || !values) {
    return null;
  }

  const minValue = min(values, (d) => d.value);
  const maxValue = max(values, (d) => d.value);

  const startValue = Math.floor(minValue ?? 0);
  const endValue = Math.ceil(maxValue ?? 0);

  const ticks = Array.from(
    { length: endValue - startValue + 1 },
    (_, i) => startValue + i
  );

  return (
    <Card className="w-full mb-4 animate-out duration-1000">
      <CardHeader>
        <CardTitle>Simple Moving Average (SMA)</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <LineChart width={500} height={300} data={values}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) =>
              format(new Date(timestamp), "dd-MM-yy")
            }
          />
          <YAxis
            domain={[startValue, endValue]}
            ticks={ticks}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            labelFormatter={(timestamp) =>
              format(new Date(timestamp), "dd-MM-yyyy")
            }
            formatter={(value) => [`$${value}`, "Value"]}
          />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
}

export default TickerStockChart;
