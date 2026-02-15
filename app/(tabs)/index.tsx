import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Pressable, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const dummyPlaces = [
    { id: '1', name: 'Cozy Mountain Cabin', location: 'Aspen, USA', price: '$250/night', rating: 4.8, image: 'https://picsum.photos/400/300?random=20' },
    { id: '2', name: 'Beachfront Villa', location: 'Bali, Indonesia', price: '$180/night', rating: 4.9, image: 'https://picsum.photos/400/300?random=21' },
    { id: '3', name: 'Modern City Apartment', location: 'Tokyo, Japan', price: '$120/night', rating: 4.7, image: 'https://picsum.photos/400/300?random=22' },
    { id: '4', name: 'Historic Castle Hotel', location: 'Edinburgh, UK', price: '$350/night', rating: 4.6, image: 'https://picsum.photos/400/300?random=23' },
];

export default function Index() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-5 pt-2">
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-gray-500 text-sm">Welcome back,</Text>
                        <Text className="text-2xl font-bold text-black">Trip Linker</Text>
                    </View>
                    <TouchableOpacity disabled className="bg-gray-100 p-2 rounded-full">
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* AI Feature Banner */}
                <TouchableOpacity
                    onPress={() => router.push('/ai-features')}
                    className="bg-primary p-5 rounded-3xl mb-8 shadow-md shadow-orange-200"
                >
                    <View className="flex-row justify-between items-center">
                        <View>
                            <Text className="text-white font-bold text-xl mb-1">AI Trip Planner</Text>
                            <Text className="text-white/80 text-sm">Smart itineraries & buddy matching</Text>
                        </View>
                        <View className="bg-white/20 p-2 rounded-full">
                            <Ionicons name="sparkles" size={24} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Search Bar (Dummy) */}
                <View className="flex-row items-center bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                    <Ionicons name="search" size={20} color="gray" className="mr-3" />
                    <Text className="text-gray-400">Where do you want to go?</Text>
                </View>

                {/* Places to Stay */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-black">Popular Places</Text>
                    <Text className="text-primary font-bold text-sm">View All</Text>
                </View>

                <View className="pb-24">
                    {dummyPlaces.map((place) => (
                        <TouchableOpacity key={place.id} className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <Image source={{ uri: place.image }} className="w-full h-48" resizeMode="cover" />
                            <View className="p-4">
                                <View className="flex-row justify-between items-start mb-1">
                                    <Text className="text-lg font-bold text-black flex-1 mr-2">{place.name}</Text>
                                    <View className="flex-row items-center">
                                        <Ionicons name="star" size={16} color="#FE8C00" />
                                        <Text className="text-black font-bold ml-1">{place.rating}</Text>
                                    </View>
                                </View>
                                <View className="flex-row items-center mb-2">
                                    <Ionicons name="location-outline" size={16} color="gray" />
                                    <Text className="text-gray-500 text-sm ml-1">{place.location}</Text>
                                </View>
                                <Text className="text-primary font-bold text-lg">{place.price}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
