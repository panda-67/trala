import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.containerFlex}>
            <Text style={{ fontWeight: 900, color: '#fff' }}>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlex: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
