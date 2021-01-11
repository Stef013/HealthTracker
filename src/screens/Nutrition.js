import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, Button } from 'react-native-paper';

export default class Nutrition extends React.Component {
    constructor(props) {
        super(props);
    }

    showCameraView = () => {
        this.props.navigation.navigate('Camera');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                <View style={{ alignItems: 'center' }}>
                    <Headline style={styles.header}>Today's Nutrition Score:</Headline>

                    <Text style={styles.score}>A</Text>
                    <View>
                        <Divider style={styles.divider} />
                    </View>
                </View>

                <FAB
                    style={styles.fab}
                    icon="barcode-scan"
                    onPress={this.showCameraView}
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
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
})