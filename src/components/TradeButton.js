/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';

const TradeButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default TradeButton;
