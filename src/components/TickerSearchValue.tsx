import { useAppSelector } from "@/redux/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "@/components/ui/separator";
import { dateConvert } from "@/lib/utils";

const TickerStockValue = () => {
  const values = useAppSelector((state) => state.ticker.sma?.results.values);
  const nextUpdateTime = useAppSelector(
    (state) => state.ticker.nextStockValueUpdate
  );

  const mostRecentStockValue = values?.[0].value ?? 0;
  const lasTimeUpdate = values?.[0].timestamp ?? 0;
  const isLoading = useAppSelector((state) => state.ticker.loading);
  const selectedTickerData = useAppSelector(
    (state) => state.ticker.selectedTicker
  );

  if (isLoading || !selectedTickerData || !values) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <Card className="w-1/2 mb-4">
        <CardHeader>
          <CardTitle>Latest Stock Value</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>

            <div className="stat-value text-success">
              ${mostRecentStockValue.toFixed(3)}
            </div>
            <div className="stat-desc">
              Previous value : ${values?.[1].value.toFixed(3) ?? 0}
            </div>
          </div>

          <div className="text-xl font-bold"></div>
          <div className="text-sm text-muted-foreground pt-4"></div>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Last update : {dateConvert(lasTimeUpdate)}
          </div>
        </CardFooter>
      </Card>

      <Card className="w-1/2 mb-4">
        <CardHeader>
          <CardTitle>Next Update at :</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="stat">
            <div className="stat-value">{nextUpdateTime}</div>
          </div>

          <div className="text-xl font-bold"></div>
          <div className="text-sm text-muted-foreground pt-4"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TickerStockValue;
