import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Nutrition from '../screens/Nutrition'
import Timeline from '../screens/Timeline'

const Tab = createMaterialBottomTabNavigator();

// function Tabs() {
//     return (

//     );
// };

export default class BottomNav extends React.Component {
    render() {
        return (
            <Tab.Navigator
                initialRouteName="Nutrition"
                shifting={true}
                sceneAnimationEnabled={false}
            >
                <Tab.Screen
                    name="Nutrition"
                    component={Nutrition}
                    options={{
                        tabBarIcon: 'apple'
                    }}
                />
                <Tab.Screen
                    name="Timeline"
                    component={Timeline}
                    options={{
                        tabBarIcon: 'chart-bar'

                    }}
                />
            </Tab.Navigator>
        );
    }
}
// const NutritionRoute = () => <Nutrition />;

// const TimelineRoute = () => <Text>Graph</Text>;

// const AccountRoute = () => <Text>Settings</Text>;

// export default class BottomNav extends React.Component {
//     state = {
//         index: 0,
//         routes: [
//             { key: 'nutrition', title: 'Nutrition', icon: 'apple' },
//             { key: 'timeline', title: 'Timeline', icon: 'chart-bar' },
//             { key: 'account', title: 'Account', icon: 'account' },
//         ],
//     };

//     _handleIndexChange = index => this.setState({ index });

//     // _renderScene = BottomNavigation.SceneMap({
//     //     nutrition: NutritionRoute,
//     //     timeline: TimelineRoute,
//     //     account: AccountRoute,
//     // });

//     renderScene = ({ route, jumpTo }) => {
//         switch (route.key) {
//             case 'nutrition':
//                 return <Nutrition jumpTo={jumpTo} />;

//         }
//     }

//     render() {
//         return (
//             <BottomNavigation
//                 navigationState={this.state}
//                 onIndexChange={this._handleIndexChange}
//                 renderScene={this.renderScene}
//                 shifting={true}
//             />
//         );
//     }
// }