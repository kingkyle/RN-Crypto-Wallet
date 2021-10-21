/* eslint-disable react-native/no-inline-styles */
import {COLORS, icons} from '../constants';
import {Home, Market, Portfolio, Profile} from '../screens';

import React from 'react';
import {TabIcon} from '../components';
import TradeButton from '../components/TradeButton';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {toggleTradeModalVisibility} from '../store/thunks/tabThunk';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const dispatch = useDispatch();
  const {isTradeModalVisible} = useSelector(state => state.tab);
  const handleTradeButton = () => {
    dispatch(toggleTradeModalVisibility(!isTradeModalVisible));
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 120,
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Porfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={isTradeModalVisible ? {width: 15, height: 15} : null}
                label="Trade"
                isTrade={true}
              />
            );
          },
          tabBarButton: props => {
            return <TradeButton {...props} onPress={handleTradeButton} />;
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
