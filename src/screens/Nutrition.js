import * as React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, List } from 'react-native-paper';
import Realm from 'realm';
import { ConsumedSchema } from '../models/RealmSchemas'
import Moment from 'moment';

export default class Nutrition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            gotProducts: false,
        }
        Realm.open({ schema: [ConsumedSchema], schemaVersion: 1 })
            .then(realm => {
                // realm.write(() => { realm.delete(realm.objects('Consumed'))})
                var items = realm.objects('Consumed');

                if (items.length > 0) {
                    this.setState({ products: items, gotProducts: true });
                }

                realm.close();
            })
            .catch(error => {
                console.log(error);
            });

    }

    showCameraView = () => {
        this.props.navigation.navigate('Camera');
    }

    list = () => {

        var time = Moment.now();
        console.log(time);
        var goodtime = Moment(time).format("DD/MM/yyyy HH:mm")
        console.log(goodtime);

        return this.state.products.map((element) => {
            return (
                <View>
                    <Divider style={{ width: 400, height: 1, marginBottom: 0 }} />
                    <List.Item
                        title={element.product_name}
                        left={() => <List.Icon icon="food-fork-drink" />}
                        right={() => this.getConsumedTime(element.date)}
                        description={"Quantity: " + element.quantity + ", " + "Calories: " + element.calories + ", " + "Grade: " + element.grade} />
                </View>
            );
        });
    };

    getConsumedTime(date) {
        var time = Moment(date).format("HH:mm");
        console.log("Deze: " + time);
        return <Paragraph style={styles.time}>{time.toString()}</Paragraph>
    }

    getTotalCalories = () => {
        var calories = 0;
        this.state.products.map((element) => {
            const intCalories = element.calories.slice(0, -4) //'abcde'
            calories = calories + Number(intCalories);
        });
        console.log(calories);
        return (<Subheading>{calories} kcal</Subheading>)
    }
    render() {
        const { products, gotProducts } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                {gotProducts ?
                    <View>
                        <ScrollView>
                            <View style={{ alignItems: 'center' }}>
                                <Headline style={styles.header}>Today's Nutrition Score:</Headline>

                                <Text style={styles.score}>{products[0].grade}</Text>

                                <Divider style={styles.divider} />

                                <Subheading>Total calorie intake:</Subheading>
                                {this.getTotalCalories()}
                            </View>

                            <View style={{ marginLeft: 10, marginTop: 20, marginBottom: 15 }}>
                                <Subheading>Consumed Products:</Subheading>
                            </View>

                            <View style={{ marginBottom: 50 }}>
                                {this.list()}
                            </View>
                        </ScrollView>
                    </View>
                    :
                    <View style={{ alignItems: 'center' }}>
                        <Headline style={styles.header}>No products consumed today.</Headline>
                    </View>
                }

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
        width: 370,
        marginBottom: 20
    },
    time: {
        fontSize: 12,
        color: "#616161",
        marginBottom: 0,
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