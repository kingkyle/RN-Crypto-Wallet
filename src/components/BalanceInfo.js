/* eslint-disable react-native/no-inline-styles */
import {COLORS, FONTS, SIZES, icons} from '../constants';
import {Image, Text, View} from 'react-native';

import React from 'react';

const BalanceInfo = ({title, amount, percentage, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      <View>
        <Text style={{...FONTS.h3, color: COLORS.lightGray}}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={{...FONTS.h3, color: COLORS.lightGray3}}>$</Text>
        <Text
          style={{...FONTS.h2, color: COLORS.white, marginLeft: SIZES.base}}>
          {amount.toLocaleString()}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray3,
            marginLeft: SIZES.base,
          }}>
          USD
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {percentage !== 0 && (
          <Image
            source={icons.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: 'center',
              tintColor: percentage > 0 ? COLORS.lightGreen : COLORS.red,
              transform:
                percentage > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
            }}
          />
        )}
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'center',
            color:
              percentage === 0
                ? COLORS.lightGray3
                : percentage > 0
                ? COLORS.lightGreen
                : COLORS.red,
            ...FONTS.h4,
          }}>
          {percentage.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            alignSelf: 'flex-end',
            color: COLORS.lightGray3,
            ...FONTS.h5,
          }}>
          7d Change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
