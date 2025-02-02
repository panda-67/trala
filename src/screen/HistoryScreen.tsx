import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { HistoryNavigationProp } from '../type/RouteType';

export default function HistoryScreen({ navigation }: { navigation: HistoryNavigationProp }) {
    const isDarkMode = useColorScheme() == 'dark';

    return (
        <View className='flex-1 items-center justify-center bg-white dark:bg-black px-6'>
            {/* Name & Bio */}
            <Text className='mt-4 text-2xl font-bold text-black dark:text-white'> Emilia Doe </Text>
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

            {/* Edit Profile Button */}
            <TouchableOpacity className='mt-6 px-6 py-2 bg-blue-500 dark:bg-blue-600 rounded-full'>
                <Text className='text-white font-semibold'>Edit History</Text>
            </TouchableOpacity>
        </View>
    );
}
