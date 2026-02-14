import { View, Image, TextInput } from 'react-native'
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
    const { query } = useLocalSearchParams<{ query: string }>();
    const [search, setSearch] = useState(query || '');

    const debouncedSearch = useDebouncedCallback((value: string) => {
        router.setParams({ query: value });
    }, 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className="flex-row items-center justify-between px-4 py-2 rounded-lg bg-gray-100 border border-primary-200">
            <View className="flex-1 flex-row items-center justify-start gap-2 h-14">
                <Image source={require('@/assets/icons/search.png')} className="size-5" resizeMode='contain' />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search for food'
                    className="flex-1 font-rubik text-black-300 min-h-full mt-2.5"
                    placeholderTextColor="#8C8E98"
                />
            </View>
        </View>
    )
}
export default SearchBar
