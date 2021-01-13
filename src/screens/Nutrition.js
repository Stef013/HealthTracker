import * as React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Image } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, List, ActivityIndicator } from 'react-native-paper';
import Realm from 'realm';
import { ConsumedSchema } from '../models/RealmSchemas'
import Moment from 'moment';

export default class Nutrition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            gotProducts: false,
            isLoading: false,
            data: [],
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            Realm.open({ schema: [ConsumedSchema], schemaVersion: 2 })
                .then(realm => {
                    //realm.write(() => { realm.delete(realm.objects('Consumed')) })
                    var items = realm.objects('Consumed');

                    if (items.length > 0) {
                        this.setState({ products: items, gotProducts: true });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    showCameraView = () => {
        this.props.navigation.navigate('Camera');
    }

    navigateProduct = () => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('Product', { data: this.state.data });
    }

    getProductData(barcode) {
        this.setState({ isLoading: true });
        const API = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json'

        fetch(API, {
            method: 'get',
            headers: {
                'User-Agent': 'HealthTracker - Android - Version 0.9'
            }
        }).then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (this.state.data.status_verbose === "product found") {
                    this.navigateProduct();
                }
                else {
                    this.setState({ isLoading: false });
                }
            });
    }

    getProductlist = () => {
        var time = Moment.now();
        var key = 0;

        return this.state.products.map((element) => {
            key++
            return (
                <View key={key}>
                    <Divider style={{ width: 400, height: 1, marginBottom: 0 }} />
                    <List.Item
                        title={element.product_name}
                        left={() => <Image source={{ uri: element.imageURL }} style={styles.image} />}
                        right={() => this.getConsumedTime(element.date)}
                        description={"Quantity: " + element.quantity + ", " + "Calories: " + element.calories + ", " + "Grade: " + element.grade}
                        onPress={this.getProductData.bind(this, element.barcode)}
                        style={{ marginRight: 10 }}
                    />
                </View>
            );
        });
    };

    getConsumedTime(date) {
        var time = Moment(date).format("HH:mm");
        return <Paragraph style={styles.time}>{time.toString()}</Paragraph>
    }

    getTotalCalories = () => {
        var calories = 0;
        this.state.products.map((element) => {
            const intCalories = element.calories.slice(0, -4);
            calories = calories + Number(intCalories);
        });
        return (<Subheading style={styles.calories}>{calories} kcal</Subheading>)
    }

    getGrade() {
        var grades = [];
        this.state.products.map((element) => {
            switch (element.grade) {
                case "A":
                    grades.push(5);
                    break;
                case "B":
                    grades.push(4);
                    break;
                case "C":
                    grades.push(3);
                    break;
                case "D":
                    grades.push(2);
                    break;
                case "E":
                    grades.push(1);
                    break;
            }
        });

        var i = 0;
        var sum = 0;
        var length = grades.length;

        while (i < length) {
            sum = sum + grades[i++];
        }

        var average = sum / length;
        var grade = "x";
        var color = ""

        if (average > 4.5 && average <= 5) {
            grade = "A";
            color = "#038141";
        }
        else if (average > 3.5 && average <= 4.5) {
            grade = "B";
            color = "#85bb2f";
        }
        else if (average > 2.5 && average <= 3.5) {
            grade = "C";
            color = "#f5cd02";
        }
        else if (average > 1.5 && average <= 2.5) {
            grade = "D";
            color = "#ee8100";
        }
        else if (average > 1 && average <= 1.5) {
            grade = "E";
            color = "#e63e11";
        }
        else {
            grade = "!";
            color = "#e63e11";
        }

        return (<Text style={[styles.score, { color: color }]}>{grade}</Text>)
    }

    render() {
        const { gotProducts, isLoading } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#09961d" barStyle="light-content" />
                {/* {isLoading ? (<View style={styles.loading}><ActivityIndicator size='large' /></View>) : */}
                {gotProducts ?
                    (<View>
                        <ScrollView>
                            <View style={{ alignItems: 'center' }}>
                                <Headline style={styles.header}>Today's Nutrition Grade:</Headline>
                                {/* <Text style={styles.score}>{products[0].grade}</Text> */}
                                {this.getGrade()}

                                <Divider style={styles.divider} />

                                <Subheading style={styles.subheader}>Total calorie intake:</Subheading>
                                {this.getTotalCalories()}
                            </View>
                            <View style={{ marginLeft: 10, marginTop: 40, marginBottom: 15 }}>
                                <Subheading style={styles.subheader2}>Consumed Products:</Subheading>
                            </View>

                            <View style={{ marginBottom: 50 }}>
                                {this.getProductlist()}
                            </View>
                        </ScrollView>
                    </View>)
                    :
                    (<View style={{ alignItems: 'center' }}>
                        <Headline style={styles.header}>No products consumed today.</Headline>
                    </View>)
                }

                <FAB
                    style={styles.fab}
                    icon="barcode-scan"
                    onPress={this.showCameraView}
                />
                {isLoading && <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        color: "#616161",
        marginTop: 30
    },
    subheader: {
        fontSize: 18,
        color: "#616161"
    },
    subheader2: {
        fontSize: 16,
        color: "#616161"
    },
    calories: {
        color: "#616161",
        fontWeight: "bold",
    },
    score: {
        fontSize: 150,
        lineHeight: 170,
    },
    divider: {
        height: 1,
        width: 370,
        marginBottom: 20
    },
    divider2: {
        height: 1,
        width: 370,
        marginBottom: 20,
        marginTop: 20
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
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: "contain",

    }
})