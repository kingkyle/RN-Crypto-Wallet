import {X_RAPIDAPI_HOST, X_RAPIDAPI_KEY} from '@env';
import {setCoinMarket, setHoldings} from '../slices/marketSlice';

import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

const headers = {
  'Content-Type': 'application/json',
  'x-rapidapi-host': X_RAPIDAPI_HOST,
  'x-rapidapi-key': X_RAPIDAPI_KEY,
};

export const getMyHoldings = createAsyncThunk(
  'market/getMyHoldings',
  async (data, {dispatch, rejectWithValue}) => {
    let currency = data?.currency || 'usd',
      priceChangePerc = data?.priceChangePerc || '7d',
      sparkline = data?.sparkline || true,
      perPage = data?.perPage || 10,
      orderBy = data?.orderBy || 'market_cap_desc',
      page = data?.page || 1,
      holdings = data?.holdings || [];
    const options = {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/markets',
      params: {
        vs_currency: currency,
        price_change_percentage: priceChangePerc,
        page: page,
        sparkline: sparkline,
        per_page: perPage,
        ids: holdings.map(i => i.id).join(','),
        order: orderBy,
      },
      headers,
    };

    try {
      const res = await axios.get(options.url, {
        params: options.params,
        headers,
      });

      if (res.status === 200) {
        const myHoldings = res.data.map(item => {
          let coin = data.holdings.find(c => c.id === item.id);
          let price7d =
            item.current_price +
            (1 + item.price_change_percentage_7d_in_currency * 0.01);
          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            currentPrice: item.current_price,
            qty: coin.qty,
            total: coin.qty * item.current_price,
            priceChangePerc7dInCurrency:
              item.price_change_percentage_7d_in_currency,
            holdingsValueChange7d: (item.current_price - price7d) * coin.qty,
            sparkline7d: {
              value: item.sparkline_in_7d.price.map(price => price * coin.qty),
            },
          };
        });
        return dispatch(setHoldings(myHoldings));
      }
      return dispatch(setHoldings([]));
    } catch (error) {
      // return rejectWithValue(error.response);
    }
  },
);

export const getCoinMarket = createAsyncThunk(
  'market/coinmarket',
  async (data, {dispatch, rejectWithValue}) => {
    let currency = data?.currency || 'usd',
      priceChangePerc = data?.priceChangePerc || '7d',
      sparkline = data?.sparkline || true,
      perPage = data?.perPage || 10,
      orderBy = data?.orderBy || 'market_cap_desc',
      page = data?.page || 1;

    const options = {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/markets',
      params: {
        vs_currency: currency,
        price_change_percentage: priceChangePerc,
        page: page,
        sparkline: sparkline,
        per_page: perPage,
        order: orderBy,
      },
      headers,
    };
    try {
      const res = await axios.get(options.url, {
        params: options.params,
        headers,
      });
      if (res.status === 200) {
        return dispatch(setCoinMarket(res?.data));
      }
      return dispatch(setCoinMarket([]));
    } catch (error) {
      console.log(error.response);
      // return rejectWithValue(error);
    }
  },
);
