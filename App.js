import React from 'react';


//Navigation
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//UI
import { View } from 'react-native';
import {
  Button,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';
import merge from 'deepmerge';

//Components
import BottomNav from './src/components/BottomNav'

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const theme = {
  ...CombinedDefaultTheme,
  roundness: 2,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: '#1ba12e',
    accent: '#1ba12e',
  },
};

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

const Stack = createStackNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Root')}
      >
        Login
        </Button>
    </View>
  );
}

function Root() {
  return (
    <PaperProvider theme={theme}>
      <BottomNav />
    </PaperProvider>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerShown: false,

          }} />
          <Stack.Screen name="Root" component={Root} options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            headerTintColor: '#FFF',
            headerStyle: {
              backgroundColor: '#1ba12e',
            }
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}