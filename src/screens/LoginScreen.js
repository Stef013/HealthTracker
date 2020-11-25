import React from 'react'

import { View, StatusBar, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default LoginScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: "#09961d" }}>
            <StatusBar backgroundColor="#077817" barStyle="light-content" />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="food-apple" size={50} color="white" >
                    <Title style={styles.title}>HealthTracker</Title>
                </Icon>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Root')}
                    color="#067315"
                    style={{ width: 150 }}
                >
                    Login
          </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 42,
        marginTop: 10,
        lineHeight: 60
    }
});