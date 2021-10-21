/* eslint-disable react-hooks/exhaustive-deps */
import {Animated, View} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';

import {IconTextButton} from '../components';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector} from 'react-redux';

const MainLayout = ({children}) => {
  const {isTradeModalVisible} = useSelector(state => state.tab);
  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 260],
  });

  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);
  return (
    <View style={{flex: 1}}>
      {children}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
          }}
          opacity={modalAnimatedValue}
        />
      )}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          icon={icons.send}
          label="Transfer"
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          icon={icons.withdraw}
          label="Withdraw"
          containerStyle={{marginTop: SIZES.base}}
          onPress={() => console.log('Withdraw')}
        />
      </Animated.View>
    </View>
  );
};

export default MainLayout;
