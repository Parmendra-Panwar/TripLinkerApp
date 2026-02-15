import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const dummyPosts = [
    { id: 1, user: 'Jake Sully', avatar: 'https://i.pravatar.cc/150?u=j', image: 'https://picsum.photos/400/300?random=5', caption: 'Exploring the mountains! 🏔️', location: 'Swiss Alps' },
    { id: 2, user: 'Neytiri', avatar: 'https://i.pravatar.cc/150?u=n', image: 'https://picsum.photos/400/300?random=6', caption: 'Best sunset ever. 🌅', location: 'Maldives' },
    { id: 3, user: 'Grace', avatar: 'https://i.pravatar.cc/150?u=g', image: 'https://picsum.photos/400/300?random=7', caption: 'Street food in Tokyo is amazing 🍜', location: 'Tokyo, Japan' },
];

const dummyStories = [
    { id: 1, user: 'You', image: 'https://i.pravatar.cc/150?u=me' },
    { id: 2, user: 'Alice', image: 'https://i.pravatar.cc/150?u=a' },
    { id: 3, user: 'Bob', image: 'https://i.pravatar.cc/150?u=b' },
    { id: 4, user: 'Charlie', image: 'https://i.pravatar.cc/150?u=c' },
];

export default function Explore() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="pt-2">

                {/* Stories */}
                <View className="px-5 mb-6">
                    <Text className="text-xl font-bold mb-3">Stories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {dummyStories.map((story) => (
                            <View key={story.id} className="mr-4 items-center">
                                <View className="p-[2px] rounded-full border-2 border-primary">
                                    <Image source={{ uri: story.image }} className="w-16 h-16 rounded-full" />
                                </View>
                                <Text className="text-xs text-gray-600 mt-1">{story.user}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View className="px-5 border-t border-gray-100 pt-4">
                    <Text className="text-2xl font-bold text-black mb-4">Explore Community</Text>
                    {dummyPosts.map((post) => (
                        <View key={post.id} className="mb-8">
                            <View className="flex-row items-center mb-3">
                                <Image source={{ uri: post.avatar }} className="w-10 h-10 rounded-full mr-3" />
                                <View>
                                    <Text className="font-bold text-base">{post.user}</Text>
                                    <Text className="text-xs text-gray-500">{post.location}</Text>
                                </View>
                            </View>
                            <Image source={{ uri: post.image }} className="w-full h-64 rounded-2xl mb-3" />
                            <Text className="text-base text-gray-800"><Text className="font-bold">{post.user}</Text> {post.caption}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Floating Action Button for Posting */}
            <TouchableOpacity
                className="absolute bottom-5 right-5 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg shadow-orange-300"
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}
