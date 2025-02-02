import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CardProps } from '../component/CardItem';
import { fetchData } from '../service/api';
import { DetailNavigationProp } from '../type/RouteType';

export default function HomeScreen() {
    const navigation = useNavigation<DetailNavigationProp>();
    const [loading, setLoading] = useState(true);
    const [mostViewed, setMostViewed] = useState([]);
    const [newUploads, setNewUploads] = useState([]);
    const [mostRated, setMostRated] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const viewed = await fetchData('?category=most_viewed&show=30');
            const recent = await fetchData('?category=new_uploads&show=2');
            const rated = await fetchData('?category=most_rated&show=4');

            setMostViewed(viewed.destinies);
            setNewUploads(recent.destinies);
            setMostRated(rated.destinies);
            setLoading(false);
        };

        loadData();
    }, []);

    const renderCard = ({ item }: { item: CardProps }) => {
        const imageUrls = item.images ? JSON.parse(item.images) : [];

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { itemId: item.uuid })}
                className='mr-3'
            >
                <View className='w-40 h-56 rounded-lg overflow-hidden shadow-lg'>
                    <Image
                        source={{ uri: imageUrls[0] }}
                        className='w-full h-full rounded-lg'
                        resizeMode='cover'
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        className='absolute bottom-0 w-full h-16 p-2 rounded-b-lg'
                    >
                        <Text className='text-white font-semibold'>{item.title}</Text>
                    </LinearGradient>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View className='flex-1 flex items-center justify-center'>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    return (
        <SafeAreaView className='flex-1 bg-white dark:bg-black'>
            <ScrollView className='px-4 py-4'>
                {/* Most Viewed */}
                <Text className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                    🔥 Most Viewed
                </Text>
                <FlatList
                    data={mostViewed}
                    horizontal
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderCard}
                    showsHorizontalScrollIndicator={false}
                />

                {/* New Uploads */}
                <Text className='text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2'>
                    🆕 New Uploads
                </Text>
                <FlatList
                    data={newUploads}
                    horizontal
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderCard}
                    showsHorizontalScrollIndicator={false}
                />

                {/* Most Rated */}
                <Text className='text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2'>
                    ⭐ Most Rated
                </Text>
                <FlatList
                    data={mostRated}
                    horizontal
                    keyExtractor={(item) => item.uuid}
                    renderItem={renderCard}
                    showsHorizontalScrollIndicator={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
