import {createAsyncThunk} from '@reduxjs/toolkit';
import {toggleTradeModal} from '../slices/tabSlice';

export const toggleTradeModalVisibility = createAsyncThunk(
  'tab/tradeModalVisiblilty',
  (data, {dispatch}) => {
    dispatch(toggleTradeModal(data));
  },
);
