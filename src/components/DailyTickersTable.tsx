import { ResultItem } from "@/types/types";

import { dateConvert } from "@/lib/utils";

interface DailyTickersTableProps {
  item: ResultItem;
}

const DailyTickersTable = ({ item }: DailyTickersTableProps) => {
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
            <th>Close Price</th>
            <td>{item.c}</td>
          </tr>

          <tr>
            <th>Highest Price</th>
            <td>{item.h}</td>
          </tr>

          <tr>
            <th>Lowest Price</th>
            <td>{item.l}</td>
          </tr>

          <tr>
            <th>Number of Transactions</th>
            <td>{item.n}</td>
          </tr>

          <tr>
            <th>Open Price</th>
            <td>{item.o}</td>
          </tr>

          <tr>
            <th>OTC Ticker</th>
            <td>{item.otc ? "Yes" : "No"}</td>
          </tr>

          <tr>
            <th>End of Aggregate Window</th>
            <td>{dateConvert(item.t)}</td>
          </tr>

          <tr>
            <th>Trading Volume</th>
            <td>{item.v}</td>
          </tr>

          <tr>
            <th>Volume Weighted Average Price</th>
            <td>{item.vw}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DailyTickersTable;
