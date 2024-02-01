import { getGroupedDaily } from "@/api/polygonApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getKpiDataSuccess } from "@/redux/tickerSlice";

import { useCallback, useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Table } from "./ui/table";
import { Input } from "@/components/ui/input";

function DashboardKpiExamples() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const kpiData = useAppSelector((state) => state.ticker.kpiData);
  const [filter, setFilter] = useState("");

  const fetchAndStoreData = useCallback(
    (date: string) => {
      getGroupedDaily({ date }).then((res) => {
        localStorage.setItem(
          "kpiData",
          JSON.stringify({ date, results: res.results })
        );
        dispatch(getKpiDataSuccess(res.results));
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const currentDate = new Date();

    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = ("0" + (yesterday.getMonth() + 1)).slice(-2);
    const day = ("0" + yesterday.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;

    const storedData = localStorage.getItem("kpiData");

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
  }, [dispatch, fetchAndStoreData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kpiData
    .slice(indexOfFirstItem, indexOfLastItem)
    .filter((item) => item.T.toLowerCase().includes(filter.toLowerCase()));
  const totalPages = Math.ceil(kpiData.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Input
          type="text"
          placeholder="Filter here"
          onChange={(event) => setFilter(event.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-1/3"
        />
        <div className="flex gap-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
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
          <div key={index} className="max-w-full">
            <Card className="w-[350px] max-w-full ">
              <CardHeader>
                <CardTitle className="font-semibold leading-none tracking-tight ">
                  {item.T}
                </CardTitle>
                <CardDescription>Exchange Symbol : {item.T}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <tbody>
                    <tr>
                      <td>Close Price</td>
                      <td>{item.c}</td>
                    </tr>
                    <tr>
                      <td>Highest Price</td>
                      <td>{item.h}</td>
                    </tr>
                    <tr>
                      <td>Lowest Price</td>
                      <td>{item.l}</td>
                    </tr>
                    <tr>
                      <td>Number of Transactions</td>
                      <td>{item.n}</td>
                    </tr>
                    <tr>
                      <td>Open Price</td>
                      <td>{item.o}</td>
                    </tr>
                    <tr>
                      <td>OTC Ticker</td>
                      <td>{item.otc ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <td>End of Aggregate Window</td>
                      <td>{new Date(item.t).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Trading Volume</td>
                      <td>{item.v}</td>
                    </tr>
                    <tr>
                      <td>Volume Weighted Average Price</td>
                      <td>{item.vw}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default DashboardKpiExamples;
