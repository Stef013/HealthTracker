import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const SuccessPopup = (props) => {
    const [visible, setVisible] = React.useState(true);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const navigateProduct = () => {
        hideDialog();
        props.navigation.navigate('Root');
    }
    if (props.success) {
        return (
            <View>
                <Portal>
                    <Dialog styles={styles.dialog} visible={visible}>
                        <Dialog.Content>
                            <Paragraph>Product Saved!</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={navigateProduct}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
    else {
        return (
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>An Error has occured</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Please restart the application.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
};

export default SuccessPopup;

const styles = StyleSheet.create({
    dialog: {
        width: 300,
        padding: 50
    }
})