import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.containerFlex}>
            <Text style={{ fontWeight: 900, color: '#fff' }}>Profile Screen</Text>
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
