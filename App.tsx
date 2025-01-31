import { StatusBar } from 'expo-status-bar';
import AppRoot from './src/navigation/AppRoute';
import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <StatusBar style='auto' />
            <AppRoot />
        </NavigationContainer>
    );
}
