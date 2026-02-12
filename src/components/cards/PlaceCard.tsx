// src/components/cards/PlaceCard.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import type { Property } from '../../types';

interface PlaceCardProps {
  property: Property;
  onPress: () => void;
  onFavorite: () => void;
}

const TYPE_LABELS: Record<Property['type'], string> = {
  hotel: 'Hotel',
  villa: 'Villa',
  hostel: 'Hostel',
  resort: 'Resort',
  apartment: 'Apartment',
};

export const PlaceCard: React.FC<PlaceCardProps> = React.memo(
  ({ property, onPress, onFavorite }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.92}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Favorite Button */}
        <TouchableOpacity
          onPress={onFavorite}
          style={styles.favoriteButton}
          activeOpacity={0.8}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={property.isFavorited ? 'heart' : 'heart-outline'}
            size={20}
            color={property.isFavorited ? Colors.coral : Colors.white}
          />
        </TouchableOpacity>
        {/* Type pill */}
        <View style={styles.typePill}>
          <Text style={styles.typeText}>{TYPE_LABELS[property.type]}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {property.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={Colors.warning} />
            <Text style={styles.rating}>{property.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({property.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color={Colors.stone} />
          <Text style={styles.location}>
            {property.location}, {property.country}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ${property.pricePerNight}
          </Text>
          <Text style={styles.perNight}> / night</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
);

PlaceCard.displayName = 'PlaceCard';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.md,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm + 4,
    right: Spacing.sm + 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Radius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typePill: {
    position: 'absolute',
    bottom: Spacing.sm + 4,
    left: Spacing.sm + 4,
    backgroundColor: 'rgba(13, 27, 42, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  typeText: {
    ...Typography.label.xs,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  info: {
    padding: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    ...Typography.display.h3,
    color: Colors.ink,
    flex: 1,
    marginRight: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rating: {
    ...Typography.label.md,
    color: Colors.ink,
    fontSize: 13,
  },
  reviewCount: {
    ...Typography.body.sm,
    color: Colors.stone,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: Spacing.sm,
  },
  location: {
    ...Typography.body.sm,
    color: Colors.slate,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    ...Typography.display.h3,
    color: Colors.ocean.mid,
    fontSize: 20,
  },
  perNight: {
    ...Typography.body.sm,
    color: Colors.stone,
  },
});
