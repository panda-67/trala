import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import DetailScreen from '../screen/DetailScreen';
import ExploreScreen from '../screen/ExploreScreen';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props: any) => {
    return <Ionicons size={30} style={{ marginBottom: 0 }} {...props} />;
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
                tabBarStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 10,
                    elevation: 5, // Android shadow
                },
                tabBarActiveTintColor: isDarkMode ? '#0ff' : 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingTop: 2,
                    fontFamily: 'Poppins',
                    fontWeight: 900,
                },
                tabBarShowLabel: true,
                tabBarLabelPosition: 'below-icon',
                headerStyle: {
                    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
                },
                headerTintColor: isDarkMode ? '#ffffff' : '#000000',
            })}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
                }}
            />
            <Tab.Screen
                name='Explore'
                component={ExploreScreen}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='compass' color={color} />,
                }}
            />
            <Tab.Screen
                name='Profile'
                children={() => <ProfileScreen />}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default function AppRoot() {
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
        </Stack.Navigator>
    );
}
