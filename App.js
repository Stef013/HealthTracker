import React from 'react';

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image,
// } from 'react-native';

// import TopBar from './src/components/TopBar'
// import BottomNav from './src/components/BottomNav'


// export default class App extends React.Component {
//   render() {
//     return (

//       <View style={{ flex: 1 }}>

//         <TopBar />
//         <BottomNav />


//       </View>
//     );
//   };
// };

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Text } from 'react-native';
import {
  Button,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  Title,
} from 'react-native-paper';

import merge from 'deepmerge';
import BottomNav from './src/components/BottomNav'
import Nutrition from './src/screens/Nutrition';
import Timeline from './src/screens/Timeline';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


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


const Stack = createStackNavigator();

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Root')}
      >
        Details
        </Button>
    </View>
  );
}
const Tab = createMaterialBottomTabNavigator();

function Root() {
  return (
    <Tab.Navigator initialRouteName="Nutrition">
      <Tab.Screen name="Nutrition" component={Nutrition} />
      <Tab.Screen name="Timeline" component={Timeline} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{
            headerStyle: {
              backgroundColor: '#1ba12e',
            },
          }} />
          <Stack.Screen name="Root" component={Root} />

        </Stack.Navigator>

      </NavigationContainer>

    </PaperProvider>
  );
}


