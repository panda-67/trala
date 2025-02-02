import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
    Login: undefined;
    Signup: undefined;
    Main: undefined;
    Detail: { itemId: string };
    Profile: undefined;
};

export type TabParamList = {
    HomeScreen: {};
    Explore: {};
    HistoryScreen: {};
};

export type LoginNavigationProp = StackNavigationProp<StackParamList, 'Login'>;
export type SignupNavigationProp = StackNavigationProp<StackParamList, 'Signup'>;
export type MainNavigationProp = StackNavigationProp<StackParamList, 'Main'>;
export type DetailNavigationProp = StackNavigationProp<StackParamList, 'Detail'>;
export type ProfileNavigationProp = StackNavigationProp<StackParamList, 'Profile'>;

export type HomeNavigationProp = BottomTabNavigationProp<TabParamList, 'HomeScreen'>;
export type ExploreNavigationProp = BottomTabNavigationProp<TabParamList, 'Explore'>;
export type HistoryNavigationProp = BottomTabNavigationProp<TabParamList, 'HistoryScreen'>;

export type RouteParamList = StackParamList | TabParamList;
