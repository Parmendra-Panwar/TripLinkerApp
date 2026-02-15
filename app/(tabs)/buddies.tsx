import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const dummyBuddies = [
    { id: 1, name: 'Alice Walker', tag: 'Adventure', followers: 120, image: 'https://i.pravatar.cc/150?u=a' },
    { id: 2, name: 'David Smith', tag: 'Foodie', followers: 85, image: 'https://i.pravatar.cc/150?u=d' },
    { id: 3, name: 'Elena Rodriguez', tag: 'Culture', followers: 200, image: 'https://i.pravatar.cc/150?u=e' },
    { id: 4, name: 'Michael Chen', tag: 'Luxury', followers: 50, image: 'https://i.pravatar.cc/150?u=m' },
];

export default function Buddies() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="px-5 pt-5">
                <Text className="text-2xl font-bold text-black mb-4">Find Travel Buddies</Text>
                <Text className="text-gray-500 mb-6">Connect with travelers who match your vibe.</Text>

                <View className="space-y-4">
                    {dummyBuddies.map((buddy) => (
                        <View key={buddy.id} className="flex-row items-center bg-gray-50 p-4 rounded-2xl shadow-sm border border-gray-100">
                            <Image source={{ uri: buddy.image }} className="w-14 h-14 rounded-full mr-4" />
                            <View className="flex-1">
                                <Text className="text-lg font-semibold text-black">{buddy.name}</Text>
                                <Text className="text-sm text-gray-500">{buddy.tag} • {buddy.followers} Followers</Text>
                            </View>
                            <TouchableOpacity className="bg-primary px-4 py-2 rounded-full">
                                <Text className="text-white font-bold text-xs">Follow</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
