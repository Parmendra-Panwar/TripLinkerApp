// src/screens/places/PlaceDetailScreen.tsx

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../../store';
import { fetchPropertyByIdAsync } from '../../features/places/placesSlice';
import { Button } from '../../components/common/Button';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/theme';
import type { PlacesStackParamList } from '../../types';

type Route = RouteProp<PlacesStackParamList, 'PlaceDetail'>;

export const PlaceDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<Route>();
  const dispatch = useAppDispatch();
  const { selectedProperty: property, loading } = useAppSelector((s) => s.places);

  const { propertyId } = route.params;

  useEffect(() => {
    dispatch(fetchPropertyByIdAsync(propertyId));
  }, [propertyId]);

  if (loading || !property) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.ocean.mid} />
      </View>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Ionicons
        key={i}
        name={i < Math.floor(rating) ? 'star' : 'star-outline'}
        size={16}
        color={i < Math.floor(rating) ? Colors.warning : Colors.mist}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: property.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          {/* Overlay Header */}
          <SafeAreaView style={styles.overlayHeader} edges={['top']}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="share-outline" size={22} color={Colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
          {/* Price Badge */}
          <View style={styles.priceBadge}>
            <Text style={styles.priceAmount}>${property.pricePerNight}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Name & Rating */}
          <View style={styles.nameRow}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color={Colors.warning} />
              <Text style={styles.ratingText}>{property.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={16} color={Colors.coral} />
            <Text style={styles.locationText}>
              {property.location}, {property.country}
            </Text>
          </View>

          {/* Stars */}
          <View style={styles.starsRow}>
            {renderStars(property.rating)}
            <Text style={styles.reviewText}>{property.reviewCount} reviews</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Host */}
          <View style={styles.hostRow}>
            <Image source={{ uri: property.hostAvatar }} style={styles.hostAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hostedBy}>Hosted by</Text>
              <Text style={styles.hostName}>{property.hostName}</Text>
            </View>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={18} color={Colors.ocean.mid} />
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.description}>{property.description}</Text>

          {/* Amenities */}
          <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>
            What's included
          </Text>
          <View style={styles.amenitiesGrid}>
            {property.amenities.map((amenity, i) => (
              <View key={i} style={styles.amenityItem}>
                <View style={styles.amenityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                </View>
                <Text style={styles.amenityLabel}>{amenity.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom padding for sticky CTA */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Book Button */}
      <View style={styles.stickyFooter}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerPriceAmount}>${property.pricePerNight}</Text>
          <Text style={styles.footerPriceUnit}> / night</Text>
        </View>
        <Button
          label="Reserve Now"
          onPress={() => {}}
          style={styles.reserveButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  overlayHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.ocean.deep,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  priceAmount: {
    ...Typography.display.h3,
    color: Colors.white,
  },
  priceUnit: {
    ...Typography.body.sm,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 2,
  },
  content: { padding: Spacing.md },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  propertyName: {
    ...Typography.display.h2,
    color: Colors.ink,
    flex: 1,
    marginRight: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.sand.light,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  ratingText: {
    ...Typography.label.md,
    color: Colors.sand.dark,
    fontSize: 13,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  locationText: { ...Typography.body.md, color: Colors.slate },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: Spacing.md,
  },
  reviewText: {
    ...Typography.body.sm,
    color: Colors.stone,
    marginLeft: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.fog,
    marginVertical: Spacing.md,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.fog,
  },
  hostedBy: { ...Typography.body.sm, color: Colors.stone },
  hostName: { ...Typography.label.md, color: Colors.ink },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.ocean.mid,
  },
  messageText: {
    ...Typography.label.sm,
    color: Colors.ocean.mid,
  },
  sectionTitle: {
    ...Typography.display.h3,
    color: Colors.ink,
    marginBottom: Spacing.sm,
  },
  description: {
    ...Typography.body.md,
    color: Colors.slate,
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    width: '47%',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.fog,
    borderRadius: Radius.sm,
  },
  amenityIcon: {},
  amenityLabel: { ...Typography.body.sm, color: Colors.ink },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 32 : Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.fog,
    ...Shadow.md,
  },
  footerPrice: { flexDirection: 'row', alignItems: 'baseline' },
  footerPriceAmount: {
    ...Typography.display.h2,
    color: Colors.ocean.mid,
  },
  footerPriceUnit: { ...Typography.body.md, color: Colors.stone },
  reserveButton: { paddingHorizontal: Spacing.xl },
});
