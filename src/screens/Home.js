import {BalanceInfo, Chart, IconTextButton} from '../components';
/* eslint-disable react-native/no-inline-styles */
import {COLORS, FONTS, SIZES, dummyData, icons} from '../constants';
/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {getCoinMarket, getMyHoldings} from '../store/thunks/marketThunk';
import {useDispatch, useSelector} from 'react-redux';

import {MainLayout} from '.';
import React from 'react';
import {useFocusEffect} from '@react-navigation/core';

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const {myHoldings, coins} = useSelector(state => state.market);
  const walletTotal = () => myHoldings.reduce((a, c) => a + (c.total || 0), 0);
  const valueChange = () =>
    myHoldings.reduce((a, c) => a + (c.holdingsValueChange7d || 0), 0);
  const perChange = () =>
    (valueChange() / (walletTotal() - valueChange())) * 100;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyHoldings({holdings: dummyData.holdings}));
      dispatch(getCoinMarket());
    }, []),
  );
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header  */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: COLORS.gray,
          }}>
          <BalanceInfo
            title="Your Wallet"
            amount={walletTotal()}
            percentage={perChange()}
            containerStyle={{marginTop: 50}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              marginBottom: -15,
              paddingHorizontal: SIZES.radius,
            }}>
            <IconTextButton
              label="Transfer"
              icon={icons.send}
              containerStyle={{flex: 1, height: 40, marginRight: SIZES.radius}}
              onPress={() => console.log('Transfer')}
            />
            <IconTextButton
              label="Withdraw"
              icon={icons.withdraw}
              containerStyle={{flex: 1, height: 40}}
              onPress={() => console.log('Withdraw')}
            />
          </View>
        </View>
        {/* Chart  */}
        {coins.length > 0 && (
          <Chart
            containerStyle={{
              marginTop: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding / 2,
            }}
            chartPrices={
              selectedCoin
                ? selectedCoin?.sparkline_in_7d?.price
                : coins[0]?.sparkline_in_7d?.price
            }
          />
        )}
        {/* Top Crypto  */}
        <FlatList
          data={coins}
          keyExtractor={i => i.id}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({item}) => {
            let itemChange = item.price_change_percentage_7d_in_currency;
            let priceColor =
              itemChange === 0
                ? COLORS.lightGray3
                : itemChange > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: 55,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelectedCoin(item)}>
                <View style={{width: 35}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                      textAlign: 'right',
                    }}>
                    ${item.current_price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {itemChange !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          width: 10,
                          height: 10,
                          tintColor: priceColor,
                          transform:
                            itemChange > 0
                              ? [{rotate: '40deg'}]
                              : [{rotate: '125deg'}],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        color: priceColor,
                        marginLeft: 5,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}>
                      {itemChange.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{marginBottom: 50}} />}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
