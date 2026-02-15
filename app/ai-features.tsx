import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function AiFeatures() {
    const [activeTab, setActiveTab] = useState<'itinerary' | 'buddy' | 'activity'>('itinerary');

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="px-5 pt-5">
                <Text className="text-3xl font-extrabold text-primary mb-2">Trip Linker AI</Text>
                <Text className="text-gray-500 mb-6">Smart features to enhance your journey.</Text>

                {/* Feature Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                    {['itinerary', 'buddy', 'activity'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab as any)}
                            className={`mr-3 px-5 py-2.5 rounded-full ${activeTab === tab ? 'bg-primary' : 'bg-gray-100'}`}
                        >
                            <Text className={`font-semibold capitalize ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
                                {tab === 'itinerary' ? 'Trip Planner' : tab === 'buddy' ? 'Match Buddy' : 'Activities'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Content Area */}
                {activeTab === 'itinerary' && (
                    <View>
                        <View className="bg-blue-50 p-5 rounded-3xl mb-6">
                            <Text className="text-xl font-bold mb-4 text-blue-900">✨ Smart Itinerary</Text>
                            <Text className="text-gray-600 mb-2">Destination</Text>
                            <TextInput className="bg-white p-3 rounded-xl mb-3" placeholder="e.g. Kyoto, Japan" />
                            <Text className="text-gray-600 mb-2">Budget</Text>
                            <TextInput className="bg-white p-3 rounded-xl mb-3" placeholder="e.g. $2000" />
                            <Text className="text-gray-600 mb-2">Days</Text>
                            <TextInput className="bg-white p-3 rounded-xl mb-4" placeholder="e.g. 5" />
                            <TouchableOpacity className="bg-blue-600 p-4 rounded-xl items-center shadow-lg shadow-blue-200">
                                <Text className="text-white font-bold text-lg">Generate Plan</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="font-bold text-lg mb-2">Sample Output:</Text>
                        <View className="bg-white border border-gray-100 p-4 rounded-2xl mb-2 shadow-sm">
                            <Text className="font-bold text-base">Day 1: Arrival & Culture</Text>
                            <Text className="text-gray-500 text-sm mt-1">Visit Fushimi Inari Shrine (Low Density at 8 AM). Lunch at Nishiki Market.</Text>
                        </View>
                    </View>
                )}

                {activeTab === 'buddy' && (
                    <View>
                        <View className="bg-purple-50 p-5 rounded-3xl mb-6">
                            <Text className="text-xl font-bold mb-4 text-purple-900">🤝 AI Match</Text>
                            <Text className="text-gray-600 mb-4">Finding buddies based on your "Adventure" and "Photography" interests...</Text>

                            <View className="flex-row items-center bg-white p-4 rounded-xl mb-3">
                                <Image source={{ uri: 'https://i.pravatar.cc/150?u=z' }} className="w-12 h-12 rounded-full mr-3" />
                                <View className="flex-1">
                                    <Text className="font-bold">Zoey</Text>
                                    <Text className="text-xs text-green-600">95% Match • Currently in Kyoto</Text>
                                </View>
                                <TouchableOpacity className="bg-purple-600 px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs">Connect</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center bg-white p-4 rounded-xl">
                                <Image source={{ uri: 'https://i.pravatar.cc/150?u=x' }} className="w-12 h-12 rounded-full mr-3" />
                                <View className="flex-1">
                                    <Text className="font-bold">Xavier</Text>
                                    <Text className="text-xs text-green-600">88% Match • Arriving Tomorrow</Text>
                                </View>
                                <TouchableOpacity className="bg-purple-600 px-3 py-1 rounded-full">
                                    <Text className="text-white text-xs">Connect</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                {activeTab === 'activity' && (
                    <View>
                        <View className="bg-orange-50 p-5 rounded-3xl mb-6">
                            <Text className="text-xl font-bold mb-4 text-orange-900">📍 Near You</Text>
                            <Text className="text-gray-600 mb-4">Based on your location: <Text className="font-bold">Downtown</Text></Text>

                            <View className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
                                <Image source={{ uri: 'https://picsum.photos/400/200?random=10' }} className="w-full h-32" />
                                <View className="p-3">
                                    <Text className="font-bold text-lg">Hidden Jazz Bar</Text>
                                    <Text className="text-gray-500 text-sm">Rated 4.8 • Quiet Atmosphere</Text>
                                    <Text className="text-orange-500 text-xs font-bold mt-2">AI Reason: You like 'Chill evenings'</Text>
                                </View>
                            </View>

                            <View className="bg-white rounded-xl overflow-hidden shadow-sm">
                                <Image source={{ uri: 'https://picsum.photos/400/200?random=11' }} className="w-full h-32" />
                                <View className="p-3">
                                    <Text className="font-bold text-lg">Night Photography Walk</Text>
                                    <Text className="text-gray-500 text-sm">Starts in 1 hour • 5 people going</Text>
                                    <Text className="text-orange-500 text-xs font-bold mt-2">AI Reason: Matches your 'Photography' hobby</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}
