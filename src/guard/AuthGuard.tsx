import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuthContext } from '../provider/AuthProvider';

const AuthGuard = ({ children, navigation }: { children: React.ReactNode, navigation: any}) => {
    const { isAuthenticated, loading, setIntendedRoute } = useAuthContext(); // Auth context state

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            const route = navigation.getState().routes[navigation.getState().index];
            // setIntendedRoute({ name: route.name, params: route.params });

            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
    }, [loading, isAuthenticated, navigation, setIntendedRoute]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
