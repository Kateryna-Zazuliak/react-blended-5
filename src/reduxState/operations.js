import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';
import { selectBaseCurrency } from './selector';
import { exchangeCurrency, latestRates } from 'service/exchangeAPI';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (crd, thunkApi) => {
    const baseCurrency = selectBaseCurrency(thunkApi.getState());
    if (baseCurrency) {
      return thunkApi.rejectWithValue('We already have base currency!');
    }
    try {
      const result = await getUserInfo({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
      return result.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const fetchExchangeInfo = createAsyncThunk(
  'currency/fetchExchangeInfo',
  async ({ from, to, amount }, thunkApi) => {
    try {
      const response = await exchangeCurrency({ from, to, amount });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const fetchLatestRates = createAsyncThunk(
  'currency/fetchLatestRates',
  async (baseCurrency, thunkApi) => {
    try {
      const response = await latestRates(baseCurrency);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
