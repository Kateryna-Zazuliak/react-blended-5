import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeInfo,
  fetchLatestRates,
} from './operations';

const INITIAL_STATE = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  error: null,
  rates: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: INITIAL_STATE,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrency.pending, handlePending)
      .addCase(fetchBaseCurrency.rejected, handleRejected)
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.baseCurrency = payload;
        state.error = null;
      })
      .addCase(fetchExchangeInfo.pending, handlePending)
      .addCase(fetchExchangeInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = {
          to: payload.to,
          from: payload.from,
          amount: payload.amount,
          rate: payload.rate,
          result: payload.result,
        };
        state.error = null;
      })
      .addCase(fetchExchangeInfo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchLatestRates.pending, handlePending)
      .addCase(fetchLatestRates.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.rates = payload;
        state.error = null;
      })
      .addCase(fetchLatestRates.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.rates = [];
      });
  },
});

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
export const currencyReducer = currencySlice.reducer;
export const { setBaseCurrency } = currencySlice.actions;
