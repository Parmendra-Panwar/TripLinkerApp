// src/navigation/TabNavigator.tsx

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { ExploreScreen } from '../screens/explore/ExploreScreen';
import { PlacesListScreen } from '../screens/places/PlacesListScreen';
import { PlaceDetailScreen } from '../screens/places/PlaceDetailScreen';
import { AddPropertyScreen } from '../screens/places/AddPropertyScreen';
import { ItineraryScreen } from '../screens/ai/ItineraryScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

import { Colors } from '../constants/theme';
import type { MainTabParamList, PlacesStackParamList } from '../types';

// ─── Places Stack ──────────────────────────────────────────────────────────
const PlacesStack = createNativeStackNavigator<PlacesStackParamList>();

const PlacesNavigator: React.FC = () => (
  <PlacesStack.Navigator screenOptions={{ headerShown: false }}>
    <PlacesStack.Screen name="PlacesList" component={PlacesListScreen} />
    <PlacesStack.Screen
      name="PlaceDetail"
      component={PlaceDetailScreen}
      options={{ animation: 'slide_from_right' }}
    />
    <PlacesStack.Screen
      name="AddProperty"
      component={AddPropertyScreen}
      options={{ animation: 'slide_from_bottom' }}
    />
  </PlacesStack.Navigator>
);

// ─── Tab Navigator ─────────────────────────────────────────────────────────
const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconName = 'compass' | 'compass-outline' | 'map' | 'map-outline' | 'sparkles' | 'sparkles-outline' | 'person' | 'person-outline';

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { activeIcon: TabIconName; inactiveIcon: TabIconName; label: string }
> = {
  Explore: {
    activeIcon: 'compass',
    inactiveIcon: 'compass-outline',
    label: 'Explore',
  },
  Places: {
    activeIcon: 'map',
    inactiveIcon: 'map-outline',
    label: 'Places',
  },
  AI: {
    activeIcon: 'sparkles',
    inactiveIcon: 'sparkles-outline',
    label: 'AI Plan',
  },
  Profile: {
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
    label: 'Profile',
  },
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const config = TAB_CONFIG[route.name as keyof MainTabParamList];
        return {
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () =>
            Platform.OS === 'ios' ? (
              <BlurView
                intensity={80}
                tint="light"
                style={StyleSheet.absoluteFill}
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.tabBarAndroid]} />
            ),
          tabBarActiveTintColor: Colors.ocean.mid,
          tabBarInactiveTintColor: Colors.stone,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? config.activeIcon : config.inactiveIcon}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: config.label,
        };
      }}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Places" component={PlacesNavigator} />
      <Tab.Screen name="AI" component={ItineraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  tabBarAndroid: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
