import { ResultItem } from "@/types/types";

import { dateConvert } from "@/lib/utils";

interface KpiTableProps {
  item: ResultItem;
}

const KpiTable = ({ item }: KpiTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Data</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>Close Price</th>
            <td>{item.c}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>Highest Price</th>
            <td>{item.h}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>Lowest Price</th>
            <td>{item.l}</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>Number of Transactions</th>
            <td>{item.n}</td>
          </tr>
          {/* row 5 */}
          <tr>
            <th>Open Price</th>
            <td>{item.o}</td>
          </tr>
          {/* row 6 */}
          <tr>
            <th>OTC Ticker</th>
            <td>{item.otc ? "Yes" : "No"}</td>
          </tr>
          {/* row 7 */}
          <tr>
            <th>End of Aggregate Window</th>
            <td>{dateConvert(item.t)}</td>
          </tr>
          {/* row 8 */}
          <tr>
            <th>Trading Volume</th>
            <td>{item.v}</td>
          </tr>
          {/* row 9 */}
          <tr>
            <th>Volume Weighted Average Price</th>
            <td>{item.vw}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default KpiTable;
