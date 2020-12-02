import React from 'react';

//Navigation
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//UI
import { Provider as PaperProvider } from 'react-native-paper';

//Components
import BottomNav from './src/components/BottomNav'
import Theme from './src/assets/theme'
import LoginScreen from './src/screens/LoginScreen'
import Camera from './src/components/Camera'

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Nutrition';

  switch (routeName) {
    case 'Nutrition':
      return 'Nutrition';
    case 'Timeline':
      return 'Timeline';
    case 'Account':
      return 'Account Settings';
  }
}

function Root() {
  return (
    <PaperProvider theme={Theme}>
      <BottomNav />
    </PaperProvider>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Root" component={Root} options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#09961d',
            }
          })} />
          <Stack.Screen name="Camera" component={Camera} options={{
            headerShown: false,
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}