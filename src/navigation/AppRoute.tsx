import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuthContext } from '../provider/AuthProvider';
import DetailScreen from '../screen/DetailScreen';
import LoginScreen from '../screen/LoginScreen';
import TabNavigator from './BottomTab';
import { ProfileNavigator } from './Navigator';

const Stack = createStackNavigator();

export default function AppRoute() {
    const isDarkMode = useColorScheme() === 'dark';
    const { isAuthenticated } = useAuthContext();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Stack.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                },
                headerTintColor: isDarkMode ? Colors.white : Colors.black,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen
                name='Main'
                navigationKey={isAuthenticated ? 'user' : 'guest'}
                component={TabNavigator}
            />
            <Stack.Screen name='Detail' component={DetailScreen} />
            {isAuthenticated ? (
                <Stack.Screen name='Profile' component={ProfileNavigator} />
            ) : (
                <Stack.Screen name='Login' component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}
