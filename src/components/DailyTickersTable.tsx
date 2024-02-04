import { ResultItem } from "@/interfaces/interfaces";
import { dateConvert } from "@/lib/utils";
import {
  FcBearish,
  FcBullish,
  FcOvertime,
  FcTodoList,
  FcAdvance,
  FcDonate,
  FcCalendar,
  FcBarChart,
  FcCurrencyExchange,
  FcLineChart,
} from "react-icons/fc";
import { ThComponent } from "./ThComponent";
import { useDailyTickers } from "@/hooks/useDailyTickers";

interface DailyTickersTableProps {
  item: ResultItem;
}

const DailyTickersTable = ({ item }: DailyTickersTableProps) => {
  const { handleButtonClick } = useDailyTickers();

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Data</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <ThComponent icon={<FcOvertime />}>Close Price</ThComponent>
            <td>{item.c}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcBullish />}>Highest Price</ThComponent>
            <td>{item.h}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcBearish />}>Lowest Price</ThComponent>
            <td>{item.l}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcTodoList />}>
              Number of Transactions
            </ThComponent>
            <td>{item.n}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcAdvance />}>Open Price</ThComponent>
            <td>{item.o}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcDonate />}>OTC Ticker</ThComponent>
            <td>{item.otc ? "Yes" : "No"}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcCalendar />}>
              End of Aggregate Window
            </ThComponent>
            <td>{dateConvert(item.t)}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcBarChart />}>Trading Volume</ThComponent>
            <td>{item.v}</td>
          </tr>

          <tr>
            <ThComponent icon={<FcCurrencyExchange />}>
              Volume Weighted Average Price
            </ThComponent>
            <td>{item.vw}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center" colSpan={2}>
              <button
                className="btn btn-outline btn-block"
                onClick={() => handleButtonClick(item.T)}
              >
                <FcLineChart size={30} /> Click here for details
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DailyTickersTable;
