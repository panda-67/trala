import React from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useAuthContext } from '../provider/AuthProvider';
import { ProfileNavigationProp } from '../type/RouteType';

export default function ProfileScreen({navigation}: {navigation: ProfileNavigationProp}) {
    const { logout } = useAuthContext();
    const isDarkMode = useColorScheme() == 'dark';

    return (
        <View style={styles.containerFlex}>
            <Text style={{ fontWeight: 900, color: isDarkMode ? '#fff' : '#121212' }}>
                Profile Screen
            </Text>
            <Button title='Log Out' onPress={logout} />
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
