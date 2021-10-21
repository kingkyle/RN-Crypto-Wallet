import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isTradeModalVisible: false,
};

export const tabSlice = createSlice({
  name: 'Tab',
  initialState,
  reducers: {
    toggleTradeModal: (state, {payload}) => {
      state.isTradeModalVisible = payload;
    },
  },
});

export const {toggleTradeModal} = tabSlice.actions;
export default tabSlice.reducer;
