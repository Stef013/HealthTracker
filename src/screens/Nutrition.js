import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider } from 'react-native-paper';

export default class Nutrition extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center' }}>
                    <Headline style={styles.header}>Today's Nutrition Score:</Headline>

                    <Text style={styles.score}>A</Text>
                    <View>
                        <Divider style={styles.divider} />
                    </View>
                </View>

                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => console.log('Pressed')}
                />
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