import {BalanceInfo, Chart} from '../components';
import {COLORS, FONTS, SIZES, dummyData, icons} from '../constants';
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {MainLayout} from '.';
import React from 'react';
import {getMyHoldings} from '../store/thunks/marketThunk';
import {useFocusEffect} from '@react-navigation/core';

const Portfolio = () => {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const {myHoldings} = useSelector(state => state.market);
  const walletTotal = () => myHoldings.reduce((a, c) => a + (c.total || 0), 0);
  const valueChange = () =>
    myHoldings.reduce((a, c) => a + (c.holdingsValueChange7d || 0), 0);
  const perChange = () =>
    (valueChange() / (walletTotal() - valueChange())) * 100;
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyHoldings({holdings: dummyData.holdings}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: COLORS.gray,
          }}>
          <Text
            style={{color: COLORS.white, ...FONTS.largeTitle, marginTop: 50}}>
            Porfolio
          </Text>
          <BalanceInfo
            title="Current Balance"
            amount={walletTotal()}
            percentage={perChange()}
            containerStyle={{
              marginTop: SIZES.radius,
              marginBottom: SIZES.padding,
            }}
          />
        </View>
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding / 2,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline7d?.value
              : myHoldings[0]?.sparkline7d?.value
          }
        />
        <FlatList
          data={myHoldings}
          keyExtractor={i => i.id}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, ...FONTS.h2}}>
                Your Assets
              </Text>
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text style={{flex: 1, color: COLORS.lightGray3}}>Assets</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          renderItem={({item}) => {
            let itemChange = item.priceChangePerc7dInCurrency;
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
                }}
                onPress={() => setSelectedCoin(item)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                      marginLeft: SIZES.radius,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h4,
                      textAlign: 'right',
                      lineHeight: 15,
                    }}>
                    ${item.currentPrice.toLocaleString()}
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
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}>
                    ${item.total.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}>
                    {item.qty.toFixed(2)} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Portfolio;
