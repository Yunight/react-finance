import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AllTickerDetails,
  SmaResponse,
  TickerNewsResultItem,
} from "../interfaces/interfaces";
import { ResultItem } from "../interfaces/interfaces";
import { getTickerNews } from "@/api/polygonApi";
import { AppDispatch } from "./store";

interface TickerState {
  data: AllTickerDetails[];
  loading: boolean;
  error: string | null;
  selectedTicker: AllTickerDetails | null;
  sma: SmaResponse | null;
  dailyTickers: ResultItem[];
  dailyTickersFilter: string;
  newsResponse: TickerNewsResultItem[] | null;
  searchInput: string;
  nextStockValueUpdate: string;
}

const initialState: TickerState = {
  data: [],
  loading: false,
  error: null,
  selectedTicker: null,
  sma: null,
  dailyTickers: [],
  dailyTickersFilter: "",
  newsResponse: null,
  searchInput: "",
  nextStockValueUpdate: "",
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

    resetSearchInput: (state) => {
      state.searchInput = "";
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
    getDailyNewsDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDailyNewsDataSuccess: (state, action: PayloadAction<ResultItem[]>) => {
      state.dailyTickers = action.payload;
      state.loading = false;
    },
    getDailyNewsDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setDailyNewsFilter: (state, action: PayloadAction<string>) => {
      state.dailyTickersFilter = action.payload;
    },
    resetData: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.selectedTicker = initialState.selectedTicker;
      state.sma = initialState.sma;
      state.dailyTickers = initialState.dailyTickers;
    },
    getNewsDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNewsDataSuccess: (
      state,
      action: PayloadAction<TickerNewsResultItem[]>
    ) => {
      state.newsResponse = action.payload;
      state.loading = false;
    },
    getNewsDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    setNextStockValueUpdate: (state, action: PayloadAction<string>) => {
      state.nextStockValueUpdate = action.payload;
    },
    resetNextStockValueUpdate: (state) => {
      state.nextStockValueUpdate = initialState.nextStockValueUpdate;
    },
    apiFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchNewsData = () => async (dispatch: AppDispatch) => {
  dispatch(getNewsDataStart());
  try {
    const res = await getTickerNews();
    const storingTime = new Date().getTime();
    const newsResponse = res.results;
    localStorage.setItem(
      "newsData",
      JSON.stringify({ storingTime, newsResponse })
    );
    dispatch(getNewsDataSuccess(res.results));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(getNewsDataFailure(error.message));
    } else {
      throw error;
    }
  }
};

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  setSearchInput,
  resetSearchInput,
  selectedTicker,
  resetSelectedTicker,
  getSmaStart,
  getSmaSuccess,
  getSmaFailure,
  resetSma,
  getDailyNewsDataStart,
  getDailyNewsDataSuccess,
  getDailyNewsDataFailure,
  setDailyNewsFilter,
  resetData,
  getNewsDataStart,
  getNewsDataSuccess,
  getNewsDataFailure,
  resetError,
  setNextStockValueUpdate,
  resetNextStockValueUpdate,
  apiFailure,
} = tickerSlice.actions;

export default tickerSlice.reducer;
