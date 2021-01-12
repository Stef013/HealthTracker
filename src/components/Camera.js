import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import ScanPopup from './ScanPopup'

export default class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.barcode = [];

        this.state = {
            data: [],
            isLoading: false,
            showError: false,
        };
    }

    hideCameraView = () => {
        this.props.navigation.navigate('Nutrition');
    }

    navigateProduct = () => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('Product', { data: this.state.data });
    }

    onBarCodeRead(scanResult) {
        console.log("Type: " + scanResult.type);
        console.log("Scanned Barcode: " + scanResult.data);
        this.setState({ showError: false });
        if (scanResult.data != null) {
            this.barcode.push(scanResult.data);
            this.setState({ isLoading: true });
            this.getProduct(this.barcode);
        }
        return;
    }

    getProduct(barcode) {
        const API = 'https://world.openfoodfacts.org/api/v0/product/' + barcode + '.json'

        fetch(API, {
            method: 'get',
            headers: {
                'User-Agent': 'HealthTracker - Android - Version 0.6'
            }
        }).then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
                console.log("Status: " + json.status_verbose)
                console.log("Product : " + json.code)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                if (this.state.data.status_verbose === "product found") {
                    this.navigateProduct();
                }
                else {
                    this.setState({ isLoading: false });
                    this.setState({ showError: true });
                }
                this.barcode = [];
            });
    }

    render() {
        const { data, isLoading, showError } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    captureAudio={false}
                    style={styles.scanner}
                    type={RNCamera.Constants.Type.back}
                    onBarCodeRead={this.onBarCodeRead.bind(this)}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}>

                    <Button mode="outlined" color='#000000' style={styles.backButton} onPress={this.hideCameraView} >Back</Button>

                    {isLoading && <View style={styles.loading}>
                        <ActivityIndicator color="white" size='large' />
                    </View>
                    }

                    {showError && <ScanPopup data={data} />}
                </RNCamera>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    scanner: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    backButton: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 100,
        color: '#000000',
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
});