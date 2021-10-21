import {configureStore} from '@reduxjs/toolkit';
import marketSlice from './slices/marketSlice';
import tabSlice from './slices/tabSlice';

export const store = configureStore({
  reducer: {
    tab: tabSlice,
    market: marketSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
