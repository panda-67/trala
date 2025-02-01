import React, { useEffect } from 'react';
import { useAuthContext } from '../provider/AuthProvider';
import { LoginNavigationProp } from '../type/RouteType';

export default function AuthGuard({
    children,
    navigation,
}: {
    children: React.ReactNode;
    navigation: LoginNavigationProp;
}) {
    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.replace('Login');
        }
    }, [isAuthenticated]);

    return <>{children}</>;
}
