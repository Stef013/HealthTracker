import * as React from 'react';
import { StyleSheet, View, StatusBar, Image, ScrollView } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, Button, DataTable } from 'react-native-paper';
import Realm from 'realm';
import { ProductSchema, ConsumedSchema } from '../models/RealmSchemas'

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.product = props.route.params.data.product;

        this.state = {
            open: false,
        }
        console.log(this.product.generic_name)
    }

    // getNutriScore = () => {
    //     console.log(this.product.nutriscore_grade);
    //     switch (this.product.nutriscore_grade) {
    //         case "a":
    //             this.setState({ nutriURL: "https://static.openfoodfacts.org/images/misc/nutriscore-a.svg" })
    //             break;
    //         case "b":
    //             this.setState({ nutriURL: "https://static.openfoodfacts.org/images/misc/nutriscore-b.svg" })
    //             break;
    //         case "c":
    //             this.setState({ nutriURL: "https://static.openfoodfacts.org/images/misc/nutriscore-c.svg" })
    //             break;
    //         case "d":
    //             this.setState({ nutriURL: "https://static.openfoodfacts.org/images/misc/nutriscore-d.svg" })
    //             break;
    //         case "e":
    //             this.setState({ nutriURL: "https://static.openfoodfacts.org/images/misc/nutriscore-e.svg" })
    //             break;
    //     }
    // }

    getNutriScore = () => {
        switch (this.product.nutriscore_grade) {
            case "a":
                return <Text style={styles.scoreA}>{this.product.nutriscore_grade}</Text>
            case "b":
                return <Text style={styles.scoreB}>{this.product.nutriscore_grade}</Text>
            case "c":
                return <Text style={styles.scoreC}>{this.product.nutriscore_grade}</Text>
            case "d":
                return <Text style={styles.scoreD}>{this.product.nutriscore_grade}</Text>
            case "e":
                return <Text style={styles.scoreE}>{this.product.nutriscore_grade}</Text>
        }
    }

    onStateChange = ({ open }) => this.setState({ open });

    showCameraView = () => {
        this.props.navigation.navigate('Camera')
    }

    saveProduct = () => {
        console.log('hoi');
        Realm.open({ schema: [ProductSchema, ConsumedSchema] })
            .then(realm => {
                realm.write(() => {
                    const prod = realm.create('Product_', {
                        name: this.product.generic_name,
                        origin: this.product.origins,
                        barcode: 'testcode',
                        grade: this.product.nutriscore_grade,
                    });
                });
                const products = realm.objects('Product_');
                products.length;
                console.log(products.length)

                realm.close();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { open } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                    <View style={{ flexDirection: 'row', marginTop: 20 }} >

                        <Image source={{ uri: this.product.image_url }} style={styles.image} />

                        <View style={{ flexDirection: 'column', textAlign: 'left', width: "50%" }}>
                            <Headline style={styles.header}>{this.product.generic_name}</Headline>

                            <Subheading>{this.product.brands}</Subheading>
                            <Subheading >Origin: {this.product.origins}</Subheading>

                            <View style={{ flexDirection: 'row' }}>
                                <Subheading style={{ lineHeight: 52, marginRight: 20 }} >Nutrition Score:</Subheading>
                                {this.getNutriScore()}
                            </View>
                        </View>
                    </View>

                    <Divider style={styles.divider} />
                    <View style={{ marginLeft: 10, marginTop: 20, marginRight: 10 }}>
                        <Subheading>Ingredients:</Subheading>
                        <Paragraph>{this.product.ingredients_text}</Paragraph>
                    </View>

                    <Divider style={styles.divider} />
                    <View style={{ marginLeft: 10, marginTop: 20, marginRight: 10 }}>
                        <Subheading>Nutrients:</Subheading>
                    </View>

                    <DataTable style={{ marginBottom: 70 }}>
                        <DataTable.Header>
                            <DataTable.Title>Nutrient</DataTable.Title>
                            <DataTable.Title numeric>100g</DataTable.Title>
                            <DataTable.Title numeric>Serving</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Energy</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments['energy-kcal_100g']}{this.product.nutriments['energy-kcal_unit']}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments['energy-kcal_serving']}{this.product.nutriments['energy-kcal_unit']}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fat</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fat_100g}{this.product.nutriments.fat_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fat_serving}{this.product.nutriments.fat_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Carbohydrates</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.carbohydrates_100g}{this.product.nutriments.carbohydrates_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.carbohydrates_serving}{this.product.nutriments.carbohydrates_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Protein</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.proteins_100g}{this.product.nutriments.proteins_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.proteins_serving}{this.product.nutriments.proteins_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Salt</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.salt_100g}{this.product.nutriments.salt_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.salt_serving}{this.product.nutriments.salt_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Sugar</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sugars_100g}{this.product.nutriments.sugars_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sugars_serving}{this.product.nutriments.sugars_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Fiber</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fiber_100g}{this.product.nutriments.fiber_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.fiber_serving}{this.product.nutriments.fiber_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Calcium</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.calcium_100g}{this.product.nutriments.calcium_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.calcium_serving}{this.product.nutriments.calcium_unit}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>Sodium</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sodium_100g}{this.product.nutriments.sodium_unit}</DataTable.Cell>
                            <DataTable.Cell numeric>{this.product.nutriments.sodium_serving}{this.product.nutriments.sodium_unit}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>


                </ScrollView>
                <FAB.Group
                    open={open}
                    icon={open ? 'food-variant' : 'plus'}
                    label="ADD"
                    actions={[
                        {
                            icon: 'plus',
                            label: 'ALL',
                            onPress: () => console.log('Pressed ALL'),
                        },
                        {
                            icon: 'plus',
                            label: '1 Serving',
                            onPress: () => this.showCameraView,
                        },
                    ]}
                    onStateChange={this.onStateChange}
                    onPress={this.saveProduct}
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
        fontSize: 52,
        lineHeight: 52,
        color: "green",
        alignSelf: 'center'
    },
    scoreB: {
        fontSize: 52,
        lineHeight: 52,
        color: "#74e815",
        alignSelf: 'center'
    },
    scoreC: {
        fontSize: 52,
        lineHeight: 52,
        color: "#e8da09",
        alignSelf: 'center'
    },
    scoreD: {
        fontSize: 52,
        lineHeight: 52,
        color: "orange",
        alignSelf: 'center'
    },
    scoreE: {
        fontSize: 52,
        lineHeight: 52,
        color: "#d40000",
        alignSelf: 'center'
    },
    divider: {
        height: 1,
        width: 360,
        marginTop: 30,
        alignSelf: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 16,
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
        marginRight: 15,
    }
})