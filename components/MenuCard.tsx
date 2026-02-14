import { Text, TouchableOpacity, Image, Platform, View } from 'react-native'
import { MenuItem } from "@/type";
import { useCartStore } from "@/store/cart.store";

const MenuCard = ({ item }: { item: MenuItem }) => {
    const { id, name, price, image_url } = item;
    const { addItem } = useCartStore();

    return (
        <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm border border-gray-100" style={Platform.OS === 'android' ? { elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 } : {}}>
            <Image source={{ uri: image_url }} className="w-full h-32 rounded-xl mb-3" resizeMode="cover" />
            <Text className="text-lg font-bold text-dark-100 mb-1" numberOfLines={1}>{name}</Text>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-base font-semibold text-primary">${price}</Text>
                <TouchableOpacity
                    onPress={() => addItem({ id, name, price, image_url, customizations: [] })}
                    className="bg-primary/10 px-3 py-1.5 rounded-full"
                >
                    <Text className="text-xs font-bold text-primary">Add +</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MenuCard
