import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';

const INITIAL_STATE = {
  baseCurrency: '',
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
      state.baseCurrency = payload;
    }),
});
export const currencyReducer = currencySlice.reducer;
