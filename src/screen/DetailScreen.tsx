import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CardProps } from '../component/CardItem';
import { useAuthContext } from '../provider/AuthProvider';
import { fetchDetail } from '../service/api';

export default function DetailScreen({ route }: { route: any }) {
    const [itemDetails, setItemDetails] = useState<CardProps | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomVisible, setIsZoomVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = route.params;
    const { authToken } = useAuthContext();
    const navigation = useNavigation();
    const imageUrls: string[] = itemDetails?.images ? JSON.parse(itemDetails.images) : [];

    const openZoom = (index: number) => {
        setSelectedImageIndex(index);
        setIsZoomVisible(true);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchDetail(itemId, authToken);
                setItemDetails(result.destination);
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [itemId, authToken]);

    if (loading) {
        return (
            <SafeAreaView className='flex justify-center'>
                <ActivityIndicator size='large' color='#0000ff' />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className='flex justify-center'>
                <Text className='text-rose-700'>{error}</Text>
                <Button title='Go Back' onPress={() => navigation.goBack()} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className='flex-1 bg-gray-100 dark:bg-gray-900'>
            <ScrollView contentInsetAdjustmentBehavior='automatic' className='pb-5'>
                {/* Header Image with Overlay */}
                <View className='relative w-full h-72'>
                    <Image
                        source={{ uri: imageUrls[0] }}
                        resizeMode='cover'
                        className='w-full h-full rounded-b-3xl'
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        className='absolute bottom-0 w-full h-24 rounded-b-3xl flex justify-end p-4'
                    >
                        <Text className='text-2xl font-bold text-white shadow-lg'>
                            {itemDetails?.title}
                        </Text>
                    </LinearGradient>
                </View>

                {/* Image Gallery */}
                <FlatList
                    data={imageUrls.slice(1)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingLeft: 18,
                        alignItems: 'center',
                        marginVertical: 14,
                    }}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => openZoom(index)} className='mr-3'>
                            <View className='w-40 h-24 rounded-lg overflow-hidden shadow-lg'>
                                <Image
                                    source={{ uri: item }}
                                    className='w-full h-full rounded-lg'
                                    resizeMode='cover'
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* <View className='flex-row flex-wrap justify-center py-4'> */}
                {/*     {imageUrls.slice(1).map((imageUri, index) => ( */}
                {/*         <TouchableOpacity */}
                {/*             key={index} */}
                {/*             onPress={() => openZoom(index)} */}
                {/*             className='w-1/3 h-24 p-1 rounded-lg overflow-hidden shadow-lg' */}
                {/*         > */}
                {/*             <Image */}
                {/*                 source={{ uri: imageUri }} */}
                {/*                 className='w-full h-full rounded-lg' */}
                {/*                 resizeMode='cover' */}
                {/*             /> */}
                {/*         </TouchableOpacity> */}
                {/*     ))} */}
                {/* </View> */}

                {/* Description */}
                <View className='px-5'>
                    <Text className='text-lg leading-6 text-gray-700 dark:text-gray-300 text-justify'>
                        {itemDetails?.description}
                    </Text>
                </View>
            </ScrollView>

            {/* Full-Screen Image Zoom Modal */}
            <Modal
                transparent={true}
                visible={isZoomVisible}
                onRequestClose={() => setIsZoomVisible(false)}
            >
                <ImageViewer
                    enableSwipeDown={true}
                    index={selectedImageIndex}
                    imageUrls={imageUrls.slice(1).map((uri) => ({ url: uri }))}
                    onSwipeDown={() => setIsZoomVisible(false)}
                    backgroundColor='black'
                />
            </Modal>
        </SafeAreaView>
    );
}
