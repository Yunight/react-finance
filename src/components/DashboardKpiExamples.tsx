import { getGroupedDaily } from "@/api/polygonApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getKpiDataFailure, getKpiDataSuccess } from "@/redux/tickerSlice";
import { Label } from "@/components/ui/label";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { dateConvert } from "@/lib/utils";

function DashboardKpiExamples() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const kpiData = useAppSelector((state) => state.ticker.kpiData);
  const [filter, setFilter] = useState("");

  const fetchAndStoreData = useCallback(
    (date: string) => {
      getGroupedDaily({ date })
        .then((res) => {
          localStorage.setItem(
            "kpiData",
            JSON.stringify({ date, results: res.results })
          );
          dispatch(getKpiDataSuccess(res.results));
        })
        .catch((error) => dispatch(getKpiDataFailure(error.message)));
    },
    [dispatch]
  );

  const filteredItems = useMemo(() => {
    return kpiData.filter((item) =>
      item.T.toLowerCase().includes(filter.toLowerCase())
    );
  }, [kpiData, filter]);

  useEffect(() => {
    const currenTableCellate = new Date();
    const yesterday = new Date(currenTableCellate);
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    const day = ("0" + yesterday.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    const storedData = localStorage.getItem("kpiData");

    setCurrentPage(1);

    if (storedData) {
      const { date, results } = JSON.parse(storedData);
      if (date === formattedDate) {
        dispatch(getKpiDataSuccess(results));
      } else {
        fetchAndStoreData(formattedDate);
      }
    } else {
      fetchAndStoreData(formattedDate);
    }
  }, [dispatch, fetchAndStoreData, filter]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFilterChange = useCallback(
    (event: { target: { value: SetStateAction<string> } }) => {
      setFilter(event.target.value);
    },
    []
  );

  return (
    <>
      <div className="flex items-center space-x-2 mb-8 ">
        <Label htmlFor="tickers" className="text-2xl">
          Display and Filter - Grouped Daily Tickers
        </Label>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Filter here"
            onChange={handleFilterChange}
            className="border-2 border-gray-300 rounded-md p-2 min-w-1/3"
          />
        </div>
        <div className="">{filteredItems.length} results</div>
        <div className="flex gap-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="flex justify-stretch w-screen flex-wrap max-w-7xl mx-auto gap-20">
        {currentItems.map((item, index) => (
          <Card key={index} className="w-[350px] max-w-full ">
            <CardHeader>
              <CardTitle className="font-semibold leading-none tracking-tight ">
                {item.T}
              </CardTitle>
              <CardDescription>Grouped Daily</CardDescription>
              <Separator />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Data</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Close Price</TableCell>
                    <TableCell>{item.c}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Highest Price</TableCell>
                    <TableCell>{item.h}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Lowest Price</TableCell>
                    <TableCell>{item.l}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Number of Transactions</TableCell>
                    <TableCell>{item.n}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Open Price</TableCell>
                    <TableCell>{item.o}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>OTC Ticker</TableCell>
                    <TableCell>{item.otc ? "Yes" : "No"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>End of Aggregate Window</TableCell>
                    <TableCell>{dateConvert(item.t)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Trading Volume</TableCell>
                    <TableCell>{item.v}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Volume Weighted Average Price</TableCell>
                    <TableCell>{item.vw}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default DashboardKpiExamples;
