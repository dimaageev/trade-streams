/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Operations from '../screens/Operations';
import GroupedOperations from '../screens/GroupedOperations';
import {View, ViewStyle} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarIcon: () => <View style={$icon} />,
        }}>
        <Tab.Screen name="Operations" component={Operations} />
        <Tab.Screen name="GroupedOperations" component={GroupedOperations} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const $icon: ViewStyle = {
  width: 24,
  height: 24,
  backgroundColor: 'blue',
  borderRadius: 12,
};

export default TabNavigator;
