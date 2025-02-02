import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import AppRoute from './src/navigation/AppRoute';
import { AuthProvider } from './src/provider/AuthProvider';
import './style/global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
    duration: 1000,
    fade: true,
});

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
