import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContextType } from '../type/AuthType';
import { API_BASE_URL } from '../service/api';
import { LoginNavigationProp } from '../type/RouteType';

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    errorMessage: null,
    authToken: '',
    loading: true,
    user: null,
    logout: () => {},
    // intendedRoute: null,
    // setIntendedRoute: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // Store user info
    const [intendedRoute, setIntendedRoute] = useState();

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('authToken');
            setIsAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    const authenticateUser = async (data: { email: string; password: string }) => {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        return { success: response.ok, ...res }; // Include both success status and response data
    };

    const handleSuccessfulLogin = async (data: any, navigation: LoginNavigationProp) => {
        // Alert.alert('Login Successful', `Welcome back, ${data.user.email}!`);
        await AsyncStorage.setItem('authToken', data.token);
        setAuthToken(`Bearer ${data.token}`);
        setIsAuthenticated(true);
        setLoading(false);
        setUser(data.user);

        if (intendedRoute) {
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: intendedRoute.name, params: intendedRoute.params }],
            // });
            // setIntendedRoute(null);
        } else {
            navigation.navigate('Main');
        }
    };

    const login = async (
        data: { email: string; password: string },
        navigation: LoginNavigationProp,
    ) => {
        try {
            const res = await authenticateUser(data);

            if (res.success) {
                handleSuccessfulLogin(res, navigation); // Handles success flow
            } else {
                setErrorMessage(`${res.message}. Login failed, please try again.`);
            }
        } catch (error) {
            setErrorMessage('Network error, please try again later.');
            console.error(error);
        }
    };

    const logout = async () => {
        if (isAuthenticated) {
            await AsyncStorage.removeItem('authToken').finally(() => {
                setIsAuthenticated(false);
                setUser(null);
            });
        } else {
            Alert.alert('Info', 'Already Logged Out.');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                errorMessage,
                authToken,
                loading,
                user,
                logout,
                // intendedRoute,
                // setIntendedRoute,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
