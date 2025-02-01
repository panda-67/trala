import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthGuard from '../guard/AuthGuard';
import DetailScreen from '../screen/DetailScreen';
import ExploreScreen from '../screen/ExploreScreen';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props: any) => {
    return <Ionicons size={24} style={{ marginBottom: -5 }} {...props} />;
};

const HomeNavigator = (props: any) => {
    return (
        <AuthGuard navigation={props.navigation}>
            <Stack.Navigator>
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};

const ProfileNavigator = (props: any) => {
    return (
        <AuthGuard navigation={props.navigation}>
            <Stack.Navigator>
                <Stack.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};

const TabNavigator = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Tab.Navigator
            initialRouteName='Explore'
            screenOptions={() => ({
                headerTintColor: isDarkMode ? '#ffffff' : '#000000',
                headerStyle: { backgroundColor: isDarkMode ? '#121212' : '#ffffff' },
                tabBarActiveTintColor: isDarkMode ? '#0344ff' : 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    height: 60,
                    paddingBottom: 4,
                    paddingTop: 4,
                    elevation: 4,
                },
                tabBarShowLabel: false, // Set to true for label activated
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins', fontWeight: 900 },
            })}
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} /> }}
            />
            <Tab.Screen
                name='Explore'
                component={ExploreScreen}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name='compass' color={color} /> }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileNavigator}
                options={{ tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} /> }}
            />
        </Tab.Navigator>
    );
};

export default function AppRoute() {
    const isDarkMode = useColorScheme() === 'dark';

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
            <Stack.Screen name='Main' component={TabNavigator} />
            <Stack.Screen name='Details' component={DetailScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    );
}
