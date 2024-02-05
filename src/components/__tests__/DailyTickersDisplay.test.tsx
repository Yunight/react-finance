import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from "@/redux/tickerSlice";
import DailyTickersDisplay from "@/components/DailyTickersDisplay";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useDailyTickers } from "@/hooks/useDailyTickers";
import { usePagination } from "@/hooks/usePagination";
import { useAppSelector } from "@/redux/store";
import useDailyTickersStoring from "@/hooks/useDailyTickersStoring";

jest.mock("@/hooks/useDailyTickers");
jest.mock("@/hooks/usePagination");
jest.mock("@/redux/store");
jest.mock("@/hooks/useDailyTickersStoring");

const mockFetchAndStoreData = jest.fn();
const mockHandleFilterChange = jest.fn();
const mockHandleNext = jest.fn();
const mockHandlePrevious = jest.fn();

beforeEach(() => {
  (useDailyTickers as jest.Mock).mockReturnValue({
    fetchAndStoreData: mockFetchAndStoreData,
    dailyNews: [],
    handleFilterChange: mockHandleFilterChange,
  });
  (usePagination as jest.Mock).mockReturnValue({
    handleNext: mockHandleNext,
    handlePrevious: mockHandlePrevious,
    currentItems: [],
    currentPage: 1,
    totalPages: 1,
  });
  (useAppSelector as jest.Mock).mockReturnValue("");
  (useDailyTickersStoring as jest.Mock).mockReturnValue(null);
});

test("renders without crashing", () => {
  const store = configureStore({ reducer: { ticker: tickerReducer } });

  render(
    <Provider store={store}>
      <Router>
        <DailyTickersDisplay />
      </Router>
    </Provider>
  );

  expect(
    screen.getByText("Display and Filter - Grouped Daily Tickers")
  ).toBeInTheDocument();
});

test("filters correctly", () => {
  const store = configureStore({ reducer: { ticker: tickerReducer } });

  render(
    <Provider store={store}>
      <Router>
        <DailyTickersDisplay />
      </Router>
    </Provider>
  );

  const input = screen.getByPlaceholderText("Filter here");
  fireEvent.change(input, { target: { value: "test" } });

  expect(mockHandleFilterChange).toHaveBeenCalled();
});
