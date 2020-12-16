import * as React from 'react';
import { StyleSheet, View, StatusBar, Image } from 'react-native';
import { FAB, Text, Headline, Paragraph, Subheading, Divider, Button } from 'react-native-paper';
import Camera from '../components/Camera'
import { RNCamera } from 'react-native-camera';

export default class Product extends React.Component {
    constructor(props) {
        super(props);

        this.product = props.route.params.data.product;

        this.state = {
            open: false,
        }

        console.log(this.product.generic_name)
    }

    onStateChange = ({ open }) => this.setState({ open });

    showCameraView = () => {
        this.props.navigation.navigate('Camera')
    }

    render() {
        const { open } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#09961d" barStyle="light-content" />

                <View style={{ flexDirection: 'row', marginTop: 20 }} >

                    <Image source={{ uri: this.product.image_url }} style={styles.image} />

                    <View style={{ flexDirection: 'column', textAlign: 'left', width: "50%" }}>
                        <Headline style={styles.header}>{this.product.generic_name}</Headline>

                        <Subheading>{this.product.brands}</Subheading>
                        <Subheading >Origin: {this.product.origins}</Subheading>
                        <View style={{ flexDirection: 'row' }}>
                            <Subheading style={{ lineHeight: 52, marginRight: 20 }} >Nutrition Score:</Subheading>
                            <Text style={styles.score}>{this.product.nutriscore_grade}</Text>
                        </View>
                    </View>

                </View>

                <Divider style={styles.divider} />

                <Subheading>Nutrients:</Subheading>
                <Paragraph>Lorem ipsum dolor sit amet etc. etc.</Paragraph>
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
                            label: '1 PORTION',
                            onPress: () => console.log('Pressed Portion'),
                        },
                    ]}
                    onStateChange={this.onStateChange}
                    onPress={() => {
                        if (open) {
                            // do something if the speed dial is open
                        }
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    header: {
        color: "#616161",
    },
    score: {
        fontSize: 52,
        color: 'green',
        lineHeight: 52,
        alignSelf: 'center'
    },
    divider: {
        height: 1,
        width: 300,
        marginTop: 20,
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