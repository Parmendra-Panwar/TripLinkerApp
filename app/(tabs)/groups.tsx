import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyGroups = [
    { id: 1, name: 'Backpackers Unite', members: 1200, description: 'Low budget, high adventure.', image: 'https://picsum.photos/200/300?random=1' },
    { id: 2, name: 'Digital Nomads Bali', members: 4500, description: 'Work and travel in paradise.', image: 'https://picsum.photos/200/300?random=2' },
    { id: 3, name: 'Foodie Travelers', members: 800, description: 'Taste the world together.', image: 'https://picsum.photos/200/300?random=3' },
    { id: 4, name: 'Solo Female Travelers', members: 3000, description: 'Safe and fun community.', image: 'https://picsum.photos/200/300?random=4' },
];

export default function Groups() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="px-5 pt-5">
                <Text className="text-2xl font-bold text-black mb-4">Join Your Tribe</Text>
                <Text className="text-gray-500 mb-6">Find groups that share your travel style.</Text>

                <View className="flex-row flex-wrap justify-between">
                    {dummyGroups.map((group) => (
                        <View key={group.id} className="w-[48%] bg-white rounded-2xl shadow-sm border border-gray-100 mb-5 overflow-hidden">
                            <Image source={{ uri: group.image }} className="w-full h-32" resizeMode="cover" />
                            <View className="p-3">
                                <Text className="text-base font-bold text-black mb-1">{group.name}</Text>
                                <Text className="text-xs text-gray-500 mb-2">{group.members} Members</Text>
                                <TouchableOpacity className="bg-blue-500 py-2 rounded-lg items-center">
                                    <Text className="text-white text-xs font-bold">Join Group</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
