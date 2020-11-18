import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App.js';

// const theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#1ba12e',
//     accent: '#1ba12e',
//   },
// };

// export default function Main() {
//   return (
//     <App />
//   );
// }

AppRegistry.registerComponent(appName, () => App);