import TickerSearchInput from "./TickerSearchInput";
import DailyTickersDisplay from "./DailyTickersDisplay";
import NewsCardDisplay from "./NewsCardDisplay";
import TickerDetails from "./TickerSearchDetails";
import TickerStockChart from "./TickerSearchChart";
import TickerStockValue from "./TickerSearchValue";

const Daily = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <DailyTickersDisplay />
  </main>
);

const Search = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <TickerSearchInput />
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
    <NewsCardDisplay />
  </main>
);

export { Daily, Search, News };
