import {COLORS, FONTS} from '../constants';
/* eslint-disable react-native/no-inline-styles */
import {Image, Text, View} from 'react-native';

import React from 'react';

const TabIcon = ({focused, isTrade, label, icon, iconStyle}) => {
  if (isTrade) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: COLORS.black,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: COLORS.white,
            ...iconStyle,
          }}
        />
        <Text style={{color: COLORS.white, ...FONTS.h4}}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            height: 25,
            width: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
          }}
        />
        <Text
          style={{
            color: focused ? COLORS.white : COLORS.secondary,
            ...FONTS.h4,
          }}>
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
