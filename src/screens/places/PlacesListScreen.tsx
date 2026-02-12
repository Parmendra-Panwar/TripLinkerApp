// src/screens/places/PlacesListScreen.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPropertiesAsync, toggleFavorite } from '../../features/places/placesSlice';
import { PlaceCard } from '../../components/cards/PlaceCard';
import { Colors, Typography, Spacing, Radius } from '../../constants/theme';
import type { PlacesStackParamList, Property } from '../../types';

type Nav = NativeStackNavigationProp<PlacesStackParamList, 'PlacesList'>;

export const PlacesListScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { properties, loading } = useAppSelector((s) => s.places);
  const isBusinessUser = useAppSelector((s) => s.auth.role === 'business');

  useEffect(() => {
    if (properties.length === 0) dispatch(fetchPropertiesAsync());
  }, []);

  const renderItem = ({ item }: { item: Property }) => (
    <PlaceCard
      property={item}
      onPress={() => navigation.navigate('PlaceDetail', { propertyId: item.id })}
      onFavorite={() => dispatch(toggleFavorite(item.id))}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Places to Stay</Text>
          <Text style={styles.subtitle}>
            {properties.length} destinations available
          </Text>
        </View>
        {isBusinessUser && (
          <TouchableOpacity
            onPress={() => navigation.navigate('AddProperty')}
            style={styles.addButton}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.addButtonText}>List</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sort/Filter Row */}
      <View style={styles.sortRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={16} color={Colors.slate} />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="swap-vertical-outline" size={16} color={Colors.slate} />
          <Text style={styles.filterButtonText}>Sort by price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="star-outline" size={16} color={Colors.slate} />
          <Text style={styles.filterButtonText}>Top rated</Text>
        </TouchableOpacity>
      </View>

      {loading && properties.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.ocean.mid} />
        </View>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.fog,
  },
  title: { ...Typography.display.h2, color: Colors.ink },
  subtitle: { ...Typography.body.sm, color: Colors.slate, marginTop: 2 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.ocean.mid,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  addButtonText: {
    ...Typography.label.sm,
    color: Colors.white,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.fog,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.fog,
    borderWidth: 1,
    borderColor: Colors.mist,
  },
  filterButtonText: {
    ...Typography.label.sm,
    color: Colors.slate,
    fontSize: 12,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: 120,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
