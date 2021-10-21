import {COLORS, FONTS, SIZES} from '../constants';
import {Image, Text, TouchableOpacity} from 'react-native';

/* eslint-disable react-native/no-inline-styles */
import React from 'react';

const IconTextButton = ({label, icon, onPress, containerStyle}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{height: 20, width: 20}}
      />
      <Text style={{marginLeft: SIZES.base, ...FONTS.h3}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default IconTextButton;
