import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useAuthContext } from '../provider/AuthProvider';
import { ProfileNavigationProp } from '../type/RouteType';

export default function ProfileScreen({ navigation }: { navigation: ProfileNavigationProp }) {
    const { logout, user } = useAuthContext();
    const isDarkMode = useColorScheme() == 'dark';

    return (
        <View className='flex-1 items-center justify-center bg-white dark:bg-black px-6'>
            {/* Profile Picture */}
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=44' }}
                className='w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-600'
            />

            {/* Name & Bio */}
            <Text className='mt-4 text-2xl font-bold text-black dark:text-white'>{user.name}</Text>
            <Text className='mt-2 text-lg font-bold text-black dark:text-white'>{user.email}</Text>
            <Text className='text-gray-500 dark:text-gray-400 text-sm'>
                React Native Developer | UI Enthusiast
            </Text>

            {/* Stats */}
            <View className='flex flex-row justify-evenly mt-6 w-full'>
                <View className='items-center'>
                    <Text className='text-lg font-bold text-black dark:text-white'>150</Text>
                    <Text className='text-gray-500 dark:text-gray-400 text-sm'>Posts</Text>
                </View>
                <View className='items-center'>
                    <Text className='text-lg font-bold text-black dark:text-white'>4.5K</Text>
                    <Text className='text-gray-500 dark:text-gray-400 text-sm'>Followers</Text>
                </View>
                <View className='items-center'>
                    <Text className='text-lg font-bold text-black dark:text-white'>320</Text>
                    <Text className='text-gray-500 dark:text-gray-400 text-sm'>Following</Text>
                </View>
            </View>

            {/* Profile Button */}
            <View className='flex flex-row gap-12 mt-28'>
                <TouchableOpacity className='mt-6 py-2'>
                    <Ionicons name='cog-outline' size={26} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>

                <TouchableOpacity className='mt-6 py-2'>
                    <Ionicons
                        size={26}
                        name='log-out-outline'
                        color={isDarkMode ? '#fff' : '#000'}
                        onPress={logout}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
