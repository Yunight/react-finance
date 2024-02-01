import AutoCompleteSearch from "./AutoCompleteSearch";
import DashboardKpiExamples from "./DashboardKpiExamples";
import NewsCard from "./NewsCard";
import TickerDetails from "./TickerDetails";
import TickerStockChart from "./TickerStockChart";
import TickerStockValue from "./TickerStockValue";

const Home = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <DashboardKpiExamples />
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

export { Home, Search, News, Reports };
