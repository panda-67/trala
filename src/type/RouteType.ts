import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
    Login: undefined;
    Signup: undefined;
    Main: undefined;
    Detail: { itemId: string };
};

export type TabParamList = {
    Home: undefined;
    Explore: undefined;
    Profile: undefined;
};

export type LoginNavigationProp = StackNavigationProp<StackParamList, 'Login'>;
export type SignupNavigationProp = StackNavigationProp<StackParamList, 'Signup'>;
export type MainNavigationProp = StackNavigationProp<StackParamList, 'Main'>;
export type DetailNavigationProp = StackNavigationProp<StackParamList, 'Detail'>;

export type HomeNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;
export type ExploreNavigationProp = BottomTabNavigationProp<TabParamList, 'Explore'>;
export type ProfileNavigationProp = BottomTabNavigationProp<TabParamList, 'Profile'>;

export type RouteParamList = StackParamList | TabParamList;
