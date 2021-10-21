import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import React from 'react';
import Tabs from './src/navigation/tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './src/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="MainLayout">
          <Stack.Screen name="MainLayout" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
