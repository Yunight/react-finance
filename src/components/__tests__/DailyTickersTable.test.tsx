import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tickerReducer from "@/redux/tickerSlice";
import DailyTickersTable from "@/components/DailyTickersTable";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useDailyTickers } from "@/hooks/useDailyTickers";
import { dateConvert } from "@/lib/utils";

jest.mock("@/hooks/useDailyTickers");

const mockHandleButtonClick = jest.fn();

beforeEach(() => {
  (useDailyTickers as jest.Mock).mockReturnValue({
    handleButtonClick: mockHandleButtonClick,
  });
});

test("renders without crashing", () => {
  const store = configureStore({ reducer: { ticker: tickerReducer } });

  const mockItem = {
    c: 100,
    h: 200,
    l: 50,
    n: 10,
    o: 150,
    otc: false,
    t: new Date("2024-06-02").getTime(),
    v: 1000,
    vw: 160,
    T: "Test Ticker",
  };

  render(
    <Provider store={store}>
      <Router>
        <DailyTickersTable item={mockItem} />
      </Router>
    </Provider>
  );

  expect(screen.getByText("Close Price")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByText("Highest Price")).toBeInTheDocument();
  expect(screen.getByText("200")).toBeInTheDocument();
  expect(screen.getByText("Lowest Price")).toBeInTheDocument();
  expect(screen.getByText("50")).toBeInTheDocument();
  expect(screen.getByText("Number of Transactions")).toBeInTheDocument();
  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText("Open Price")).toBeInTheDocument();
  expect(screen.getByText("150")).toBeInTheDocument();
  expect(screen.getByText("OTC Ticker")).toBeInTheDocument();
  expect(screen.getByText("No")).toBeInTheDocument();
  expect(screen.getByText("End of Aggregate Window")).toBeInTheDocument();
  expect(screen.getByText(dateConvert(mockItem.t))).toBeInTheDocument();
  expect(screen.getByText("Trading Volume")).toBeInTheDocument();
  expect(screen.getByText("1000")).toBeInTheDocument();
  expect(screen.getByText("Volume Weighted Average Price")).toBeInTheDocument();
  expect(screen.getByText("160")).toBeInTheDocument();
  expect(screen.getByText("Click here for details")).toBeInTheDocument();
});
