import {handleError, handleLoading, handleSuccess} from '../shared';

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  myHoldings: [],
  coins: [],
  errors: null,
  loading: false,
};

export const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setHoldings: (state, {payload}) => {
      state.myHoldings = payload;
    },
    setCoinMarket: (state, {payload}) => {
      state.coins = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(handleError);
    builder.addMatcher(handleLoading);
    builder.addMatcher(handleSuccess);
  },
});

export const {setHoldings, setCoinMarket} = marketSlice.actions;
export default marketSlice.reducer;
