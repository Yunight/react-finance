import AutoCompleteSearch from "./AutoCompleteSearch";
import KpiDisplay from "./KpiDisplay";
import NewsCard from "./NewsCard";
import TickerDetails from "./TickerDetails";
import TickerStockChart from "./TickerStockChart";
import TickerStockValue from "./TickerStockValue";

const Daily = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <KpiDisplay />
  </main>
);

const Search = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <AutoCompleteSearch />
    <div className="flex justify-between">
      <TickerDetails />
      <div className="flex-col">
        <TickerStockChart />
        <TickerStockValue />
      </div>
    </div>
  </main>
);

const News = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <NewsCard />
  </main>
);

const Reports = () => (
  <main>
    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      Reports Content
    </div>
  </main>
);

export { Daily, Search, News, Reports };
