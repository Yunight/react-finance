import { ResultItem } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { dateConvert } from "@/lib/utils";

interface KpiTableProps {
  item: ResultItem;
}

const KpiTable = ({ item }: KpiTableProps) => {
  return (
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
  );
};

export default KpiTable;
