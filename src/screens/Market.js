/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, SIZES, constants, icons} from '../constants';
import {HeaderBar, TextButton} from '../components';
import {useDispatch, useSelector} from 'react-redux';

import {LineChart} from 'react-native-chart-kit';
import {MainLayout} from '.';
import React from 'react';
import {getCoinMarket} from '../store/thunks/marketThunk';

const TabIndicator = ({measureLayout, scrollX, marketTabs}) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [{translateX}],
      }}
    />
  );
};

const Tabs = ({marketTabs, scrollX, onPress}) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);

  const containerRef = React.useRef();
  React.useEffect(() => {
    let ml = [];
    marketTabs.forEach(marketTab => {
      marketTab.ref.current.measureLayout(
        containerRef?.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [!!containerRef.current]);
  return (
    <View style={{flexDirection: 'row'}} ref={containerRef}>
      {/* Tab Indicator  */}
      {measureLayout.length > 0 && (
        <TabIndicator
          measureLayout={measureLayout}
          scrollX={scrollX}
          marketTabs={marketTabs}
        />
      )}
      {marketTabs.map((item, i) => (
        <TouchableOpacity
          key={`MarketTab-${i}`}
          style={{flex: 1}}
          onPress={() => onPress(i)}>
          <View
            ref={item.ref}
            style={{
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Market = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = React.useRef();
  const dispatch = useDispatch();
  const {coins} = useSelector(state => state.market);

  const onMarketTabPress = React.useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  const marketTabs = constants.marketTabs.map(marketTab => ({
    ...marketTab,
    ref: React.createRef(),
  }));

  React.useEffect(() => {
    dispatch(getCoinMarket());
  }, []);
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Header  */}
        <HeaderBar title="Market" />
        {/* Tabs  */}
        <View
          style={{
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.gray,
          }}>
          <Tabs
            marketTabs={marketTabs}
            scrollX={scrollX}
            onPress={onMarketTabPress}
          />
        </View>
        {/* Button Texts  */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            marginHorizontal: SIZES.radius,
          }}>
          <TextButton label="USD" />
          <TextButton
            label="% (7d)"
            containerStyle={{marginLeft: SIZES.base}}
          />
          <TextButton label="Top" containerStyle={{marginLeft: SIZES.base}} />
        </View>
        {/* List  */}
        <Animated.FlatList
          ref={marketTabScrollViewRef}
          data={marketTabs}
          contentContainerStyle={{marginTop: SIZES.padding}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          key={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={() => {
            return (
              <View
                style={{
                  flex: 1,
                  width: SIZES.width,
                }}>
                <FlatList
                  data={coins}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => {
                    let itemChange =
                      item.price_change_percentage_7d_in_currency;
                    let priceColor =
                      itemChange === 0
                        ? COLORS.lightGray3
                        : itemChange > 0
                        ? COLORS.lightGreen
                        : COLORS.red;
                    return (
                      <View
                        style={{
                          marginBottom: SIZES.radius,
                          flexDirection: 'row',
                          paddingHorizontal: SIZES.padding,
                        }}>
                        {/* Coin Section  */}
                        <View
                          style={{
                            flex: 1.5,
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
                        {/* LinChart Section  */}
                        <View style={{flex: 1, alignItems: 'center'}}>
                          <LineChart
                            data={{
                              datasets: [{data: item.sparkline_in_7d.price}],
                            }}
                            withDots={false}
                            withVerticalLabels={false}
                            withHorizontalLabels={false}
                            withInnerLines={false}
                            withVerticalLines={false}
                            width={100}
                            height={60}
                            chartConfig={{
                              color: () => priceColor,
                            }}
                            bezier
                            style={{
                              paddingRight: 0,
                            }}
                          />
                        </View>
                        {/* Amount Section  */}
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}>
                          <Text style={{...FONTS.h4, color: COLORS.white}}>
                            $ {item.current_price.toLocaleString()}
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
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Market;
