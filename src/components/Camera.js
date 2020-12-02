import * as React from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { Button, Title, Text } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';

export default class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.barcode = [];
    }

    hideCameraView = () => {
        this.props.navigation.navigate('Nutrition');
    }

    onBarCodeRead(scanResult) {
        console.log(scanResult.type);
        console.log(scanResult.data);
        if (scanResult.data != null) {
            if (!this.barcode.includes(scanResult.data)) {
                this.barcode.push(scanResult.data);
                Alert.alert(
                    "Barcode type is " + scanResult.type,
                    "Barcode value is " + scanResult.data,
                    [
                        {
                            text: "OK",
                            onPress: () => this.hideCameraView,
                            style: "cancel"
                        }
                    ],
                    { cancelable: false },
                );
            }
        }
        return;
    }

    render() {
        const { isCameraVisible } = this.state;
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
                    <Button mode="outlined" color='#000000' style={styles.capture} onPress={this.hideCameraView} >Back</Button>
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
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 100,
        color: '#000000',
        margin: 40
    }
});