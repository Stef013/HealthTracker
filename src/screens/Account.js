import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Headline } from 'react-native-paper';

export default class Account extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Headline style={styles.header}>Account Settings</Headline>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        color: "#616161",
        marginTop: 30
    },
    score: {
        fontSize: 150,
        color: 'green',
        lineHeight: 170,
    },
    divider: {
        height: 1,
        width: 300
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },
})
