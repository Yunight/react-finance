import { useAppSelector } from "@/redux/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

const TickerStockValue = () => {
  const values = useAppSelector((state) => state.ticker.sma?.results.values);
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
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>Latest Stock Value</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-xl font-bold">${mostRecentStockValue}</div>
        <div className="text-sm text-muted-foreground pt-4">
          Previous value : ${values?.[1].value ?? 0}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Last update : {format(new Date(lasTimeUpdate), "dd-MM-yyyy")}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TickerStockValue;
