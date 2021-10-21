import {COLORS, FONTS, SIZES} from '../constants';
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';

import React from 'react';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
      }}>
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
