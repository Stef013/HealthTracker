import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default Theme = {
    ...CombinedDefaultTheme,
    roundness: 2,
    colors: {
        ...CombinedDefaultTheme.colors,
        primary: '#09961d',
        accent: '#09961d',
    },
    font: {
        regular: {
            fontSize: 50,
            color: 'blue',
        }
    }
};