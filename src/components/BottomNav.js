import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Nutrition from '../screens/Nutrition'
import Timeline from '../screens/Timeline'
import Account from '../screens/Account'

const Tab = createMaterialBottomTabNavigator();

export default function BottomNav() {

    return (
        <Tab.Navigator
            initialRouteName="Nutrition"
            shifting={true}
            sceneAnimationEnabled={true}

        >
            <Tab.Screen
                name="Nutrition"
                component={Nutrition}
                options={{
                    tabBarIcon: 'food-apple',
                }}
            />
            <Tab.Screen
                name="Timeline"
                component={Timeline}
                options={{
                    tabBarIcon: 'chart-bar'
                }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarIcon: 'account'
                }}
            />
        </Tab.Navigator>
    );
}