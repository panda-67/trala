import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import CardItem, { CardProps } from '../component/CardItem';
import { fetchData } from '../service/api';
import { DetailNavigationProp } from '../type/RouteType';

export default function ExploreScreen({ navigation }: { navigation: DetailNavigationProp }) {
    const [data, setData] = useState<{ destinies: CardProps[] }>({ destinies: [] });
    const [page, setPage] = useState(1); // Track current page
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false); // Track loading more
    const [hasMoreData, setHasMoreData] = useState(true); // Track last page

    const renderFooter = useCallback(() => {
        if (loadingMore) {
            return <ActivityIndicator className='my-4' size='large' color='#0000ff' />;
        }
        return null;
    }, [loadingMore]);

    const renderEmpty = useCallback(() => {
        if (error) {
            return <Text className='text-center mt-16'>{error}</Text>;
        }
        if (!loading) {
            return <Text className='text-center mt-16'>No destinies available</Text>;
        }
        return null;
    }, [loading, error]);

    const loadMoreData = useCallback(() => {
        if (!loadingMore && hasMoreData) {
            setLoadingMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    }, [loadingMore, hasMoreData]);

    const getData = async (currentPage = 1) => {
        try {
            const result = await fetchData(`?page=${currentPage}`); // Append page param if API supports pagination

            setData((prevData) => ({
                destinies: [...prevData.destinies, ...result.destinies], // Append new destinies
            }));

            if (currentPage >= result.last_page) {
                setHasMoreData(false); // A new state to track if more data exists
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        getData(page);
    }, [page]);

    const renderItem = useCallback(({ item }: { item: CardProps }) => <CardItem data={item} navigation={navigation} />, []);

    return (
        <View className='flex-1 bg-white dark:bg-black'>
            {/* 3-Column Grid Layout */}
            <FlatList
                data={data.destinies}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ display: 'flex' }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                numColumns={3}
            />
        </View>
    );
}
