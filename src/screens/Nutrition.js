import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import BottomNav from '../components/BottomNav'

export default class Nutrition extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>OMEGALUL</Text>

                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => console.log('Pressed')}
                />
                <BottomNav />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
})