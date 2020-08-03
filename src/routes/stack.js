import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/Home';
import UserScreen from '../pages/User';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Usuários"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Usuários" component={HomeScreen} />
      <Stack.Screen name="Detalhes" component={UserScreen} />
    </Stack.Navigator>
  );
}

export default Routes;
