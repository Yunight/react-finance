import AutoCompleteSearch from "./TickerSearchInput";
import TickerSearchInput from "./DailyTickersDisplay";
import NewsCardDisplay from "./NewsCardDisplay";
import TickerDetails from "./TickerSearchDetails";
import TickerStockChart from "./TickerSearchChart";
import TickerStockValue from "./TickerSearchValue";

const Daily = () => (
  <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
    <TickerSearchInput />
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
    <NewsCardDisplay />
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
