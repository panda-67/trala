import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import AppRoute from './src/navigation/AppRoute';
import { AuthProvider } from './src/provider/AuthProvider';

export default function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <AuthProvider>
            <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
                <StatusBar style='auto' />
                <AppRoute />
            </NavigationContainer>
        </AuthProvider>
    );
}
