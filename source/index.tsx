import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator<any>();

import {AddInvoices} from './screens/take_places/FirstScreen';

export enum NSTabsNavigator {
  TakePlaces = 'Принять места',
  ScanFlights = 'Сканировать рейсы',
  Settings = 'Настройки',
}

export const ForkNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={NSTabsNavigator.TakePlaces}
      screenOptions={{
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#207aff',
      }}>
      <Tab.Screen
        name={NSTabsNavigator.TakePlaces}
        component={AddInvoices}
        options={{
          tabBarLabel: NSTabsNavigator.TakePlaces,
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="dropbox" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NSTabsNavigator.ScanFlights}
        component={() => <></>}
        options={{
          tabBarLabel: NSTabsNavigator.ScanFlights,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="barcode" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={NSTabsNavigator.Settings}
        component={() => <></>}
        options={{
          tabBarLabel: NSTabsNavigator.Settings,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
