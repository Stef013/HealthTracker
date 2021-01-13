import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';

export default class Timeline extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Headline style={styles.header}>Last Week's Grades</Headline>
                </View>
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
})
