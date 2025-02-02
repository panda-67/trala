import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, useColorScheme } from 'react-native';
import AuthGuard from '../guard/AuthGuard';
import HistoryScreen from '../screen/HistoryScreen';
import HomeScreen from '../screen/HomeScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Stack = createStackNavigator();

export const HomeNavigator = (props: any) => {
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
                        headerStyle: { height: 90 },
                        headerRight: () => (
                            <TouchableOpacity>
                                <Ionicons
                                    name='person-circle-outline'
                                    size={28}
                                    color={isDarkMode ? '#fff' : '#000'}
                                    style={{ marginRight: 16 }}
                                    onPress={() => navigation.navigate('Profile')}
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};

export const HistoryNavigator = (props: any) => {
    const isDarkMode = useColorScheme() == 'dark';

    return (
        <AuthGuard navigation={props.navigation}>
            <Stack.Navigator>
                <Stack.Screen
                    name='HstoryScreen'
                    component={HistoryScreen}
                    options={{
                        headerShown: true,
                        title: 'History',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerStyle: { height: 90 },
                        headerRight: () => (
                            <TouchableOpacity>
                                <Ionicons
                                    name='settings-outline'
                                    size={24}
                                    color={isDarkMode ? 'white' : 'black'}
                                    style={{ marginRight: 16 }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};

export const ProfileNavigator = (props: any) => {
    const isDarkMode = useColorScheme() == 'dark';

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
                        headerStyle: { height: 90 },
                        headerRight: () => (
                            <TouchableOpacity>
                                <Ionicons
                                    name='settings-outline'
                                    size={24}
                                    color={isDarkMode ? 'white' : 'black'}
                                    style={{ marginRight: 16 }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack.Navigator>
        </AuthGuard>
    );
};
