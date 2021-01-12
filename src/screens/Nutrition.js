import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, Button } from 'react-native-paper';
import Realm from 'realm';
import { ConsumedSchema } from '../models/RealmSchemas'

export default class Nutrition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: "",
            gotProducts: false,
        }
        Realm.open({ schema: [ConsumedSchema], schemaVersion: 1 })
            .then(realm => {
                var items = realm.objects('Consumed');
                console.log(items[0].product_name);
                this.setState({ products: items, gotProducts: true });
                console.log(this.products)
                realm.close();
            })
            .catch(error => {
                console.log(error);
            });

    }

    showCameraView = () => {
        this.props.navigation.navigate('Camera');
    }
    getConsumed() {
        Realm.open({ schema: [ConsumedSchema], schemaVersion: 1 })
            .then(realm => {
                var items = realm.objects('Consumed');
                console.log(items);
                realm.close();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { products, gotProducts } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                <View style={{ alignItems: 'center' }}>
                    <Headline style={styles.header}>Today's Nutrition Score:</Headline>

                    {gotProducts ?
                        <Text style={styles.score}>{products[0].grade}</Text>
                        :
                        null
                    }

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