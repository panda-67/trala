import { NavigationProp } from '@react-navigation/native';
import { LoginNavigationProp, RouteParamList } from './RouteType';

export type IntendedRoute = NavigationProp<RouteParamList>;

export type AuthContextType = {
    isAuthenticated: boolean;
    login: (data: { email: string; password: string }, navigation: LoginNavigationProp) => void;
    errorMessage: string | null;
    authToken: string | null;
    loading: boolean;
    user: any | null;
    logout: () => void;
    intendedRoute?: IntendedRoute | null;
    setIntendedRoute?: (route: IntendedRoute | null) => void; // Fix here
};
