import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { DetailNavigationProp } from '../type/RouteType';

export interface CardProps {
    uuid: string;
    title: string;
    images?: string;
    description?: string;
}

class CardItem extends React.PureComponent<{ data: CardProps; navigation: DetailNavigationProp }> {
    render() {
        const { data, navigation } = this.props;
        const imageUrls: string[] = data.images ? JSON.parse(data.images) : [];

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { itemId: data.uuid })}
                activeOpacity={0.8}
                className='w-1/3 p-1'
            >
                <Image
                    source={{ uri: imageUrls[0] }}
                    className='relative w-full h-52 rounded-md'
                    resizeMode='cover'
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    className='absolute bottom-0 w-full h-2/5 p-2 rounded-b-md'
                >
                    <Text className='text-left text-sm text-white font-semibold'>{data.title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

export default CardItem;
