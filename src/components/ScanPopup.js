import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const ScanPopup = (props) => {
    const [visible, setVisible] = React.useState(true);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const navigateProduct = () => {
        hideDialog();
        props.navigation.navigate('Product', { data: props.data });
    }

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{props.data.status_verbose}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Product: {props.data.product.generic_name}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cancel</Button>
                        <Button onPress={navigateProduct}>Next</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default ScanPopup;