import * as React from 'react';
import { StyleSheet, View, StatusBar, Image, ScrollView } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, Button, DataTable, ActivityIndicator } from 'react-native-paper';
import Realm from 'realm';
import { ConsumedSchema } from '../models/RealmSchemas'
import SuccessPopup from '../components/SuccessPopup'
import Moment from 'moment';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.product = props.route.params.data.product;

        this.saveProduct = this.saveProduct.bind(this);

        this.state = {
            success: true,
            isLoading: true,
            showLoading: false
        };
    }

    getNutriScore() {

        switch (this.product.nutriscore_grade) {
            case "a":
                return <Text style={styles.scoreA}>{this.Capitalize(this.product.nutriscore_grade)}</Text>
            case "b":
                return <Text style={styles.scoreB}>{this.Capitalize(this.product.nutriscore_grade)}</Text>
            case "c":
                return <Text style={styles.scoreC}>{this.Capitalize(this.product.nutriscore_grade)}</Text>
            case "d":
                return <Text style={styles.scoreD}>{this.Capitalize(this.product.nutriscore_grade)}</Text>
            case "e":
                return <Text style={styles.scoreE}>{this.Capitalize(this.product.nutriscore_grade)}</Text>
        }
    }

    showCameraView() {
        this.props.navigation.navigate('Camera');
    }

    saveProduct() {
        this.setState({ showLoading: true })
        Realm.open({ schema: [ConsumedSchema], schemaVersion: 1 })
            .then(realm => {
                realm.write(() => {
                    const prod = realm.create('Consumed', {
                        date: Moment().format("DD/MM/YYYY HH:mm"),
                        barcode: this.product.code,
                        product_name: this.product.product_name,
                        grade: this.Capitalize(this.product.nutriscore_grade),
                        quantity: this.product.serving_size,
                        calories: this.product.nutriments['energy-kcal_serving'] + " " + this.product.nutriments['energy-kcal_unit'],
                    });
                });
                const products = realm.objects('Consumed');
                products.length;
                console.log(products.length)

                realm.close();
                this.setState({ isLoading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ success: false })
                this.setState({ isLoading: false });
            });
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    formatAllergens(str) {
        var count = 0;
        if (str !== null || str !== "") {
            while (str.includes("en:")) {
                if (count === 0) {
                    str = str.replace("en:", "");
                }
                else {
                    str = str.replace("en:", " ");
                }
                count++;
            }
        }
        else {
            str = "No allergens included."
        }

        return str;
    }

    formatStores(str) {
        if (str !== null || str !== "") {
            while (str.includes(",")) {
                str = str.replace(",", "; ");
            }
            while (str.includes(";")) {
                str = str.replace(";", ", ");
            }
        }
        else {
            str = "Unknown"
        }

        return str;
    }

    render() {
        const { success, isLoading, showLoading } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                    <View style={{ flexDirection: 'row', marginTop: 20 }} >

                        <Image source={{ uri: this.product.image_url }} style={styles.image} />

                        <View style={{ flexDirection: 'column', textAlign: 'left', width: "55%" }}>
                            <Headline style={styles.header}>{this.product.product_name}</Headline>
                            <Subheading>Brand: {this.Capitalize(this.product.brands)}</Subheading>
                            <Subheading >Quantity: {this.product.quantity}</Subheading>
                            <Subheading >Stores: {this.formatStores(this.product.stores)}</Subheading>

                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Subheading style={{ lineHeight: 40, marginRight: 20 }} >Nutrition Score:</Subheading>
                                {this.getNutriScore()}
                            </View>
                        </View>
                    </View>

                    <Divider style={styles.divider} />
                    <View style={{ marginLeft: 10, marginTop: 20, marginRight: 10 }}>
                        <Subheading>Ingredients:</Subheading>
                        <Paragraph>{this.product.ingredients_text}</Paragraph>
                        <Subheading style={{ marginTop: 15 }}>Allergens:</Subheading>
                        <Paragraph>{this.formatAllergens(this.product.allergens)}</Paragraph>
                    </View>

                    <Divider style={styles.divider} />
                    <View style={{ marginLeft: 10, marginTop: 20, marginRight: 10 }}>
                        <Subheading>Nutrients:</Subheading>
                    </View>

                    <DataTable style={{ marginBottom: 50 }}>
                        <DataTable.Header>
                            <DataTable.Title>Nutrient</DataTable.Title>
                            <DataTable.Title numeric>{this.product.nutrition_data_per}</DataTable.Title>
                            <DataTable.Title numeric>Serving ({this.product.serving_size})</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Calories</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments['energy-kcal_100g']} {this.product.nutriments['energy-kcal_unit']}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments['energy-kcal_serving']} {this.product.nutriments['energy-kcal_unit']}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fat</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fat_100g} {this.product.nutriments.fat_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fat_serving} {this.product.nutriments.fat_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Carbohydrates</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.carbohydrates_100g} {this.product.nutriments.carbohydrates_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.carbohydrates_serving} {this.product.nutriments.carbohydrates_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Protein</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.proteins_100g} {this.product.nutriments.proteins_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.proteins_serving} {this.product.nutriments.proteins_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Salt</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.salt_100g} {this.product.nutriments.salt_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.salt_serving} {this.product.nutriments.salt_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Sugar</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sugars_100g} {this.product.nutriments.sugars_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sugars_serving} {this.product.nutriments.sugars_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fiber</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fiber_100g} {this.product.nutriments.fiber_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fiber_serving} {this.product.nutriments.fiber_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Calcium</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.calcium_100g} {this.product.nutriments.calcium_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.calcium_serving} {this.product.nutriments.calcium_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Sodium</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sodium_100g} {this.product.nutriments.sodium_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sodium_serving} {this.product.nutriments.sodium_unit}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </ScrollView>
                {showLoading &&
                    <View>
                        {isLoading ? <ActivityIndicator large /> : (
                            <SuccessPopup success={success} navigation={this.props.navigation} />
                        )}
                    </View>
                }
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={this.saveProduct}
                    label="ADD"
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({

    header: {
        color: "#616161",
    },
    scoreA: {
        fontSize: 42,
        lineHeight: 50,
        color: "#038141",
        alignSelf: 'center'
    },
    scoreB: {
        fontSize: 42,
        lineHeight: 46,
        color: "#85bb2f",
        alignSelf: 'center'
    },
    scoreC: {
        fontSize: 42,
        lineHeight: 50,
        color: "#f5cd02",
        alignSelf: 'center'
    },
    scoreD: {
        fontSize: 42,
        lineHeight: 50,
        color: "#ee8100",
        alignSelf: 'center'
    },
    scoreE: {
        fontSize: 42,
        lineHeight: 50,
        color: "#e63e11",
        alignSelf: 'center'
    },
    divider: {
        height: 1,
        width: "100%",
        marginTop: 30,
        alignSelf: 'center'
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
    image: {
        width: "40%",
        resizeMode: "contain",
        marginRight: 10,
    }
})