import { useAppSelector } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { dateConvert } from "@/lib/utils";

const TickerDetails = () => {
  const selectedTickerData = useAppSelector(
    (state) => state.ticker.selectedTicker
  );
  const isLoading = useAppSelector((state) => state.ticker.loading);

  if (!selectedTickerData || isLoading) {
    return null;
  }

  return (
    <Card className="w-1/2 animate-slide-in-from-left">
      <CardHeader>
        <CardTitle>{selectedTickerData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Details of the current selected Ticker</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(selectedTickerData).map((key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/_/g, " ")}
                </TableCell>
                <TableCell>
                  {key === "last_updated_utc"
                    ? dateConvert(
                        selectedTickerData[
                          key as keyof typeof selectedTickerData
                        ] as string
                      )
                    : key === "active"
                    ? "Yes"
                    : selectedTickerData[
                        key as keyof typeof selectedTickerData
                      ]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TickerDetails;
