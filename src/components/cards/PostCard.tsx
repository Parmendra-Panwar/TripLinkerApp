// src/components/cards/PostCard.tsx

import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import type { TravelPost } from '../../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PostCardProps {
  post: TravelPost;
  onLike: (id: string) => void;
}

const formatNumber = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

export const PostCard: React.FC<PostCardProps> = React.memo(({ post, onLike }) => {
  const handleLike = useCallback(() => onLike(post.id), [post.id, onLike]);

  return (
    <View style={styles.card}>
      {/* Author Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.authorAvatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.authorName}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={12} color={Colors.coral} />
            <Text style={styles.location}>
              {post.location}, {post.country}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.slate} />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
          resizeMode="cover"
        />
        {/* Country badge */}
        <View style={styles.countryBadge}>
          <Text style={styles.countryText}>{post.country}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleLike}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={post.isLiked ? Colors.coral : Colors.slate}
          />
          <Text style={[styles.actionCount, post.isLiked && styles.likedCount]}>
            {formatNumber(post.likes)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={22} color={Colors.slate} />
          <Text style={styles.actionCount}>{post.comments}</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="bookmark-outline" size={22} color={Colors.slate} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons name="paper-plane-outline" size={22} color={Colors.slate} />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.caption} numberOfLines={3}>
          <Text style={styles.authorBold}>{post.authorName} </Text>
          {post.caption}
        </Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {post.tags.slice(0, 3).map((tag) => (
            <Text key={tag} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
});

PostCard.displayName = 'PostCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.fog,
  },
  authorInfo: {
    flex: 1,
    marginLeft: Spacing.sm + 4,
  },
  authorName: {
    ...Typography.label.md,
    color: Colors.ink,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 2,
  },
  location: {
    ...Typography.body.sm,
    color: Colors.slate,
  },
  moreButton: {
    padding: 4,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  countryBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(13, 27, 42, 0.65)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    backdropFilter: 'blur(8px)',
  },
  countryText: {
    ...Typography.label.xs,
    color: Colors.white,
    letterSpacing: 0.8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 4,
  },
  actionCount: {
    ...Typography.label.sm,
    color: Colors.slate,
  },
  likedCount: {
    color: Colors.coral,
  },
  captionContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  caption: {
    ...Typography.body.md,
    color: Colors.ink,
    lineHeight: 22,
  },
  authorBold: {
    fontWeight: '700',
    color: Colors.ink,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.xs,
    gap: 4,
  },
  tag: {
    ...Typography.label.sm,
    color: Colors.ocean.light,
    fontSize: 12,
  },
});
