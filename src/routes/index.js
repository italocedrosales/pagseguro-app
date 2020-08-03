import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackScreen from './stack';
import PayScreen from '../pages/Pay';

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'rocket';
          } else if (route.name === 'Payment') {
            iconName = 'card';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#7159c1',
        inactiveTintColor: 'gray',
        labelPosition: 'below-icon',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        initialRouteName="Home"
        options={{
          title: 'Início',
        }}
      />

      <Tab.Screen
        name="Payment"
        component={PayScreen}
        options={{
          title: 'Pagar',
        }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
