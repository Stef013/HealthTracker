import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const NutritionRoute = () => <Text>Nutrition</Text>;

const TimelineRoute = () => <Text>Graph</Text>;

const AccountRoute = () => <Text>Settings</Text>;

export default class BottomNav extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'nutrition', title: 'Nutrition', icon: 'apple' },
            { key: 'timeline', title: 'Timeline', icon: 'chart-bar' },
            { key: 'account', title: 'Account', icon: 'account' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        nutrition: NutritionRoute,
        timeline: TimelineRoute,
        account: AccountRoute,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
                shifting={true}
            />
        );
    }
}