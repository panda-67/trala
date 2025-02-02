import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuthContext } from '../provider/AuthProvider';
import ExploreScreen from '../screen/ExploreScreen';
import { HistoryNavigator, HomeNavigator } from './Navigator';

const Tab = createBottomTabNavigator();

const TabBarIcon = (props: any) => {
    return <Ionicons size={props.name == 'compass-sharp' ? 26 : 20} {...props} />;
};

const TabNavigator = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const { isAuthenticated } = useAuthContext();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : 'darkgray',
    };

    return (
        <Tab.Navigator
            initialRouteName={isAuthenticated ? 'Home' : 'Explore'}
            screenOptions={() => ({
                headerTintColor: isDarkMode ? '#ffffff' : '#000000',
                headerStyle: { backgroundColor: isDarkMode ? '#121212' : '#ffffff', height: 90 },
                headerTitleStyle: { fontWeight: 'bold' },
                tabBarActiveTintColor: isDarkMode ? '#0344ff' : 'slate-400',
                tabBarInactiveTintColor: 'gray',
                animation: 'fade',
                tabBarStyle: {
                    backgroundColor: backgroundStyle.backgroundColor,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 50,
                    paddingBottom: 4,
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
                    tabBarIcon: ({ color }) => <TabBarIcon name='compass-sharp' color={color} />,
                }}
            />
            <Tab.Screen
                name='History'
                component={HistoryNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <TabBarIcon name='timer' color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
