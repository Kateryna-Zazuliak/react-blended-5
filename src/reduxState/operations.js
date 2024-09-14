import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';
import { selectBaseCurrency } from './selector';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/fetchBaseCurrency',
  async (crd, thunkApi) => {
    const baseCurrency = selectBaseCurrency(thunkApi.getState());
    if (!baseCurrency) return thunkApi.rejectWithValue(null);

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
