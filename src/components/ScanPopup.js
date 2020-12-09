import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const ScanPopup = (props) => {
    const [visible, setVisible] = React.useState(true);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>{props.data.status_verbose}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Code is: {props.data.code}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default ScanPopup;