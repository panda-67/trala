import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';

export default function ExploreScreen() {
    return (
        <View style={styles.containerFlex}>
            <Text style={{ fontWeight: 900, color: '#fff' }}>Explore Screen</Text>
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
