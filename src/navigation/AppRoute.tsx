import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthGuard from '../guard/AuthGuard';
import { useAuthContext } from '../provider/AuthProvider';
import DetailScreen from '../screen/DetailScreen';
import ExploreScreen from '../screen/ExploreScreen';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import ProfileScreen from '../screen/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../type/RouteType';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = (props: any) => {
    return <Ionicons size={24} style={{ marginBottom: -5 }} {...props} />;
};

const HomeNavigator = (props: any) => {
    const isDarkMode = useColorScheme() == 'dark';

    return (
        <AuthGuard navigation={props.navigation}>
            <Stack.Navigator>
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        headerShown: true,
                        title: 'Travel Legend',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerRight: () => (
                            <Ionicons
                                name='person-circle-outline'
                                size={28}
                                color={isDarkMode ? '#fff' : '#000'}
                                style={{ marginRight: 15 }}
                                onPress={() => navigation.navigate('Profile')}
                            />
                        ),
                    })}
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
                    options={{
                        headerShown: true,
                        title: 'Profile',
                        headerTitleStyle: { fontWeight: 'bold' },
                    }}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};

const TabNavigator = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { isAuthenticated } = useAuthContext();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Tab.Navigator
            initialRouteName={isAuthenticated ? 'Home' : 'Explore'}
            screenOptions={() => ({
                headerTintColor: isDarkMode ? '#ffffff' : '#000000',
                headerStyle: { backgroundColor: isDarkMode ? '#121212' : '#ffffff' },
                headerTitleStyle: { fontWeight: 'bold' },
                tabBarActiveTintColor: isDarkMode ? '#0344ff' : 'blue',
                tabBarInactiveTintColor: 'gray',
                animation: 'shift',
                tabBarStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    height: 60,
                    paddingBottom: 4,
                    paddingTop: 4,
                    elevation: 4,
                },
                tabBarShowLabel: true, // Set to true for label activated
                tabBarLabelPosition: 'below-icon',
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins', fontWeight: 900 },
            })}
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    headerShown: false,
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
            {/* {isAuthenticated && ( */}
            {/*     <Tab.Screen */}
            {/*         name='Profile' */}
            {/*         component={ProfileNavigator} */}
            {/*         options={{ */}
            {/*             tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />, */}
            {/*         }} */}
            {/*     /> */}
            {/* )} */}
        </Tab.Navigator>
    );
};

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
            {isAuthenticated ? (
                <>
                    <Stack.Screen name='Details' component={DetailScreen} />
                    <Stack.Screen name='Profile' component={ProfileNavigator} />
                </>
            ) : (
                <Stack.Screen name='Login' component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}
