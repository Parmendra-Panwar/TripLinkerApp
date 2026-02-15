import { Redirect, Slot, Tabs } from "expo-router";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Image, Text, View } from "react-native";
import { images } from "@/constants";
import cn from "clsx";
import { Ionicons } from "@expo/vector-icons";

const TabBarIcon = ({ focused, icon, title, type = 'image', vectorIconName }: TabBarIconProps) => (
    <View className="tab-icon items-center justify-center">
        {type === 'image' ? (
            <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'} />
        ) : (
            <Ionicons name={vectorIconName} size={24} color={focused ? '#FE8C00' : '#5D5F6D'} />
        )}

        <Text className={cn('text-xs font-bold mt-1', focused ? 'text-primary' : 'text-gray-400')} style={{ fontSize: 10 }}>
            {title}
        </Text>
    </View>
)

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                height: 85,
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'white',
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 5,
                paddingBottom: 20,
                paddingHorizontal: 10
            }
        }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Home" icon={images.home} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Explore" type="vector" vectorIconName="compass-outline" focused={focused} />
                }}
            />
            <Tabs.Screen
                name='buddies'
                options={{
                    title: 'Buddies',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Buddies" type="vector" vectorIconName="people-outline" focused={focused} />
                }}
            />
            <Tabs.Screen
                name='groups'
                options={{
                    title: 'Groups',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Groups" type="vector" vectorIconName="planet-outline" focused={focused} />
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={images.search} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    href: null, // Hide from tab bar
                    title: 'Cart',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
                }}
            />
        </Tabs>
    );
}
