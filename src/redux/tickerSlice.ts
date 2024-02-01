import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AllTickerDetails,
  SmaResponse,
  TickerNewsResult,
} from "../types/types";
import { ResultItem } from "../types/types";

interface TickerState {
  data: AllTickerDetails[];
  loading: boolean;
  error: string | null;
  selectedTicker: AllTickerDetails | null;
  sma: SmaResponse | null;
  kpiData: ResultItem[];
  newsData: TickerNewsResult[];
  searchInput: string;
}

const initialState: TickerState = {
  data: [],
  loading: false,
  error: null,
  selectedTicker: null,
  sma: null,
  kpiData: [],
  newsData: [],
  searchInput: "",
};

const tickerSlice = createSlice({
  name: "tickers",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<AllTickerDetails[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    selectedTicker: (state, action: PayloadAction<AllTickerDetails>) => {
      state.selectedTicker = action.payload;
    },
    resetSelectedTicker: (state) => {
      state.selectedTicker = null;
    },
    getSmaStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSmaSuccess: (state, action: PayloadAction<SmaResponse>) => {
      state.sma = action.payload;
      state.loading = false;
    },
    getSmaFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSma: (state) => {
      state.sma = null;
    },
    getKpiDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getKpiDataSuccess: (state, action: PayloadAction<ResultItem[]>) => {
      state.kpiData = action.payload;
      state.loading = false;
    },
    getKpiDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetData: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.selectedTicker = initialState.selectedTicker;
      state.sma = initialState.sma;
      state.kpiData = initialState.kpiData;
    },
    getNewsDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNewsDataSuccess: (state, action: PayloadAction<TickerNewsResult[]>) => {
      state.newsData = action.payload;
      state.loading = false;
    },
    getNewsDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  setSearchInput,
  selectedTicker,
  resetSelectedTicker,
  getSmaStart,
  getSmaSuccess,
  getSmaFailure,
  resetSma,
  getKpiDataStart,
  getKpiDataSuccess,
  getKpiDataFailure,
  resetData,
  getNewsDataStart,
  getNewsDataSuccess,
  getNewsDataFailure,
  resetError,
} = tickerSlice.actions;

export default tickerSlice.reducer;
