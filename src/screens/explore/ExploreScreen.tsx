// src/screens/explore/ExploreScreen.tsx

import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPostsAsync, toggleLike } from '../../features/explore/exploreSlice';
import { PostCard } from '../../components/cards/PostCard';
import { Colors, Typography, Spacing } from '../../constants/theme';
import type { TravelPost } from '../../types';

const FILTERS = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Arctic'];

export const ExploreScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.explore);
  const userName = useAppSelector((state) => state.auth.user?.name ?? 'Explorer');

  const [activeFilter, setActiveFilter] = React.useState('All');

  React.useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsAsync());
    }
  }, []);

  const handleToggleLike = useCallback(
    (postId: string) => dispatch(toggleLike(postId)),
    [dispatch]
  );

  const handleRefresh = useCallback(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  const renderPost = useCallback(
    ({ item }: { item: TravelPost }) => (
      <PostCard post={item} onLike={handleToggleLike} />
    ),
    [handleToggleLike]
  );

  const keyExtractor = useCallback((item: TravelPost) => item.id, []);

  const ListHeader = (
    <View>
      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {userName.split(' ')[0]} ✈️
          </Text>
          <Text style={styles.headerSub}>What's inspiring you today?</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color={Colors.ink} />
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <FlatList
        data={FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            style={[
              styles.filterChip,
              activeFilter === item && styles.filterChipActive,
            ]}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === item && styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        style={styles.filters}
      />

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Stories</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.centered} edges={['top']}>
        <ActivityIndicator size="large" color={Colors.ocean.mid} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderPost}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={Colors.ocean.mid}
          />
        }
        contentContainerStyle={styles.listContent}
        removeClippedSubviews
        maxToRenderPerBatch={4}
        windowSize={6}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.fog },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  loadingText: {
    ...Typography.body.md,
    color: Colors.slate,
    marginTop: Spacing.md,
  },
  listContent: { paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  greeting: {
    ...Typography.display.h3,
    color: Colors.ink,
  },
  headerSub: {
    ...Typography.body.sm,
    color: Colors.slate,
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.fog,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    backgroundColor: Colors.white,
    marginBottom: 2,
  },
  filtersContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.fog,
    borderWidth: 1,
    borderColor: Colors.mist,
  },
  filterChipActive: {
    backgroundColor: Colors.ocean.deep,
    borderColor: Colors.ocean.deep,
  },
  filterText: {
    ...Typography.label.sm,
    color: Colors.slate,
  },
  filterTextActive: {
    color: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.fog,
  },
  sectionTitle: {
    ...Typography.display.h3,
    color: Colors.ink,
  },
  seeAll: {
    ...Typography.label.sm,
    color: Colors.ocean.light,
  },
});
