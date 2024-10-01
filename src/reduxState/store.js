import { configureStore } from '@reduxjs/toolkit';
import { currencyReducer } from './slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filtersReducer } from './filterSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    currency: persistReducer(persistConfig, currencyReducer),
    filter: filtersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
