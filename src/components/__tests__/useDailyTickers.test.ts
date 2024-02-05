import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getGroupedDaily, getSma, getTickers } from "@/api/polygonApi";
import { useNavigate } from "react-router-dom";
import { act, renderHook } from "@testing-library/react";
import { useDailyTickers } from "@/hooks/useDailyTickers";

jest.mock("@/redux/store");
jest.mock("@/api/polygonApi");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useDailyTickers", () => {
  let mockDispatch: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue([]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("fetchAndStoreData dispatches actions and stores data", async () => {
    const mockData = { results: [] };
    (getGroupedDaily as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useDailyTickers());
    await act(() => result.current.fetchAndStoreData("2022-01-01"));

    expect(mockDispatch).toHaveBeenCalled();
    expect(localStorage.getItem("dailyNews")).toEqual(
      JSON.stringify({ date: "2022-01-01", results: [] })
    );
  });

  it("handleFilterChange dispatches an action", () => {
    const { result } = renderHook(() => useDailyTickers());
    act(() => result.current.handleFilterChange({ target: { value: "test" } }));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("handleButtonClick dispatches actions and navigates", async () => {
    const mockData = { results: [{ ticker: "test", name: "Test" }] };
    (getTickers as jest.Mock).mockResolvedValue(mockData);
    (getSma as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useDailyTickers());
    await act(() => result.current.handleButtonClick("test"));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/search");
  });
});
